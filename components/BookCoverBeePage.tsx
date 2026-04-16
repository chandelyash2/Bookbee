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
        <section className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
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

          <div className="grid gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Why it matters
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Amazon KDP has strict cover requirements, and even a small error
                in spine width or bleed can cause rejected files. BookCoverBee
                handles the calculations automatically so you can stay focused
                on the story your cover needs to sell.
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 via-amber-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Built for speed
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Move from idea to finished cover in a single session. Generate
                concepts, refine prompts, and export a high-resolution PDF
                without switching tools or starting from scratch.
              </p>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <article className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              A practical tool for authors and designers
            </h2>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>
                At its core, BookCoverBee is both a KDP cover creator and a
                smart design assistant. It combines precise measurement tools
                with AI-driven design capabilities, allowing you to move from
                idea to finished cover in a fraction of the time.
              </p>
              <p>
                Authors can describe their cover in natural language by
                mentioning story elements, mood, setting, colors, or genre cues.
                Whether it is a dark thriller in a rain-soaked city, a romance
                on a sunlit beach, or a fantasy epic in a distant kingdom, the
                AI turns those ideas into visual directions.
              </p>
              <p>
                Experienced designers benefit too. BookCoverBee is not a
                replacement for creativity. It is an accelerator for concepting,
                testing different directions, and refining ideas quickly instead
                of rebuilding every variation by hand.
              </p>
            </div>
          </article>

          <aside className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl">
            <h2 className="text-2xl font-black mb-6">Core capabilities</h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                KDP cover size calculator with spine width and bleed handling
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                AI-powered book cover prompt generation and concept creation
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Print-ready PDF export for upload to KDP and similar platforms
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Flexible workflow for one-off covers and multi-book series
              </li>
            </ul>
          </aside>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Correct dimensions without the research spiral
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              One of the biggest challenges in self-publishing is getting the
              dimensions right. BookCoverBee removes that uncertainty. Choose a
              trim size such as 5 x 8, 6 x 9, or 8.5 x 11, enter your page
              count, and the platform instantly calculates the full cover size,
              spine width, and safe margins needed for compliance.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              That means less time buried in technical guidelines and more time
              shaping the look and feel of your book. Instead of wrestling with
              templates, you can work with confidence from the first draft of
              the cover onward.
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              How the workflow feels
            </h2>
            <ol className="space-y-5 text-slate-700 leading-relaxed">
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-black">
                  1
                </span>
                Select your book size and page count to establish exact cover
                dimensions.
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-black">
                  2
                </span>
                Describe your ideal cover with characters, themes, colors, and
                atmosphere in plain language.
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-black">
                  3
                </span>
                Review AI-generated directions, refine the prompt, and explore
                variations until the cover feels right.
              </li>
              <li className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-black">
                  4
                </span>
                Export a print-ready PDF when you are happy with the result.
              </li>
            </ol>
          </div>

          <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-x-10 bottom-0 h-28 bg-yellow-500/20 blur-3xl pointer-events-none"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black">What authors gain</h2>
              <div className="grid gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h3 className="font-black text-yellow-400 mb-2">Speed</h3>
                  <p className="text-slate-300">
                    Go from concept to finished design in minutes instead of
                    days or weeks.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h3 className="font-black text-yellow-400 mb-2">
                    Cost control
                  </h3>
                  <p className="text-slate-300">
                    Keep budgets lean by paying only when you are ready to
                    export the final print-ready file.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h3 className="font-black text-yellow-400 mb-2">
                    Series consistency
                  </h3>
                  <p className="text-slate-300">
                    Reuse prompt patterns and key design elements to create a
                    recognizable multi-book brand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Suitable for every genre
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              BookCoverBee adapts to fiction and non-fiction alike. Romance,
              science fiction, memoir, business, thriller, fantasy, and more
              each have a different visual language, and the AI can respond to
              those cues to help you produce something that fits your audience.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              In a crowded marketplace, a strong cover communicates
              professionalism, genre, and tone before a single page is read.
              BookCoverBee helps you reach that level of quality without
              unnecessary complexity.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              High-quality output
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              When you are satisfied with your design, BookCoverBee exports a
              high-resolution PDF ready for KDP or other publishing platforms.
              Alignment, formatting, and technical output are handled for you.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              The result is a practical path from idea to finished cover:
              quicker, more affordable, and much less intimidating than
              traditional workflows.
            </p>
          </div>
        </section>

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
