import React, { useEffect, useState } from "react";
import { Logo } from "../constants";

const goToContact = () => {
  window.history.pushState({}, "", "/contact");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

interface SpineWidthCalculatorPageProps {
  onStart: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onFeatures: () => void;
  onAbout: () => void;
  onBookCoverBee: () => void;
  onBookCoverDimensions: () => void;
}

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Spine Width Calculator – Free Book Spine Size Tool for KDP",
  url: "https://www.bookcoverbee.com/spine-width-calculator",
  description:
    "Calculate your exact book spine width instantly. Our free spine width calculator for KDP books removes guesswork and ensures perfect cover dimensions based on page count.",
  inLanguage: "en",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "BookCoverBee Spine Width Calculator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: "https://www.bookcoverbee.com/spine-width-calculator",
    description:
      "An AI-powered spine width calculator that instantly calculates book spine thickness based on page count and trim size for accurate KDP cover design.",
    featureList: [
      "Instant spine width calculation",
      "Supports all common trim sizes",
      "KDP-ready measurements",
      "No manual formulas required",
      "Integrated with AI cover generator",
      "Print-ready PDF export",
      "Fast and accurate results",
    ],
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description: "Export high-resolution, print-ready book covers",
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
    "spine width calculator",
    "book spine width calculator",
    "kdp spine width",
    "how to calculate spine width",
    "book spine thickness",
    "paperback spine size",
    "kdp cover spine calculation",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a spine width calculator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A spine width calculator determines the thickness of a book's spine based on page count and paper type, ensuring accurate cover design for printing.",
      },
    },
    {
      "@type": "Question",
      name: "How is book spine width calculated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Spine width is calculated by multiplying the page count by a paper thickness factor. Tools like BookCoverBee automate this process to avoid errors.",
      },
    },
    {
      "@type": "Question",
      name: "Why is spine width important for KDP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Correct spine width ensures your cover aligns properly when printed. Incorrect sizing can lead to rejected uploads or poor visual results.",
      },
    },
    {
      "@type": "Question",
      name: "Can I design and export my cover after calculating spine width?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, after calculating your spine width, you can create your book cover and export a print-ready PDF for a small fee.",
      },
    },
  ],
};

const faqs = [
  {
    question: "What is a spine width calculator?",
    answer:
      "A spine width calculator determines the thickness of a book's spine based on page count and paper type, helping you size your cover correctly for print.",
  },
  {
    question: "How is book spine width calculated?",
    answer:
      "Spine width is usually calculated by multiplying page count by a paper thickness factor. BookCoverBee automates this so you do not have to use formulas manually.",
  },
  {
    question: "Why is spine width important for KDP?",
    answer:
      "Correct spine width keeps the title, author name, and cover alignment in the right place. Incorrect sizing can cause upload rejection or poor print results.",
  },
  {
    question: "Can I design and export after calculating spine width?",
    answer:
      "Yes. After generating the measurements, you can move straight into cover design and export a print-ready PDF from the same workflow.",
  },
];

const SpineWidthCalculatorPage: React.FC<SpineWidthCalculatorPageProps> = ({
  onStart,
  onHome,
  onHowItWorks,
  onPricing,
  onFeatures,
  onAbout,
  onBookCoverBee,
  onBookCoverDimensions,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Spine Width Calculator: Get It Right the First Time";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Use BookCoverBee's spine width calculator to get accurate KDP-ready spine measurements based on page count, then move straight into creating your cover.",
      );
    }

    const existingWebSchema = document.getElementById(
      "spine-width-calculator-schema",
    );
    existingWebSchema?.remove();

    const existingFaqSchema = document.getElementById(
      "spine-width-calculator-faq-schema",
    );
    existingFaqSchema?.remove();

    const webScript = document.createElement("script");
    webScript.id = "spine-width-calculator-schema";
    webScript.type = "application/ld+json";
    webScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webScript);

    const faqScript = document.createElement("script");
    faqScript.id = "spine-width-calculator-faq-schema";
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById("spine-width-calculator-schema")?.remove();
      document
        .getElementById("spine-width-calculator-faq-schema")
        ?.remove();
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
            onClick={onBookCoverBee}
            className="text-slate-600 hover:text-slate-900 font-semibold transition"
          >
            KDP Creator
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
              onBookCoverBee();
            }}
            className="text-2xl font-bold text-slate-800"
          >
            KDP Creator
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
                Spine Width Calculator
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                Spine Width Calculator: Get It Right the First Time
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                Book spine width can be one of the most confusing parts of
                cover design. BookCoverBee removes the formulas and guesswork,
                giving you the exact measurement you need in seconds.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onStart}
                  className="bg-yellow-500 text-black px-7 py-3 rounded-full font-black hover:bg-yellow-400 transition shadow-lg"
                >
                  Create Cover
                </button>
                <button
                  onClick={onBookCoverDimensions}
                  className="border border-slate-600 text-white px-7 py-3 rounded-full font-bold hover:border-slate-400 hover:bg-white/5 transition"
                >
                  View Dimensions Guide
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                What affects spine width?
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                  Page count
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                  Paper thickness
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                  Printing specifications
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 via-amber-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Why it matters
              </h2>
              <p className="text-slate-700 leading-relaxed">
                A spine that is too narrow squeezes your design. A spine that is
                too wide throws off cover alignment. Accurate measurement keeps
                everything balanced and upload-ready.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              A technical task that does not need to feel technical
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Traditionally, authors had to work through platform formulas,
              paper-thickness factors, and static templates to determine spine
              width. Even small errors could lead to rejection or a cover that
              does not align correctly once printed.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              BookCoverBee simplifies that entire process. Enter your page
              count, choose your book size, and the platform instantly provides
              the correct spine width along with the full cover dimensions.
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <article className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Why BookCoverBee’s spine width calculator saves time
            </h2>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>
                Instead of digging through KDP documentation or manually
                multiplying page count by a paper factor, you get accurate
                results immediately. That means less time double-checking
                numbers and more time focusing on the cover itself.
              </p>
              <p>
                This is especially useful when your manuscript changes. If the
                page count shifts during editing, you can update the number and
                generate a fresh spine width instantly without restarting the
                workflow.
              </p>
              <p>
                The result is greater confidence and consistency, whether you
                are publishing your first paperback or managing several books in
                a series.
              </p>
            </div>
          </article>

          <aside className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl">
            <h2 className="text-2xl font-black mb-6">What you get</h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Exact spine width based on your project inputs
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Full cover dimensions for front, back, and spine
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Seamless move from calculation into cover creation
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Print-ready export with the exact measurements applied
              </li>
            </ul>
          </aside>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Precision meets creativity
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              Once your spine width is set, BookCoverBee keeps the workflow
              moving. You can describe the mood, setting, genre, and story
              details you want represented, and the AI generates concepts that
              fit the measurements already calculated.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              That combination of exact technical setup and fast concept
              generation is what turns the tool into more than a calculator. It
              becomes a practical design assistant.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Better for first books and ongoing series
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              New authors get reassurance that the measurements are right.
              Experienced authors and designers get a faster, cleaner workflow
              that supports consistency across multiple titles.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              When the technical parts are handled automatically, it becomes
              much easier to maintain a strong, cohesive visual identity from
              one book to the next.
            </p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900">
                Export with fewer surprises
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                BookCoverBee lets you download a print-ready PDF with the exact
                spine width and cover dimensions already applied, reducing the
                risk of rejection and last-minute fixes.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Fast
                </div>
                <p className="text-slate-600">
                  No manual formulas or spreadsheet work
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Accurate
                </div>
                <p className="text-slate-600">
                  Correct spine sizing for professional alignment
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Flexible
                </div>
                <p className="text-slate-600">
                  Update page counts and recalculate instantly
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
              Stop second-guessing your spine measurements
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              BookCoverBee gives you the precision you need, the speed you want,
              and a much simpler path from page count to finished cover.
            </p>
            <p className="text-lg md:text-xl text-yellow-400 font-bold">
              Get the spine width right, then move straight into creating your
              cover.
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

export default SpineWidthCalculatorPage;
