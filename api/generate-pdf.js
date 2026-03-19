import { chromium as playwright } from "playwright-core";

export const config = {
  maxDuration: 60,
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { html, coverWidth, coverHeight } = req.body;

  if (!html) {
    return res
      .status(400)
      .json({ status: "error", message: "html is required" });
  }

  const pw = Math.ceil(Math.max(coverWidth || 800, 100));
  const ph = Math.ceil(Math.max(coverHeight || 600, 100));

  let browser;

  try {
    if (process.env.VERCEL) {
      const chromium = (await import("@sparticuz/chromium")).default;

      browser = await playwright.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } else {
      const { chromium } = await import("playwright");

      browser = await chromium.launch({
        headless: true,
      });
    }

    const page = await browser.newPage();

    await page.setViewportSize({ width: pw, height: ph });

    // ✅ FIX: inject CSS to remove any white space/line at bottom
    const fixedHtml = html
      .replace(/<html/, `<html style="margin:0;padding:0;overflow:hidden;"`)
      .replace(/<body/, `<body style="margin:0;padding:0;overflow:hidden;"`);

    await page.setContent(fixedHtml, { waitUntil: "networkidle" });

    await page.evaluate(() => {
      document.fonts.ready;
      // ✅ force remove any margin/padding from root elements
      document.documentElement.style.cssText =
        "margin:0;padding:0;overflow:hidden;";
      document.body.style.cssText = "margin:0;padding:0;overflow:hidden;";
    });

    await page.waitForTimeout(300);

    const pdfBuffer = await page.pdf({
      width: `${pw}px`,
      height: `${ph - 1}px`, // ✅ -1px removes the white line
      printBackground: true,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
      preferCSSPageSize: true,
    });
    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="book-cover.pdf"',
    );
    res.send(Buffer.from(pdfBuffer));
  } catch (err) {
    console.error("FULL ERROR:", err);
    if (browser) await browser.close().catch(() => {});
    res.status(500).json({ status: "error", message: err.message });
  }
}
