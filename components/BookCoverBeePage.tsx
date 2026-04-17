import React, { useEffect, useState } from "react";
import { Logo } from "../constants";

const goToContact = () => {
  window.history.pushState({}, "", "/contact");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

interface BookCoverBeePageProps {
  onStart: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onFeatures: () => void;
  onAbout: () => void;
  onBookCoverDimensions: () => void;
  onSpineWidthCalculator: () => void;
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "BookCoverBee – AI KDP Cover Creator and Size Calculator",
  url: "https://www.bookcoverbee.com/",
  description:
    "Create professional book covers in minutes with BookCoverBee. An AI-powered KDP cover creator and book cover size calculator that saves time and money. Generate, design and export high-quality PDF covers for any genre.",
  inLanguage: "en",
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://www.bookcoverbee.com/cover-preview.jpg",
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
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "BookCoverBee",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: "https://www.bookcoverbee.com/",
    description:
      "An AI-powered book cover creator and KDP cover size calculator that allows authors to design, customise and export print-ready covers quickly and affordably.",
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description: "Low-cost export of high-resolution PDF book covers",
    },
    featureList: [
      "KDP cover size calculator",
      "AI book cover generator",
      "Spine width calculation",
      "Custom trim size selection",
      "Print-ready PDF export",
      "Supports all book genres",
      "Fast and easy cover creation",
    ],
  },
  about: {
    "@type": "Thing",
    name: "KDP Cover Creator and Book Cover Design",
  },
  keywords: [
    "kdp cover creator",
    "book cover dimensions",
    "spine width calculator",
    "ai book cover generator",
    "create book cover online",
    "paperback cover size",
    "amazon kdp cover requirements",
  ],
};

const BookCoverBeePage: React.FC<BookCoverBeePageProps> = ({
  onStart,
  onHome,
  onHowItWorks,
  onPricing,
  onFeatures,
  onAbout,
  onBookCoverDimensions,
  onSpineWidthCalculator,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "BookCoverBee: Your Intelligent KDP Cover Creator";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Discover BookCoverBee, the intelligent KDP cover creator that calculates correct dimensions, generates AI-powered concepts, and exports print-ready PDF covers fast.",
      );
    }

    const existingSchema = document.getElementById("bookcoverbee-schema");
    existingSchema?.remove();

    const script = document.createElement("script");
    script.id = "bookcoverbee-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("bookcoverbee-schema")?.remove();
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
            onClick={onBookCoverDimensions}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            Dimensions
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
              onBookCoverDimensions();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Dimensions
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
                Intelligent KDP Cover Creator
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                BookCoverBee: Your Intelligent KDP Cover Creator
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                Designing a professional book cover used to be slow, expensive,
                and frustrating. BookCoverBee changes that with precise KDP
                sizing, AI-driven design, and a streamlined workflow built for
                authors.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onStart}
                  className="bg-yellow-500 text-black px-7 py-3 rounded-full font-black hover:bg-yellow-400 transition shadow-lg"
                >
                  Start Creating
                </button>
                <button
                  onClick={onHowItWorks}
                  className="border border-slate-600 text-white px-7 py-3 rounded-full font-bold hover:border-slate-400 hover:bg-white/5 transition"
                >
                  See How It Works
                </button>
              </div>
            </div>
          </div>
</section>
        <article className="max-w-4xl mx-auto space-y-12 text-slate-700 leading-relaxed text-lg">
          <section className="space-y-6">
            <p>
              Designing a professional book cover used to be a slow, expensive, and often frustrating process. Authors would spend hours trying to understand sizing requirements, hire designers at significant cost, or wrestle with complicated software that never quite delivered the vision they had in mind. BookCoverBee changes that completely. It is a practical, intuitive tool built specifically for writers who want high-quality covers without the usual hassle.
            </p>
            <p>
              At its core, BookCoverBee is both a KDP cover creator and a smart design assistant. It combines precise measurement tools with AI-driven design capabilities, allowing you to move from idea to finished cover in a fraction of the time. Whether you are publishing your first book or adding to an existing catalogue, the platform simplifies every step.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Eliminating the Technical Hurdles of Self-Publishing
            </h2>
            <p>
              One of the biggest challenges in self-publishing is getting the dimensions right. Amazon KDP has strict requirements, and even a small error in spine width or bleed can result in rejected files. BookCoverBee removes that uncertainty. You simply choose your trim size—such as 5x8, 6x9, or 8.5 x 11—enter your page count, and the tool calculates everything for you instantly. The correct cover size, spine width, and margins are generated automatically, ensuring your design is compliant from the start.
            </p>
            <p>
              This alone can save hours of research and trial and error. Instead of reading through technical guidelines or adjusting templates repeatedly, you can focus on what really matters: the look and feel of your book.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Unleashing Creativity with AI-Driven Design
            </h2>
            <p>
              Once your dimensions are set, the creative process begins. BookCoverBee allows you to prompt its AI with clear, simple instructions. You can describe what you want on the cover in natural language. Mention the key elements of your story, the mood you want to convey, and the setting in which your narrative takes place. Whether it’s a dark thriller set in a rain-soaked city, a romantic novel on a sunlit beach, or a fantasy epic in a distant kingdom, the AI interprets your ideas and transforms them into visual concepts.
            </p>
            <p>
              This is where the tool truly shines. You are not limited to templates or generic layouts. Instead, you are guiding a design process that adapts to your vision. Authors who may never have used design software before can still produce covers that look polished and market-ready.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              A Versatile Tool for Both Authors and Professionals
            </h2>
            <p>
              At the same time, experienced designers can benefit just as much. BookCoverBee is not a replacement for creativity—it is a powerful accelerator. Designers can use it to generate concepts quickly, test different directions, and refine ideas without starting from scratch each time. What might have taken hours in traditional software can now be achieved in minutes, freeing up time for fine-tuning and artistic decisions.
            </p>
            <p>
              Speed is one of the most noticeable advantages. In the past, creating a book cover could take days or even weeks, especially if revisions were involved. With BookCoverBee, you can move from initial concept to a finished design in a single session. This is particularly valuable for authors working to deadlines or managing multiple titles.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Maximizing Speed and Budget Control
            </h2>
            <p>
              Cost savings are another major benefit. Hiring a professional designer can be expensive, and while that route still has its place, not every project requires a large budget. BookCoverBee offers a more accessible option. You can generate, refine, and preview your cover at minimal cost, paying only when you are ready to export the final version. For many authors, this means keeping more control over their publishing budget while still achieving a professional result.
            </p>
            <p>
              The output quality is designed to meet real publishing standards. When you are satisfied with your design, you can export your finished masterpiece as a high-resolution PDF, ready for upload to KDP or other publishing platforms. The formatting is handled for you, so there is no need to worry about alignment issues or technical errors at the final stage.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Professional Results for Every Genre and Series
            </h2>
            <p>
              BookCoverBee is suitable for writers and authors across all genres. Whether you are producing fiction or non-fiction, romance or science fiction, memoir or business guides, the tool adapts to your needs. Each genre has its own visual language, and the AI can interpret prompts accordingly, helping you create covers that resonate with your target audience.
            </p>
            <p>
              Consistency is another major advantage. If you are creating a series, BookCoverBee makes it easy to maintain a cohesive visual style across multiple books. By adjusting your prompts and reusing key elements, you can develop a recognisable brand for your work without starting from zero each time.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              A Simpler Path to a Stronger Presence
            </h2>
            <p>
              The process itself is straightforward. You begin by selecting your book size and entering your page count. This establishes the correct dimensions. Next, you describe your ideal cover. You might include details about characters, themes, colours, or atmosphere. The AI then generates design options based on your input. From there, you can refine your prompt, adjust elements, and explore variations until you find the version that feels right.
            </p>
            <p>
              In a competitive marketplace, a strong cover is not optional—it is essential. Readers often make split-second decisions based on visual appeal. A well-designed cover communicates professionalism, genre, and tone before a single word is read. BookCoverBee gives you the tools to achieve that level of quality without unnecessary complexity.
            </p>
            <div className="pt-8 border-t border-slate-200">
              <p className="font-semibold text-slate-900 text-2xl">
                Ultimately, the platform is about removing barriers. It takes something that was once technical and time-consuming and makes it accessible, efficient, and even enjoyable. You just need an idea and a tool that can carry it forward.
              </p>
            </div>
          </section>
        </article>

        <section className="bg-slate-900 text-white rounded-[2rem] p-10 md:p-14 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/20 blur-[120px] pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Your story deserves a cover that feels intentional
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              BookCoverBee brings together precision, creativity, and speed for
              modern publishing. You do not need advanced design skills,
              expensive software, or a large budget. You just need an idea and a
              tool that can carry it forward.
            </p>
            <p className="text-lg md:text-xl text-yellow-400 font-bold">
              Create a cover that meets technical requirements and captures the
              essence of your work with confidence.
            </p>
            <button
              onClick={onStart}
              className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-lg hover:bg-yellow-400 transition shadow-lg"
            >
              Create Your Cover
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BookCoverBeePage;
