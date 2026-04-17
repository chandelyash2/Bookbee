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
      document.getElementById("spine-width-calculator-faq-schema")?.remove();
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
        <section className="gap-8 items-stretch">
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
                Book spine width can be one of the most confusing parts of cover
                design. BookCoverBee removes the formulas and guesswork, giving
                you the exact measurement you need in seconds.
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
        </section>
        <article className="max-w-4xl mx-auto space-y-12 text-slate-700 leading-relaxed text-lg">
          <section className="space-y-6">
            <p>
              For many authors, the spine width of a book is one of the most
              confusing parts of the entire publishing process. It sounds
              simple—just the thickness of the book—but in reality, it involves
              a precise calculation based on page count, paper type, and
              printing specifications. Get it wrong, and your cover may be
              rejected or misaligned. Get it right, and everything fits
              perfectly.
            </p>
            <p>
              Traditionally, working out spine width has been a frustrating
              experience. Authors often find themselves digging through
              publishing guidelines, trying to interpret formulas, or relying on
              static templates that don’t quite match their project. Even small
              errors can cause big problems. A spine that is too narrow can
              squeeze your design, while one that is too wide can throw off the
              alignment of the entire cover.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              The BookCoverBee Advantage: Precision in Seconds
            </h2>
            <p>
              This is where BookCoverBee’s Spine Width Calculator changes the
              game. Instead of manually calculating measurements or
              second-guessing your numbers, you can generate the exact spine
              width in seconds. The process is simple, accurate, and designed to
              remove the stress from an otherwise technical task.
            </p>
            <p>
              At its core, spine width is determined by the number of pages in
              your book and the type of paper used in printing. Different paper
              stocks have different thicknesses, which directly affect the final
              measurement. For example, a 200-page book printed on one type of
              paper may have a different spine width than a 200-page book
              printed on another. This variability is what makes manual
              calculation so tricky.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Removing Complexity from Amazon KDP Formatting
            </h2>
            <p>
              In the past, authors had to apply formulas provided by platforms
              like Amazon KDP, multiplying page count by a specific factor and
              then adding allowances for bleed and cover thickness. While these
              formulas are accurate, they are not always easy to use. It is all
              too common to make a small mistake in the calculation or to
              misinterpret the requirements.
            </p>
            <p>
              BookCoverBee removes this complexity entirely. You simply enter
              your page count and select your book size. The calculator does the
              rest. It instantly provides the correct spine width, along with
              the full cover dimensions, ensuring that your design will meet
              publishing standards.
            </p>
            <p>
              This level of automation saves time and reduces the risk of error.
              Instead of spending valuable hours double-checking numbers, you
              can move forward with confidence. For authors juggling writing,
              editing, and marketing, this efficiency makes a real difference.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              AI-Powered Speed and Consistent Quality
            </h2>
            <p>
              Beyond accuracy, the speed of AI-powered calculation is a major
              advantage. What once required careful manual work can now be
              completed in a matter of seconds. This allows you to focus on the
              creative aspects of your project rather than getting stuck in
              technical details. The tool acts as a reliable assistant, handling
              the precise calculations so you do not have to.
            </p>
            <p>
              The benefits extend to both new and experienced authors. For
              beginners, the calculator provides clarity and reassurance. It
              eliminates the uncertainty that often comes with first-time
              publishing. For seasoned writers and designers, it offers a faster
              workflow and a dependable way to ensure consistency across
              multiple projects.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Why Spine Accuracy Impacts Your Book's Professionalism
            </h2>
            <p>
              Spine width also plays a crucial role in the overall appearance of
              your book. A well-proportioned spine allows for clear, readable
              text and balanced design elements. This is especially important
              for books that will be displayed on shelves, where the spine is
              often the first thing a reader sees. If the width is incorrect,
              the title and author name may not align properly, reducing the
              professional look of the final product.
            </p>
            <p>
              BookCoverBee integrates spine width calculation directly into the
              design process. Once your measurements are generated, you can move
              seamlessly into creating your cover. There is no need to switch
              between tools or re-enter data. Everything is connected, making
              the workflow smooth and efficient.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Combining Technical Precision with AI Creativity
            </h2>
            <p>
              You can then use the AI design feature to bring your cover to
              life. By describing the elements of your story, the mood you want
              to convey, and the setting in which your narrative takes place,
              you guide the creation of your cover. The AI interprets your input
              and produces designs that match your vision, all while respecting
              the exact dimensions calculated earlier.
            </p>
            <p>
              This combination of precision and creativity is what sets
              BookCoverBee apart. It is not just a calculator—it is a complete
              solution for authors who want to produce professional-quality
              covers without unnecessary complexity.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Flexibility for the Modern Publishing Workflow
            </h2>
            <p>
              Another advantage is the ability to make quick adjustments. If
              your page count changes during editing, you can simply update the
              number and generate a new spine width instantly. There is no need
              to redo calculations or worry about outdated measurements. The
              tool adapts to your project as it evolves.
            </p>
            <p>
              This flexibility is particularly useful for authors working on
              multiple books or series. Maintaining consistent sizing and
              alignment across different titles becomes much easier when the
              technical aspects are handled automatically. You can focus on
              creating a cohesive visual identity while the calculator ensures
              everything fits correctly.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              Export Print-Ready PDF Files Instantly
            </h2>
            <p>
              When it comes to exporting your final design, accuracy remains
              essential. BookCoverBee allows you to download a print-ready PDF
              that incorporates the exact spine width and overall dimensions.
              This file is ready for upload to publishing platforms, reducing
              the risk of rejection and saving you from last-minute adjustments.
            </p>
            <p>
              There is a small cost involved when exporting your finished cover,
              but it is minimal compared to the time and effort saved. For many
              authors, the convenience and reliability of having everything
              calculated and formatted correctly are well worth the price.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              A Simpler Path from Idea to Published Book
            </h2>
            <p>
              The traditional approach to spine width calculation often feels
              like a barrier. It requires attention to detail, familiarity with
              formulas, and a willingness to navigate technical documentation.
              For creative individuals, this can be a frustrating diversion from
              the work they enjoy most.
            </p>
            <p>
              By contrast, an AI-driven calculator simplifies the process to its
              essentials. Enter your page count, select your size, and receive
              accurate results instantly. The hassle is removed, and the path
              from idea to finished book becomes much clearer.
            </p>
            <p>
              In today’s publishing environment, tools that save time and reduce
              complexity are invaluable. Authors are expected to manage many
              aspects of their work, from writing and editing to marketing and
              distribution. Anything that streamlines the process can make a
              significant difference.
            </p>
            <p>
              BookCoverBee’s Spine Width Calculator does exactly that. It takes
              a task that was once time-consuming and error-prone and turns it
              into a quick, reliable step in your workflow. The result is
              greater confidence, better accuracy, and more time to focus on
              what truly matters—your writing.
            </p>
            <p>
              Ultimately, getting the spine width right is about more than just
              meeting technical requirements. It is about presenting your book
              in the best possible way. A properly sized spine supports a clean,
              professional design and ensures that your work stands out for the
              right reasons.
            </p>
            <div className="pt-8 border-t border-slate-200">
              <p className="font-semibold text-slate-900 text-2xl">
                With BookCoverBee, you no longer need to worry about
                calculations or second-guess your measurements. The tool
                provides the precision you need, the speed you want, and the
                simplicity that modern authors deserve.
              </p>
            </div>
          </section>
        </article>

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
