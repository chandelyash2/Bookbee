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
        <section className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
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

          <div className="grid gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Supported trim sizes
              </h2>
              <div className="grid grid-cols-2 gap-3 text-center text-slate-700 font-bold">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-5">
                  5 x 8
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-5">
                  5.5 x 8.5
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-5">
                  6 x 9
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-5">
                  8.5 x 11
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 via-amber-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Why accuracy matters
              </h2>
              <p className="text-slate-700 leading-relaxed">
                Even a beautiful cover can be rejected if its sizing is wrong.
                For Amazon KDP, precision is not optional. Correct measurements
                protect your upload, your alignment, and the final printed
                result.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              The foundation of a professional cover
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              At the heart of book cover design is trim size, the final size of
              your printed book. Smaller formats such as 5 x 8 are often used
              for compact paperbacks, while 6 x 9 remains one of the most common
              choices for novels and non-fiction. Larger formats like 8.5 x 11
              are often used for workbooks, manuals, and educational titles.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Once trim size is selected, the full cover must account for the
              back cover, front cover, spine, and bleed. The spine width changes
              with page count, which is exactly where manual workflows often
              become frustrating.
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <article className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              How BookCoverBee simplifies book cover dimensions
            </h2>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>
                BookCoverBee removes the guesswork. Select your trim size, enter
                your page count, and the tool instantly calculates the complete
                cover dimensions, including spine width and bleed. Everything is
                generated to match publishing requirements, so there is no need
                for spreadsheets, downloaded templates, or repeated manual
                checks.
              </p>
              <p>
                This saves a significant amount of time and reduces the chance
                of rejection during upload. Instead of losing hours to
                technical documentation, you can move directly into designing
                the cover itself.
              </p>
              <p>
                Understanding dimensions also improves design decisions. Smaller
                books feel more intimate, while larger formats create more room
                for typography and visual detail. Accurate sizing gives your
                design the best chance to look strong online and in print.
              </p>
            </div>
          </article>

          <aside className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl">
            <h2 className="text-2xl font-black mb-6">What the tool handles</h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Full wrap size for front, back, and spine
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Automatic page-count-based spine calculations
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Bleed included for KDP-ready exports
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Seamless transition from sizing to AI-assisted cover design
              </li>
            </ul>
          </aside>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              From dimensions to design in one flow
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              Once the measurements are set, BookCoverBee lets you move directly
              into the creative process. Describe the mood, setting, tone, and
              key elements you want on the cover. Ask for a dramatic skyline for
              a thriller, a soft pastel scene for a romance, or bold typography
              for a business title, and the AI generates concepts that match
              your direction.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Instead of switching between calculators, templates, and design
              tools, you can build the entire cover in one workflow.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Helpful for authors and designers
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              First-time authors get a straightforward path through a technical
              step that often feels intimidating. Experienced designers gain a
              faster concepting workflow, easier experimentation across trim
              sizes, and more time for refinement.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              If you are creating a series, consistent trim sizes and
              proportions also make it easier to maintain a recognizable visual
              identity across multiple books.
            </p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900">
                Export with confidence
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                BookCoverBee exports a high-resolution, print-ready PDF that
                matches the calculated dimensions exactly. That means fewer
                manual fixes, fewer surprises, and a smoother path to upload.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Fast
                </div>
                <p className="text-slate-600">
                  Instant calculations without spreadsheets
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Precise
                </div>
                <p className="text-slate-600">
                  KDP-ready sizing with bleed and spine support
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Flexible
                </div>
                <p className="text-slate-600">
                  One workflow from measurement to final cover
                </p>
              </div>
            </div>
          </div>
        </section>

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
