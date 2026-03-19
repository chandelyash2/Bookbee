import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateWithRetry(fn, retries = 5, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (err.message?.includes("429") && retries > 0) {
      console.log(`Retrying... (${retries} left)`);
      await new Promise((r) => setTimeout(r, delay));
      return generateWithRetry(fn, retries - 1, delay * 2);
    }
    throw err;
  }
}

let queue = Promise.resolve();

function enqueue(task) {
  queue = queue.then(async () => {
    const res = await task();
    await new Promise((r) => setTimeout(r, 1200));
    return res;
  });
  return queue;
}

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const result = await enqueue(() =>
      generateWithRetry(() =>
        ai.models.generateContent({
          model: "gemini-3.1-flash-image-preview",
          contents: `Cinematic book cover, no text: ${prompt}`,
          config: {
            responseModalities: ["TEXT", "IMAGE"],  // ⚠️ both are required
          },
        })
      )
    );

    const parts = result.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p) => p.inlineData);

    if (!imagePart?.inlineData?.data) {
      return res.status(500).json({ error: "No image generated" });
    }

    return res.status(200).json({
      image: `data:image/png;base64,${imagePart.inlineData.data}`,
    });

  } catch (error) {
    console.error("FINAL ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}