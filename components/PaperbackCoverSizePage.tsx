import React, { useEffect, useState } from "react";
import { Logo } from "../constants";

const goToContact = () => {
  window.history.pushState({}, "", "/contact");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

interface PaperbackCoverSizePageProps {
  onStart: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onFeatures: () => void;
  onAbout: () => void;
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Paperback Cover Size – Free Calculator for Book Cover Dimensions",
  url: "https://www.bookcoverbee.com/paperback-cover-size",
  description:
    "Easily calculate your paperback cover size with our free tool. Get accurate dimensions for 5x8, 5.5x8.5, 6x9 and 8.5x11 books, including spine width and bleed for KDP publishing.",
  inLanguage: "en",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "BookCoverBee Paperback Cover Size Calculator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: "https://www.bookcoverbee.com/paperback-cover-size",
    description:
      "An AI-powered tool that calculates paperback cover size instantly, including spine width and bleed, ensuring accurate dimensions for KDP and print publishing.",
    featureList: [
      "Paperback cover size calculator",
      "Supports 5x8, 5.5x8.5, 6x9 and 8.5x11 trim sizes",
      "Automatic spine width calculation",
      "Includes bleed and margins",
      "KDP-ready dimensions",
      "Fast and easy to use",
      "AI book cover generation",
      "Print-ready PDF export",
    ],
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description: "Download high-resolution, print-ready book covers",
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
    "paperback cover size",
    "book cover dimensions",
    "kdp paperback cover size",
    "6x9 paperback cover dimensions",
    "spine width calculator",
    "amazon kdp cover size",
    "book cover size calculator",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a paperback cover size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paperback cover size includes the full spread of the book cover, including the front cover, back cover, spine, and bleed area.",
      },
    },
    {
      "@type": "Question",
      name: "How do I calculate paperback cover size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paperback cover size is calculated based on trim size and page count. Tools like BookCoverBee automatically calculate the full dimensions including spine width and bleed.",
      },
    },
    {
      "@type": "Question",
      name: "What are common paperback sizes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common paperback sizes include 5x8, 5.5x8.5, 6x9, and 8.5x11, depending on the type of book being published.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create and download my book cover?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can design your paperback cover using BookCoverBee and export a print-ready PDF for a small fee.",
      },
    },
  ],
};

const faqs = [
  {
    question: "What is a paperback cover size?",
    answer:
      "Paperback cover size is the full spread of the cover, including the front, back, spine, and bleed area needed for print production.",
  },
  {
    question: "How do I calculate paperback cover size?",
    answer:
      "It is calculated from your trim size and page count, with spine width and bleed added in. BookCoverBee automates the full calculation for you.",
  },
  {
    question: "What are common paperback sizes?",
    answer:
      "Common paperback sizes include 5 x 8, 5.5 x 8.5, 6 x 9, and 8.5 x 11, depending on the type of book you are publishing.",
  },
  {
    question: "Can I create and download my book cover?",
    answer:
      "Yes. After sizing the cover, you can create your design and export a print-ready PDF for a small fee.",
  },
];

const linkClass =
  "font-bold text-yellow-300 underline decoration-yellow-400/70 underline-offset-4 hover:text-yellow-200";

const PaperbackCoverSizePage: React.FC<PaperbackCoverSizePageProps> = ({
  onStart,
  onHome,
  onHowItWorks,
  onPricing,
  onFeatures,
  onAbout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Paperback Cover Size Calculator";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Use BookCoverBee's paperback cover size calculator to get accurate dimensions, spine width, and bleed for KDP-ready paperback covers in seconds.",
      );
    }

    const existingWebSchema = document.getElementById(
      "paperback-cover-size-schema",
    );
    existingWebSchema?.remove();

    const existingFaqSchema = document.getElementById(
      "paperback-cover-size-faq-schema",
    );
    existingFaqSchema?.remove();

    const webScript = document.createElement("script");
    webScript.id = "paperback-cover-size-schema";
    webScript.type = "application/ld+json";
    webScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webScript);

    const faqScript = document.createElement("script");
    faqScript.id = "paperback-cover-size-faq-schema";
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById("paperback-cover-size-schema")?.remove();
      document.getElementById("paperback-cover-size-faq-schema")?.remove();
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
                Paperback Size Guide
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                Paperback Cover Size Calculator
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                Our <strong>paperback cover size calculator</strong> takes the
                stress out of sizing by generating accurate trim, spine, and
                bleed measurements in seconds, so you can stop second-guessing
                the technical side of publishing.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onStart}
                  className="bg-yellow-500 text-black px-7 py-3 rounded-full font-black hover:bg-yellow-400 transition shadow-lg"
                >
                  Calculate Your Paperback Cover Size Now
                </button>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Related tools:
                {" "}
                <a href="/book-cover-dimensions" className={linkClass}>
                  Book Cover Dimensions
                </a>
                {" "}
                <span className="text-slate-500">/</span>
                {" "}
                <a href="/spine-width-calculator" className={linkClass}>
                  Spine Width Calculator
                </a>
                {" "}
                <span className="text-slate-500">/</span>
                {" "}
                <a href="/kdp-cover-size-calculator" className={linkClass}>
                  KDP Cover Size Calculator
                </a>
                {" "}
                <span className="text-slate-500">/</span>
                {" "}
                <a href="/bookcoverbee" className={linkClass}>
                  Book Cover Creator
                </a>
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Common sizes
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
                Why authors use it
              </h2>
              <p className="text-slate-700 leading-relaxed">
                The full cover must account for front, back, spine, and bleed.
                BookCoverBee calculates all of it together so you can keep your
                workflow moving.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Why paperback cover size calculator workflows matter
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Working out the correct paperback cover size can quickly turn into
              a frustrating detour. Instead of staying in creative mode, you end
              up comparing guides, checking templates, and wondering whether one
              small measurement mistake is going to delay publication.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              BookCoverBee removes that uncertainty. Choose your trim size,
              enter your page count, and the platform instantly returns the full
              cover dimensions, complete with spine width and bleed.
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <article className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              How the paperback cover size calculator keeps things simple
            </h2>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>
                Once trim size is chosen, the total width of the cover depends
                on the front panel, back panel, spine width, and bleed. Trying
                to manage that manually often means hopping between multiple
                tools and hoping everything still lines up at the end.
              </p>
              <p>
                With BookCoverBee, that complexity disappears. The tool
                calculates the full paperback cover size for formats such as
                5 x 8, 5.5 x 8.5, 6 x 9, and 8.5 x 11 automatically, so there
                is no need to memorize formulas or rebuild templates.
              </p>
              <p>
                If you want deeper guidance for related steps, you can also
                explore our
                {" "}
                <a href="/book-cover-dimensions" className="font-bold text-slate-900 underline underline-offset-4">
                  book cover dimensions guide
                </a>
                {" "}
                or check the
                {" "}
                <a href="/spine-width-calculator" className="font-bold text-slate-900 underline underline-offset-4">
                  spine width calculator
                </a>
                {" "}
                for a more focused measurement breakdown.
              </p>
            </div>
          </article>

          <aside className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl">
            <h2 className="text-2xl font-black mb-6">Built for speed</h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Instant results for every new title
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Automatic spine width and bleed handling
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Smooth handoff into AI-assisted cover design
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Print-ready export when your cover is finished
              </li>
            </ul>
          </aside>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              From measurement to Book Cover Creator
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              Once the sizing is set, the creative side becomes much easier.
              You can move directly into the
              {" "}
              <a href="/bookcoverbee" className="font-bold text-slate-900 underline underline-offset-4">
                Book Cover Creator
              </a>
              {" "}
              and start prompting the AI with mood, setting, genre cues, and
              story details to generate cover concepts that match your vision.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              That means no re-entering data, no switching between sizing and
              design tools, and no extra friction between planning and
              production.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              A cleaner route to KDP-ready covers
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              If your goal is a KDP-ready cover, you can pair this page with our
              {" "}
              <a href="/kdp-cover-size-calculator" className="font-bold text-slate-900 underline underline-offset-4">
                KDP cover size calculator
              </a>
              {" "}
              workflow to move from accurate measurements to final design
              without extra steps.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              The result is more confidence, fewer last-minute corrections, and
              a much smoother publishing experience.
            </p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900">
                Export without second-guessing
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                BookCoverBee gives you a high-resolution, print-ready PDF that
                matches the calculated dimensions exactly, making upload far less
                stressful.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Fast
                </div>
                <p className="text-slate-600">
                  Seconds instead of repeated manual checks
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Accurate
                </div>
                <p className="text-slate-600">
                  Correct spine, bleed, and full cover size
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Flexible
                </div>
                <p className="text-slate-600">
                  Recalculate instantly if page count changes
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <h2 className="text-3xl font-black text-slate-900 mb-8">
            Common questions
          </h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white rounded-[2rem] p-10 md:p-14 shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/20 blur-[120px] pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Paperback cover sizing does not need to slow you down
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              BookCoverBee turns a once-confusing technical step into a fast,
              reliable part of your publishing workflow.
            </p>
            <p className="text-lg md:text-xl text-yellow-400 font-bold">
              No more uncertainty. Just accurate paperback cover size results,
              delivered instantly.
            </p>
            <button
              onClick={onStart}
              className="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-lg hover:bg-yellow-400 transition shadow-lg"
            >
              Calculate Your Paperback Cover Size Now
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaperbackCoverSizePage;
