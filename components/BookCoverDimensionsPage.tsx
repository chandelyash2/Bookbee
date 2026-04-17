import React, { useEffect, useState } from "react";
import { Logo } from "../constants";

const goToContact = () => {
  window.history.pushState({}, "", "/contact");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

interface BookCoverDimensionsPageProps {
  onStart: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onFeatures: () => void;
  onAbout: () => void;
  onBookCoverBee: () => void;
  onSpineWidthCalculator: () => void;
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Book Cover Dimensions – Free Size Calculator for KDP Covers",
  url: "https://www.bookcoverbee.com/book-cover-dimensions",
  description:
    "Find the exact book cover dimensions for your project. Use our free tool to calculate sizes for 5x8, 5.5x8.5, 6x9 and 8.5x11 books, including spine width and bleed for KDP publishing.",
  inLanguage: "en",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "BookCoverBee Cover Size Calculator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: "https://www.bookcoverbee.com/",
    description:
      "A tool that calculates book cover dimensions including spine width and bleed. Designed for Amazon KDP and other publishing platforms.",
    featureList: [
      "Book cover size calculator",
      "Supports 5x8, 5.5x8.5, 6x9 and 8.5x11 trim sizes",
      "Automatic spine width calculation",
      "KDP-ready dimensions",
      "Instant results",
      "AI book cover generation",
      "Export print-ready PDF",
    ],
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description: "Download high-resolution print-ready book covers",
    },
  },
  publisher: {
    "@type": "Organization",
    name: "BookCoverBee",
    url: "https://www.bookcoverbee.com/",
    logo: {
      "@type": "ImageObject",
      url: "https://www.bookcoverbee.com/logo.png",
    },
  },
  keywords: [
    "book cover dimensions",
    "kdp cover size",
    "6x9 book cover dimensions",
    "5x8 book cover size",
    "spine width calculator",
    "paperback cover size",
    "amazon kdp cover requirements",
  ],
};

const BookCoverDimensionsPage: React.FC<BookCoverDimensionsPageProps> = ({
  onStart,
  onHome,
  onHowItWorks,
  onPricing,
  onFeatures,
  onAbout,
  onBookCoverBee,
  onSpineWidthCalculator,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Book Cover Dimensions: A Simple Guide for Authors";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn how to calculate book cover dimensions for KDP and create the right size for 5 x 8, 5.5 x 8.5, 6 x 9, and 8.5 x 11 books with BookCoverBee.",
      );
    }

    const existingSchema = document.getElementById(
      "book-cover-dimensions-schema",
    );
    existingSchema?.remove();

    const script = document.createElement("script");
    script.id = "book-cover-dimensions-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("book-cover-dimensions-schema")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
        <div
          className="cursor-pointer hover:opacity-80 transition"
          onClick={onHome}
          title="Return to Home"
        >
          <Logo />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={onHome}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            Home
          </button>
          <button
            onClick={onAbout}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            About
          </button>
          <button
            onClick={onFeatures}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            Features
          </button>
          <button
            onClick={onHowItWorks}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            How It Works
          </button>
          <button
            onClick={onBookCoverBee}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            KDP Creator
          </button>
          <button
            onClick={onSpineWidthCalculator}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            Spine Width
          </button>
          <button
            onClick={onPricing}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            Pricing
          </button>
          <button
            onClick={goToContact}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            Contact
          </button>
          <button
            onClick={onStart}
            className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition shadow-md"
          >
            Create Cover
          </button>
        </div>
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <button
            className="absolute top-5 right-8 p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onHome();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onAbout();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            About
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onFeatures();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Features
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onHowItWorks();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onBookCoverBee();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            KDP Creator
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onSpineWidthCalculator();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Spine Width
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onPricing();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              goToContact();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Contact
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onStart();
            }}
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-black text-xl shadow-lg"
          >
            Create Cover
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        <section className=" gap-8 items-stretch">
          <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-8 w-48 h-48 bg-yellow-500/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 space-y-6">
              <span className="inline-flex items-center rounded-full bg-yellow-500 text-black px-4 py-2 text-sm font-black uppercase tracking-[0.2em]">
                Free Size Guide
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                Book Cover Dimensions: A Simple Guide for Authors
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                Getting your book cover dimensions right is essential for KDP
                and print publishing. BookCoverBee makes the process simple by
                calculating the exact size, spine width, and bleed you need in
                seconds.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onStart}
                  className="bg-yellow-500 text-black px-7 py-3 rounded-full font-black hover:bg-yellow-400 transition shadow-lg"
                >
                  Create Cover
                </button>
                <button
                  onClick={onBookCoverBee}
                  className="border border-slate-600 text-white px-7 py-3 rounded-full font-bold hover:border-slate-400 hover:bg-white/5 transition"
                >
                  Explore KDP Creator
                </button>
              </div>
            </div>
          </div>
</section>
        <article className="max-w-4xl mx-auto space-y-12 text-slate-700 leading-relaxed text-lg">
          <section className="space-y-6">
            <p>
              Getting your book cover dimensions right is one of the most important steps in the publishing process. It may not be the most exciting part of creating a book, but it is essential. Even the most beautifully designed cover will be rejected if the sizing is incorrect. For authors using platforms like Amazon KDP, precision is not optional—it is required.
            </p>
            <p>
              This is where BookCoverBee makes the process straightforward. Instead of struggling with technical guides or complicated templates, you can generate the exact dimensions you need in seconds. Whether you are publishing a novel, workbook, memoir, or guide, the platform removes the guesswork and lets you focus on your creative vision.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Understanding Trim Size and Its Purpose
            </h2>
            <p>
              At the heart of book cover design is the concept of trim size. This refers to the final size of your printed book. Common options include 5 &times; 8, 5.5 &times; 8.5, 6 &times; 9, and 8.5 &times; 11. Each of these sizes serves a different purpose. A 5 &times; 8 format is often used for smaller paperbacks, while 6 &times; 9 is one of the most popular sizes for novels and non-fiction titles. Larger formats such as 8.5 &times; 11 are commonly used for workbooks, manuals, and educational material.
            </p>
            <p>
              Choosing the right trim size is the first step. Once that is decided, the total cover size must be calculated. This includes the front cover, back cover, and spine. The spine width depends on your page count and paper type, which is where many authors run into problems. Without accurate calculations, the final file can be misaligned, leading to printing issues or rejection during upload.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Automating Complex Calculations with BookCoverBee
            </h2>
            <p>
              BookCoverBee simplifies this entire process. You begin by selecting your trim size—5 &times; 8, 5.5 &times; 8.5, 6 &times; 9, or 8.5 &times; 11—and then enter your page count. The tool instantly calculates the full cover dimensions, including spine width and bleed. Everything is generated to match publishing requirements, so you do not have to worry about manual calculations or errors.
            </p>
            <p>
              This approach saves a significant amount of time. Traditionally, authors would need to consult detailed guidelines, use spreadsheets, or download templates that require careful adjustment. Even then, mistakes are common. With BookCoverBee, the technical work is handled automatically. You can move forward with confidence, knowing your dimensions are correct from the outset.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              How Dimensions Inform Your Design Decisions
            </h2>
            <p>
              Beyond the numbers, understanding book cover dimensions also helps you make better design decisions. A smaller trim size creates a more compact, intimate feel, while a larger format gives you more space for visual elements and typography. The proportions of your cover influence how it looks both online and in print. By choosing the right size and having accurate dimensions, you give your design the best chance to stand out.
            </p>
            <p>
              Once your dimensions are set, the creative process becomes much easier. BookCoverBee allows you to move directly from measurement to design without switching tools or re-entering data. This seamless transition is one of its biggest strengths. You are not just calculating sizes—you are building your cover in a single workflow.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              A Seamless Workflow from Measurement to AI Design
            </h2>
            <p>
              You can then prompt the AI to generate your design. Describe what you want to see on the cover, including the mood, setting, and key elements of your story. For example, you might request a dramatic skyline for a thriller, a soft pastel scene for a romance, or bold typography for a business book. The AI interprets your input and produces designs that match your vision.
            </p>
            <p>
              This combination of accurate dimensions and intelligent design saves both time and money. Instead of hiring a designer for every project or spending hours learning complex software, you can achieve professional results quickly. The platform is designed to be accessible, whether you are a first-time author or someone with multiple titles.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Benefits for Both New Authors and Pro Designers
            </h2>
            <p>
              For experienced designers, the benefits are just as clear. BookCoverBee acts as a powerful assistant, handling the technical groundwork and enabling rapid concept generation. Designers can experiment with different sizes, layouts, and visual styles without starting from scratch each time. This speeds up the workflow and allows for greater creative exploration.
            </p>
            <p>
              Another important factor is consistency. If you are working on a series, maintaining the same trim size and proportional layout is essential. BookCoverBee ensures that your dimensions remain accurate across multiple books, making it easier to create a cohesive visual identity. This is particularly valuable for authors building a brand or publishing regularly.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Consistency Across Series and Professional Exporting
            </h2>
            <p>
              When it comes to exporting your final design, precision remains key. BookCoverBee allows you to download a high-resolution, print-ready PDF that matches the calculated dimensions exactly. This file can be uploaded directly to publishing platforms without additional adjustments. The result is a smooth, reliable process from start to finish.
            </p>
            <p>
              There is a small cost involved when you decide to export your finished cover, but it is minimal compared to traditional design services. For many authors, the ability to create, refine, and finalise a cover independently is worth far more than the price of export. It offers control, flexibility, and speed in a way that older methods simply cannot match.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              The Foundation of a Professional Book
            </h2>
            <p>
              Book cover dimensions are often seen as a technical hurdle, but they do not have to be. With the right tool, they become a simple starting point rather than a barrier. By selecting your trim size—whether it is 5 &times; 8, 5.5 &times; 8.5, 6 &times; 9, or 8.5 &times; 11—and entering your page count, you can generate everything you need in seconds.
            </p>
            <p>
              In today’s publishing landscape, efficiency matters. Authors are often managing multiple tasks, from writing and editing to marketing and distribution. Tools that save time and reduce complexity are invaluable. BookCoverBee fits naturally into this environment, offering a practical solution to a common challenge.
            </p>
            <p>
              Ultimately, a well-sized cover is the foundation of a professional book. It ensures compatibility with publishing platforms, supports strong design, and contributes to a positive reader experience.
            </p>
            <div className="pt-8 border-t border-slate-200">
              <p className="font-semibold text-slate-900 text-2xl">
                If you want to move quickly, avoid costly mistakes, and produce high-quality results, starting with accurate dimensions is the right approach. With BookCoverBee, that step becomes effortless.
              </p>
            </div>
          </section>
        </article>

        <section className="bg-slate-900 text-white rounded-[2rem] p-10 md:p-14 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/20 blur-[120px] pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Start with the right dimensions, then build the cover
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Accurate sizing is the foundation of a professional book. With
              BookCoverBee, that technical step becomes effortless, leaving you
              free to focus on design, story, and presentation.
            </p>
            <p className="text-lg md:text-xl text-yellow-400 font-bold">
              Move quickly, avoid costly mistakes, and create a cover that is
              ready for publishing.
            </p>
            <button
              onClick={onStart}
              className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-lg hover:bg-yellow-400 transition shadow-lg"
            >
              Create Cover
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BookCoverDimensionsPage;
