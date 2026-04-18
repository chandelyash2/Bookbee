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
      name: "What is bleed in paperback sizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bleed is an extra 0.125 inches (3.2 mm) added to all outer edges of your cover to ensure no white gaps appear after the book is trimmed during printing.",
      },
    },
    {
      "@type": "Question",
      name: "Is this calculator accurate for Amazon KDP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our calculator follows KDP's exact specifications for trim size, spine width (based on paper type), and bleed requirements.",
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
    question: "What is bleed in paperback sizing?",
    answer:
      "Bleed is an extra 0.125\" (3.2mm) added to all outer edges of your cover. This ensures your design reaches the very edge after the physical book is trimmed.",
  },
  {
    question: "Is this calculator accurate for Amazon KDP?",
    answer:
      "Absolutely. We use KDP's official math for spine width and bleed to ensure your file is accepted the first time you upload it.",
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
        <section className=" gap-8 items-stretch">
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
                Related tools:{" "}
                <a href="/book-cover-dimensions" className={linkClass}>
                  Book Cover Dimensions
                </a>{" "}
                <span className="text-slate-500">/</span>{" "}
                <a href="/spine-width-calculator" className={linkClass}>
                  Spine Width Calculator
                </a>{" "}
                <span className="text-slate-500">/</span>{" "}
                <a href="/kdp-cover-size-calculator" className={linkClass}>
                  KDP Cover Size Calculator
                </a>{" "}
                <span className="text-slate-500">/</span>{" "}
                <a href="/" className={linkClass}>
                  Book Cover Creator
                </a>
              </p>
            </div>
          </div>
        </section>

        <article className="max-w-4xl mx-auto space-y-12 text-slate-700 leading-relaxed text-lg">
          <section className="space-y-6">
            <p>
              Working out the correct paperback cover size can feel more
              complicated than it should be. For many authors, it becomes one of
              those frustrating steps that interrupts the creative flow. This is
              why using a dedicated{" "}
              <strong>Paperback Cover Size Calculator</strong> is essential.
              You’ve written your book, refined your manuscript, and now you’re
              faced with measurements, templates, and technical requirements
              that seem unnecessarily complex.
            </p>
            <p>
              It is not uncommon to find yourself double-checking numbers,
              comparing different guides, or wondering if you’ve made a mistake
              somewhere along the way. The process can lead to a fair bit of
              head scratching—and sometimes even a little nail biting—especially
              when you know that getting it wrong could delay your publication.
            </p>
            <p>
              The truth is, paperback cover size involves more than just the
              front of the book. It includes the back cover, the spine, and the
              bleed area. Each of these elements must be calculated precisely to
              ensure that your cover prints correctly. Even a small
              miscalculation can result in alignment issues or rejected files.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Understanding the Precise Requirements of a Paperback Cover Size
              Calculator
            </h2>
            <p>
              This is where BookCoverBee steps in and changes the experience
              entirely. Instead of wrestling with formulas or trying to
              interpret technical instructions, you can generate the exact
              dimensions you need in seconds. Our platform acts as a
              comprehensive <strong>Paperback Cover Size Calculator</strong>{" "}
              that simplifies the most technical parts of your publishing
              journey.
            </p>
            <p>
              At the centre of everything is the trim size of your book. This is
              the final size of your printed pages, and it determines the
              overall proportions of your cover. Common paperback sizes include
              5 &times; 8, 5.5 &times; 8.5, 6 &times; 9, and 8.5 &times; 11.
              Each of these formats suits different types of books, from compact
              novels to larger workbooks and guides.
            </p>
            <p>
              If you are looking for a broader overview of sizing logic, you
              might also find our guide on{" "}
              <a
                href="/book-cover-dimensions"
                className="font-bold text-slate-900 underline underline-offset-4"
              >
                book cover dimensions
              </a>{" "}
              helpful.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              How BookCoverBee Acts as Your Reliable Paperback Cover Size
              Calculator
            </h2>
            <p>
              Once you have chosen your trim size, the next step is calculating
              the full cover dimensions. This is where things often become
              confusing. The total width of the cover depends on the front and
              back panels, as well as the spine width, which itself is based on
              your page count. On top of that, you need to account for
              bleed—extra space around the edges to ensure clean trimming during
              printing.
            </p>
            <p>
              Trying to manage all of this manually can quickly become
              overwhelming. Authors often find themselves switching between
              calculators, templates, and documentation, hoping everything lines
              up correctly in the end. It is a process that can feel
              unnecessarily complicated for something that should be
              straightforward.
            </p>
            <p>
              BookCoverBee removes that complexity. You simply select your trim
              size—whether it is 5 &times; 8, 5.5 &times; 8.5, 6 &times; 9, or
              8.5 &times; 11—and enter your page count. Instantly, the tool
              calculates the full results for you. For those specifically
              focused on spine depth, our{" "}
              <a
                href="/spine-width-calculator"
                className="font-bold text-slate-900 underline underline-offset-4"
              >
                spine width calculator
              </a>{" "}
              provides additional precision.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Speed and Efficiency as Key Benefits
            </h2>
            <p>
              Speed is a key benefit of an automated workflow. In traditional
              environments, calculating paperback cover size can take time,
              especially if you are being cautious and double-checking your
              work. With BookCoverBee, the calculations happen in real-time.
              This allows you to move quickly from planning to designing,
              keeping your momentum intact.
            </p>
            <p>
              For authors managing multiple projects, this efficiency becomes
              even more valuable. Instead of repeating the same calculations for
              each book, you can generate accurate dimensions instantly for
              every new title. It streamlines your workflow and helps you stay
              focused on the bigger picture. This is particularly useful when
              using a{" "}
              <a
                href="/kdp-cover-size-calculator"
                className="font-bold text-slate-900 underline underline-offset-4"
              >
                KDP cover size calculator
              </a>{" "}
              for Amazon-specific projects.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              From Measurement to Creative Expression
            </h2>
            <p>
              Once your dimensions are set, the creative process becomes much
              more enjoyable. BookCoverBee integrates measurement and design
              into a single workflow, allowing you to move seamlessly from
              technical setup to visual creation. There is no need to export
              dimensions or re-enter data into another tool.
            </p>
            <p>
              You can begin designing your cover by describing what you want to
              see in our{" "}
              <a
                href="/bookcover"
                className="font-bold text-slate-900 underline underline-offset-4"
              >
                Book Cover Creator
              </a>
              . The AI responds to your prompts, interpreting the mood, setting,
              and key elements of your story. Whether you are creating a
              gripping thriller, a heartfelt romance, or an informative
              non-fiction book, the design process adapts to your needs.
            </p>
            <p>
              This combination of accurate calculations and intelligent design
              saves both time and money. Instead of hiring a designer or
              spending hours learning complex software, you can produce
              professional-quality covers on your own terms.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Confidence and Flexibility for Every Project
            </h2>
            <p>
              Experienced designers also benefit from this approach. By
              automating the technical aspects of paperback cover size,
              BookCoverBee frees up time for creativity. Designers can
              experiment with ideas, refine layouts, and focus on visual impact
              without getting bogged down in measurements.
            </p>
            <p>
              Another important aspect is confidence. When you know your cover
              size is correct, you can design with assurance. There is no
              second-guessing, no last-minute adjustments, and no worrying about
              whether your file will be accepted. The foundation is solid,
              allowing you to concentrate on the details that make your cover
              stand out.
            </p>
            <p>
              As your project evolves, flexibility remains key. If your page
              count changes during editing, you can simply update the number and
              generate a new size instantly. The tool adapts to your needs,
              ensuring that your dimensions are always up to date.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              A Professional Finish Ready for Export
            </h2>
            <p>
              When your design is complete, exporting your cover is
              straightforward. BookCoverBee provides a high-resolution,
              print-ready PDF that matches the calculated dimensions perfectly.
              This file can be uploaded directly to publishing platforms,
              reducing the risk of errors and saving you time.
            </p>
            <p>
              Paperback cover size does not have to be a source of frustration.
              With the right tool, it becomes a simple step in the publishing
              process. By removing the need for manual calculations and reducing
              the risk of error, BookCoverBee turns a once confusing task into
              an easy and efficient experience.
            </p>
            <div className="pt-8 border-t border-slate-200">
              <p className="font-semibold text-slate-900 text-2xl">
                With BookCoverBee, you can move forward with confidence, knowing
                that your measurements are correct and your design is ready to
                shine. No more head scratching—just accurate results, delivered
                instantly.
              </p>
            </div>
          </section>
        </article>

        <section className="max-w-4xl mx-auto space-y-8 pt-12 border-t border-slate-200">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-start gap-3">
                  <span className="text-yellow-500 text-2xl leading-none">?</span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed pl-7">
                  {faq.answer}
                </p>
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
