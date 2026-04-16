import React, { useEffect, useState } from "react";
import { Logo } from "../constants";

const goToContact = () => {
  window.history.pushState({}, "", "/contact");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

interface BookCoverMakerFreePageProps {
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
  name: "Book Cover Maker Free – Create Covers Online with AI",
  url: "https://www.bookcoverbee.com/book-cover-maker-free",
  description:
    "Use our free book cover maker to design professional covers online. Generate unlimited designs with AI and only pay when you export your final PDF.",
  inLanguage: "en",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "BookCoverBee Free Book Cover Maker",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    url: "https://www.bookcoverbee.com/book-cover-maker-free",
    description:
      "An AI-powered book cover maker that allows authors to create, customise and preview designs for free, with optional paid export to high-quality PDF.",
    featureList: [
      "Free book cover design generation",
      "AI-powered cover creation",
      "No design experience required",
      "Unlimited design previews",
      "Only pay to export final PDF",
      "Supports all book genres",
      "KDP-ready cover formatting",
      "Fast and easy to use",
    ],
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description:
        "Optional paid export of high-resolution, print-ready book covers",
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
    "book cover maker free",
    "free book cover creator",
    "ai book cover generator",
    "create book cover online free",
    "book cover design tool",
    "kdp cover creator free",
    "book cover maker online",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is BookCoverBee really free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can generate and preview book cover designs for free. You only pay a small fee if you choose to export your final cover as a PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Can I design unlimited book covers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can create and refine as many designs as you like using the AI without any upfront cost.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need design experience?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, BookCoverBee is designed for beginners and professionals. You simply describe your cover and the AI generates it for you.",
      },
    },
    {
      "@type": "Question",
      name: "What format do I get when I export?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You receive a high-resolution, print-ready PDF suitable for Amazon KDP and other publishing platforms.",
      },
    },
  ],
};

const faqs = [
  {
    question: "Is BookCoverBee really free to use?",
    answer:
      "Yes. You can generate and preview designs for free, then pay only when you want to export the final cover as a PDF.",
  },
  {
    question: "Can I design unlimited book covers?",
    answer:
      "Yes. You can explore and refine as many cover ideas as you like before deciding which one to export.",
  },
  {
    question: "Do I need design experience?",
    answer:
      "No. BookCoverBee is built for writers and professionals alike, so you can describe your idea in plain language and let the AI generate the visuals.",
  },
  {
    question: "What format do I get when I export?",
    answer:
      "You receive a high-resolution, print-ready PDF suitable for Amazon KDP and other publishing platforms.",
  },
];

const BookCoverMakerFreePage: React.FC<BookCoverMakerFreePageProps> = ({
  onStart,
  onHome,
  onHowItWorks,
  onPricing,
  onFeatures,
  onAbout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Book Cover Maker Free: Design First, Pay Only When You Love It";

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Design book covers for free with BookCoverBee, explore unlimited AI-generated concepts, and only pay when you export the final print-ready PDF.",
      );
    }

    const existingWebSchema = document.getElementById(
      "book-cover-maker-free-schema",
    );
    existingWebSchema?.remove();

    const existingFaqSchema = document.getElementById(
      "book-cover-maker-free-faq-schema",
    );
    existingFaqSchema?.remove();

    const webScript = document.createElement("script");
    webScript.id = "book-cover-maker-free-schema";
    webScript.type = "application/ld+json";
    webScript.text = JSON.stringify(webPageSchema);
    document.head.appendChild(webScript);

    const faqScript = document.createElement("script");
    faqScript.id = "book-cover-maker-free-faq-schema";
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      document.getElementById("book-cover-maker-free-schema")?.remove();
      document.getElementById("book-cover-maker-free-faq-schema")?.remove();
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
                Design First, Pay Later
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                Book Cover Maker Free: Design First, Pay Only When You Love It
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
                BookCoverBee lets you generate, preview, and refine covers
                without upfront cost, then pay a small fee only when you are
                ready to export the final print-ready PDF.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={onStart}
                  className="bg-yellow-500 text-black px-7 py-3 rounded-full font-black hover:bg-yellow-400 transition shadow-lg"
                >
                  Start Designing for Free
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Why authors like it
              </h2>
              <ul className="space-y-3 text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                  No upfront design cost
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                  Unlimited design exploration
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                  Export only when satisfied
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 via-amber-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                Built for writers
              </h2>
              <p className="text-slate-700 leading-relaxed">
                No complicated design software, no endless menu hunting, and no
                pressure to commit before you have found the right direction.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="max-w-4xl space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Free to explore, simple to use
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Creating a professional cover used to mean choosing between an
              expensive designer or a tool that was difficult to learn.
              BookCoverBee changes that by letting you experiment freely before
              spending anything at all.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Start with your trim size and page count, and the platform handles
              the technical setup automatically. Dimensions, spine width, and
              layout are prepared for you so you can move directly into the
              creative part of the process.
            </p>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <article className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Why the design-first model works
            </h2>
            <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>
                Instead of paying before you know whether you even like the
                result, you can generate ideas, compare different directions,
                and keep refining until the cover feels right. That removes
                pressure and turns the design phase into something more
                creative, flexible, and low risk.
              </p>
              <p>
                This also saves time. AI-generated options appear in minutes,
                letting you explore multiple concepts without restarting from
                scratch. The result is a much faster route from first idea to
                polished cover.
              </p>
              <p>
                If the design needs work, you simply adjust the prompt and try
                again. There is no wasted money, only progress toward a better
                cover.
              </p>
            </div>
          </article>

          <aside className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl">
            <h2 className="text-2xl font-black mb-6">What you get</h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                AI-generated cover concepts for any genre
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                Simple natural-language prompting
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                KDP-ready dimensions and formatting support
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                High-resolution PDF export when ready
              </li>
            </ul>
          </aside>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Useful for beginners and pros
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              New authors can translate ideas into visuals without learning
              design software first. Experienced designers can use BookCoverBee
              as a concepting assistant, generating quick first drafts and
              testing new directions more efficiently.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              That flexibility makes it just as practical for first books as it
              is for ongoing series or larger publishing workflows.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-100 via-yellow-50 to-white border border-yellow-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Better control with less risk
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-5">
              Because you only pay at export time, you know exactly what you are
              getting before spending anything. That lowers the financial risk
              of experimentation and gives you more confidence in your choices.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              For authors working on multiple books, this is especially helpful
              because you can refine a consistent look across titles without
              committing too early.
            </p>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 shadow-sm">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900">
                Export when you are ready
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                When the cover feels complete, BookCoverBee exports a
                high-resolution, print-ready PDF suitable for KDP and other
                publishing platforms.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Free
                </div>
                <p className="text-slate-600">
                  Design and preview without upfront cost
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Fast
                </div>
                <p className="text-slate-600">
                  Generate multiple polished concepts quickly
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center">
                <div className="text-3xl font-black text-slate-900 mb-2">
                  Flexible
                </div>
                <p className="text-slate-600">
                  Pay only when you love the result
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
              Design with freedom, export with confidence
            </h2>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              BookCoverBee gives you room to explore, refine, and discover the
              right cover before paying for the final file.
            </p>
            <p className="text-lg md:text-xl text-yellow-400 font-bold">
              Create without pressure, then export only when you love what you
              see.
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

export default BookCoverMakerFreePage;
