import React, { useState, useEffect, useCallback } from "react";
import { Logo, COLORS } from "./constants";
import { BookConfig, TrimSize, Genre, GENRE_FONTS } from "./types";
import CoverCanvas from "./components/CoverCanvas";
import { generateBookArt } from "./services/geminiService";
import CheckoutForm from "./components/CheckoutForm";
import Home from "./components/Home";
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import About from "./components/About";
import BookCoverDimensionsPage from "./components/BookCoverDimensionsPage";
import SpineWidthCalculatorPage from "./components/SpineWidthCalculatorPage";
import PaperbackCoverSizePage from "./components/PaperbackCoverSizePage";
import BookCoverMakerFreePage from "./components/BookCoverMakerFreePage";
import ContactPage from "./components/ContactPage";

type View =
  | "home"
  | "editor"
  | "how-it-works"
  | "pricing"
  | "features"
  | "about"
  | "home"
  | "book-cover-dimensions"
  | "spine-width-calculator"
  | "paperback-cover-size"
  | "book-cover-maker-free"
  | "contact";

const getViewFromPath = (): View => {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  switch (path) {
    case "/how-it-works":
      return "how-it-works";
    case "/pricing":
      return "pricing";
    case "/features":
      return "features";
    case "/about":
      return "about";
    case "/bookcoverbee":
      return "home";
    case "/kdp-cover-size-calculator":
      return "home";
    case "/book-cover-dimensions":
      return "book-cover-dimensions";
    case "/spine-width-calculator":
      return "spine-width-calculator";
    case "/paperback-cover-size":
      return "paperback-cover-size";
    case "/book-cover-maker-free":
      return "book-cover-maker-free";
    case "/contact":
      return "contact";
    case "/editor":
      return "editor";
    default:
      return "home";
  }
};

const getPathFromView = (view: View) => {
  switch (view) {
    case "how-it-works":
      return "/how-it-works";
    case "pricing":
      return "/pricing";
    case "features":
      return "/features";
    case "about":
      return "/about";
    case "home":
      return "/";
    case "book-cover-dimensions":
      return "/book-cover-dimensions";
    case "spine-width-calculator":
      return "/spine-width-calculator";
    case "paperback-cover-size":
      return "/paperback-cover-size";
    case "book-cover-maker-free":
      return "/book-cover-maker-free";
    case "contact":
      return "/contact";
    case "editor":
      return "/editor";
    default:
      return "/";
  }
};

const INITIAL_CONFIG: BookConfig = {
  trimSize: TrimSize.SIZE_6_9,
  pageCount: 150,
  title: "",
  subtitle: "",
  author: "",
  blurb: "",
  genre: Genre.THRILLER,
  fontFamily: "Montserrat",
  spineFontFamily: "Montserrat",
  fontStyle: "Capitals",
  mainColor: "#FFFFFF",
  accentColor: "#D4AF37",
  aiPrompt:
    "A shadowy figure standing in the rain with glowing neon signs behind them.",
};

const GENRE_PROMPTS: Record<Genre, string> = {
  [Genre.ROMANCE]:
    "A dreamy moonlit embrace in a flower-filled garden, soft light, elegant romantic mood.",
  [Genre.THRILLER]:
    "A shadowy figure in a rain-soaked city alley, dramatic lighting, tense cinematic atmosphere.",
  [Genre.SCIFI]:
    "A futuristic skyline with glowing neon lights, distant planets, sleek high-tech atmosphere.",
  [Genre.FANTASY]:
    "An ancient castle under a starlit sky, magical mist, epic fantasy atmosphere.",
  [Genre.HORROR]:
    "A haunted house in dense fog, dim moonlight, eerie shadows, unsettling horror atmosphere.",
  [Genre.HISTORY]:
    "A richly detailed historical scene with period clothing, warm tones, and classic composition.",
  [Genre.NON_FICTION]:
    "Clean bold typography with a modern professional layout, sharp contrast, confident tone.",
  [Genre.MYSTERY]:
    "A dimly lit street with a lone silhouette, curling mist, suspenseful mystery mood.",
  [Genre.LITERARY]:
    "A minimalist atmospheric scene with subtle symbolism, refined composition, and emotional depth.",
};

const GENRE_HELPERS: Record<Genre, string> = {
  [Genre.ROMANCE]: "Soft, elegant, emotional visuals with warm or dreamy tones.",
  [Genre.THRILLER]: "Dark, tense, cinematic imagery with strong contrast and urgency.",
  [Genre.SCIFI]: "Futuristic worlds, technology, space elements, and sleek dramatic lighting.",
  [Genre.FANTASY]: "Magic, epic settings, mythical atmosphere, and rich ornamental styling.",
  [Genre.HORROR]: "Eerie, unsettling, shadowy imagery with ominous atmosphere and dread.",
  [Genre.HISTORY]: "Period detail, classic composition, and a grounded historical feel.",
  [Genre.NON_FICTION]: "Clear, authoritative visuals with a structured, professional look.",
  [Genre.MYSTERY]: "Moody scenes, hidden clues, fog, silhouettes, and suspenseful framing.",
  [Genre.LITERARY]: "Subtle, symbolic, restrained visuals with a sophisticated tone.",
};

// ─── Toast / Confirm helpers ─────────────────────────────────
type ToastType = "success" | "error" | "info";
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
interface ConfirmState {
  message: string;
  onConfirm: () => void;
}

const App: React.FC = () => {
  const [view, setView] = useState<View>(() => getViewFromPath());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [config, setConfig] = useState<BookConfig>(INITIAL_CONFIG);
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  // Restore free user status from localStorage on load
  const [isFreeUser, setIsFreeUser] = useState(
    () => localStorage.getItem("bcb_free_registered") === "true",
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [exportedCovers, setExportedCovers] = useState(() =>
    parseInt(localStorage.getItem("bcb_exports_used") || "0"),
  );
  const [subscriptionDate, setSubscriptionDate] = useState<Date | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [subscriberName, setSubscriberName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPlan, setUserPlan] = useState<"starter" | "author" | null>(null);
  const [freeRegisterError, setFreeRegisterError] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  // true = cover has unsaved changes since last export (starts true so first export always works)
  const [coverDirty, setCoverDirty] = useState(true);
  // Paid user login
  const [subscriberPassword, setSubscriberPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState("");
  // Plan selection
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "author" | null>(
    null,
  );

  const PLANS = {
    starter: {
      name: "Starter Plan",
      price: 900,
      covers: 1,
      description: "Perfect for occasional publishers",
    },
    author: {
      name: "Author Plan",
      price: 1900,
      covers: 5,
      description: "Ideal for active writers",
    },
  };

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      3500,
    );
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    setConfirmState({ message, onConfirm });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setConfig((prev) => {
      if (name === "genre") {
        const nextGenre = value as Genre;
        const shouldRefreshPrompt =
          !prev.aiPrompt.trim() ||
          Object.values(GENRE_PROMPTS).includes(prev.aiPrompt);

        return {
          ...prev,
          genre: nextGenre,
          fontFamily: GENRE_FONTS[nextGenre][0],
          spineFontFamily: GENRE_FONTS[nextGenre][0],
          aiPrompt: shouldRefreshPrompt ? GENRE_PROMPTS[nextGenre] : prev.aiPrompt,
        };
      }

      return {
        ...prev,
        [name]: name === "pageCount" ? parseInt(value) || 0 : value,
      };
    });
    setCoverDirty(true); // any field change marks cover as needing a fresh export
  };

  useEffect(() => {
    const handlePopState = () => {
      setView(getViewFromPath());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const nextPath = getPathFromView(view);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
  }, [view]);

const handleAiGeneration = async () => {
  if (isGenerating) return; // 🚨 BLOCK duplicate

  setIsGenerating(true);
  try {
    const imageUrl = await generateBookArt(config.aiPrompt);

    if (imageUrl) {
      setConfig((prev) => ({
        ...prev,
        generatedImageUrl: imageUrl,
      }));
      setCoverDirty(true);
    }
  } finally {
    setIsGenerating(false);
  }
};

  const handleCancelSubscription = () => {
    showConfirm(
      "Are you sure you want to cancel your subscription?",
      async () => {
        try {
          await fetch(`/api/payments/${encodeURIComponent(loggedInEmail)}`, {
            method: "DELETE",
          });
          await fetch("/api/cancel-subscription", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: loggedInEmail }),
          });
        } catch (err) {
          console.warn("Could not update records:", err);
        }
        setIsPaid(false);
        setShowDashboard(false);
        setSubscriptionDate(null);
        setSubscriberName("");
        setSubscriberPassword("");
        setLoggedInEmail("");
        setUserPlan(null);
        setExportedCovers(0);
        localStorage.removeItem("bcb_user_plan");
        showToast("Your subscription has been cancelled.", "info");
      },
    );
  };

  const handleLogin = async () => {
    const email = subscriberName.toLowerCase().trim();
    if (!email.includes("@") || !subscriberPassword) {
      setLoginError("Please enter your email and password.");
      return;
    }
    if (isLoggingIn) return;
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: subscriberPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.message || "Login failed.");
        return;
      }
      setLoggedInEmail(data.email);
      setExportedCovers(data.quotaUsed);
      setSubscriptionDate(new Date(data.subscriptionDate));
      const storedPlan = localStorage.getItem("bcb_user_plan") as
        | "starter"
        | "author"
        | null;
      setUserPlan(storedPlan || "author");
      setIsPaid(true);
      setShowPaymentModal(false);
      const quotaLimit = storedPlan ? PLANS[storedPlan].covers : 1;
      showToast(
        `Welcome back! ${quotaLimit - data.quotaUsed} covers remaining.`,
        "success",
      );
    } catch {
      setLoginError("Could not connect to server. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegisterFree = async () => {
    if (!subscriberName.includes("@")) {
      setFreeRegisterError("Please enter a valid email address.");
      return;
    }

    // ✅ Local duplicate check — blocks re-registration even after refresh or server downtime
    const registeredEmail = localStorage.getItem("bcb_free_email");
    if (registeredEmail) {
      if (registeredEmail === subscriberName.toLowerCase().trim()) {
        setFreeRegisterError("This email is already registered.");
      } else {
        setFreeRegisterError("A free account already exists on this device.");
      }
      return;
    }

    setFreeRegisterError("");
    try {
      const res = await fetch("/api/sync-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: subscriberName.replace(/[^a-zA-Z0-9]/g, "_"),
          email: subscriberName.toLowerCase().trim(),
        }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setFreeRegisterError(
          data.message || "This email is already registered.",
        );
        return;
      }
      if (!res.ok) {
        setFreeRegisterError("Something went wrong. Please try again.");
        return;
      }
    } catch (err) {
      console.warn("Could not sync free user to DB:", err);
      // Server offline — still enforce local-only registration
    }

    // ✅ Persist to localStorage so the same browser/device can never re-register
    localStorage.setItem("bcb_free_registered", "true");
    localStorage.setItem("bcb_free_email", subscriberName.toLowerCase().trim());
    localStorage.setItem("bcb_exports_used", "0");
    setIsFreeUser(true);
    setExportedCovers(0);
    setShowPaymentModal(false);
  };

  const openPaymentModal = () => {
    setSelectedPlan(null);
    setSubscriberName("");
    setSubscriberPassword("");
    setUserEmail("");
    setFreeRegisterError("");
    setLoginError("");
    setShowPaymentModal(true);
  };

  // "Finish Cover" in step 4 — no quota deducted, just signals cover is ready
  const handleFinishCover = () => {
    if (!isPaid && !isFreeUser) {
      openPaymentModal();
      return;
    }
    showToast(
      "Your cover is ready! Click Export PDF in the top bar to download.",
      "success",
    );
  };

  // "Export PDF" header button — this is the only action that deducts quota
  const handleExportPDF = () => {
    if (isExportingPDF) return;
    if (!isPaid && !isFreeUser) {
      openPaymentModal();
      return;
    }
    if (!isPaid && isFreeUser && exportedCovers >= 1) {
      showToast("Free users get 1 cover. Upgrade to unlock more!", "error");
      openPaymentModal();
      return;
    }
    const quotaLimit = userPlan ? PLANS[userPlan].covers : 1;
    if (isPaid && exportedCovers >= quotaLimit) {
      showToast(
        `You have reached your monthly limit of ${quotaLimit} covers.`,
        "error",
      );
      return;
    }
    // ✅ Paid users: no quota deducted if nothing changed since last export
    if (isPaid && !coverDirty) {
      showToast(
        "No changes detected. Edit your cover to export a new version.",
        "info",
      );
      return;
    }
    const next = exportedCovers + 1;
    setExportedCovers(next);
    localStorage.setItem("bcb_exports_used", String(next));
    setCoverDirty(false);
    // Sync quota to DB for logged-in paid users
    if (loggedInEmail) {
      fetch("/api/update-quota", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loggedInEmail, quotaUsed: next }),
      }).catch((err) => console.warn("Could not sync quota:", err));
    }
    const remaining = isPaid ? quotaLimit - next : 0;
    showToast(`Cover exported! ${remaining} quota remaining.`, "success");
    handleDirectExportPDF();
  };

  // ─── Direct PDF export — no account / payment required ───────
  const [isExportingPDF, setIsExportingPDF] = useState(false);

  const handleDirectExportPDF = async () => {
    const coverEl = document.getElementById("cover-wrap");
    if (!coverEl) {
      showToast("Cover preview not found. Please wait a moment.", "error");
      return;
    }
    if (isExportingPDF) return;
    setIsExportingPDF(true);
    try {
      // Capture exact rendered dimensions (CSS transforms don't affect offsetWidth/Height)
      const coverWidth = coverEl.offsetWidth;
      const coverHeight = coverEl.offsetHeight;

      // Clone the cover so we strip elements without touching the live preview
      const clone = coverEl.cloneNode(true) as HTMLElement;
      // Strip watermark (rotate-45 overlay)
      clone.querySelector(".rotate-45")?.remove();
      // Strip preview guide lines (dashed borders / spine markers)
      clone.querySelectorAll(".border-dashed").forEach((el) => el.remove());

      // Get all local styles generated by Vite and inject them so the headless browser renders correctly
      const localStyles = Array.from(document.querySelectorAll("style"))
        .map((el) => el.outerHTML)
        .join("\\n");
      const localLinks = Array.from(
        document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'),
      )
        .filter((el) => !el.href.includes("fonts.googleapis.com"))
        .map(
          (el) =>
            `<link rel="stylesheet" href="${new URL(el.getAttribute("href") || "", window.location.href).href}">`,
        )
        .join("\\n");

 const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  ${localStyles}
  ${localLinks}
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@400;700;900&family=Great+Vibes&family=Cinzel:wght@700&family=Orbitron:wght@400;700&family=Crimson+Text:ital,wght@0,400;1,700&family=Bebas+Neue&family=Libre+Baskerville:wght@700&family=Special+Elite&display=block" rel="stylesheet">
  <style>
    * { margin: 0 !important; box-sizing: border-box !important; }
    html, body {
      width: ${coverWidth}px;
      height: ${coverHeight}px;
      max-height: ${coverHeight}px;
      overflow: hidden !important;
      display: block;
      background: #000;  /* ✅ fallback so no white shows */
    }
    /* ✅ make sure the cover element fills exactly */
    body > * {
      width: ${coverWidth}px !important;
      height: ${coverHeight}px !important;
      max-height: ${coverHeight}px !important;
      overflow: hidden !important;
    }
  </style>
</head>
<body>${clone.outerHTML}</body>
</html>`;

      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html, coverWidth, coverHeight }),
      });

      if (!res.ok) {
        let errMsg = "PDF generation failed.";
        try {
          const errBody = await res.json();
          errMsg = errBody.message || errMsg;
        } catch {
          errMsg = await res.text().catch(() => errMsg);
        }
        console.error("[generate-pdf] Server error:", errMsg);
        showToast(errMsg, "error");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "book-cover.pdf";
      a.click();
      URL.revokeObjectURL(url);
      showToast("PDF downloaded! ✓", "success");
    } catch (err) {
      console.error("[generate-pdf] Fetch error:", err);
      showToast("Export failed — is the server running on port 4000?", "error");
    } finally {
      setIsExportingPDF(false);
    }
  };

  if (view === "home") {
    return (
      <Home
        onStart={() => setView("editor")}
        onHowItWorks={() => setView("how-it-works")}
        onPricing={() => setView("pricing")}
        onFeatures={() => setView("features")}
        onAbout={() => setView("about")}
        onBookCoverBee={() => setView("home")}
        onBookCoverDimensions={() => setView("book-cover-dimensions")}
        onSpineWidthCalculator={() => setView("spine-width-calculator")}
        onPaperbackCoverSize={() => setView("paperback-cover-size")}
      />
    );
  }

  if (view === "how-it-works") {
    return (
      <HowItWorks
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onPricing={() => setView("pricing")}
        onFeatures={() => setView("features")}
        onAbout={() => setView("about")}
        
        onBookCoverDimensions={() => setView("book-cover-dimensions")}
        onSpineWidthCalculator={() => setView("spine-width-calculator")}
        onPaperbackCoverSize={() => setView("paperback-cover-size")}
      />
    );
  }

  if (view === "pricing") {
    return (
      <Pricing
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onHowItWorks={() => setView("how-it-works")}
        onFeatures={() => setView("features")}
        onAbout={() => setView("about")}
        
        onBookCoverDimensions={() => setView("book-cover-dimensions")}
        onSpineWidthCalculator={() => setView("spine-width-calculator")}
        onPaperbackCoverSize={() => setView("paperback-cover-size")}
      />
    );
  }

  if (view === "features") {
    return (
      <Features
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onHowItWorks={() => setView("how-it-works")}
        onPricing={() => setView("pricing")}
        onAbout={() => setView("about")}
        
        onBookCoverDimensions={() => setView("book-cover-dimensions")}
        onSpineWidthCalculator={() => setView("spine-width-calculator")}
        onPaperbackCoverSize={() => setView("paperback-cover-size")}
      />
    );
  }

  if (view === "about") {
    return (
      <About
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onHowItWorks={() => setView("how-it-works")}
        onPricing={() => setView("pricing")}
        onFeatures={() => setView("features")}
        
        onBookCoverDimensions={() => setView("book-cover-dimensions")}
        onSpineWidthCalculator={() => setView("spine-width-calculator")}
        onPaperbackCoverSize={() => setView("paperback-cover-size")}
      />
    );
  }


  if (view === "book-cover-dimensions") {
    return (
      <BookCoverDimensionsPage
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onHowItWorks={() => setView("how-it-works")}
        onPricing={() => setView("pricing")}
        onFeatures={() => setView("features")}
        onAbout={() => setView("about")}
        onBookCoverBee={()=>setView("home")}
        onSpineWidthCalculator={() => setView("spine-width-calculator")}
      />
    );
  }

  if (view === "spine-width-calculator") {
    return (
      <SpineWidthCalculatorPage
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onHowItWorks={() => setView("how-it-works")}
        onPricing={() => setView("pricing")}
        onFeatures={() => setView("features")}
        onAbout={() => setView("about")}
        
        onBookCoverDimensions={() => setView("book-cover-dimensions")}
      />
    );
  }

  if (view === "paperback-cover-size") {
    return (
      <PaperbackCoverSizePage
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onHowItWorks={() => setView("how-it-works")}
        onPricing={() => setView("pricing")}
        onFeatures={() => setView("features")}
        onAbout={() => setView("about")}
      />
    );
  }

  if (view === "book-cover-maker-free") {
    return (
      <BookCoverMakerFreePage
        onStart={() => setView("editor")}
        onHome={() => setView("home")}
        onHowItWorks={() => setView("how-it-works")}
        onPricing={() => setView("pricing")}
        onFeatures={() => setView("features")}
        onAbout={() => setView("about")}
      />
    );
  }

  if (view === "contact") {
    return (
      <ContactPage
        onHome={() => setView("home")}
        onStart={() => setView("editor")}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            className="md:hidden p-1 -ml-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-6 h-6"
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
          <div
            className="cursor-pointer hover:opacity-80 transition hidden sm:block"
            onClick={() => setView("home")}
            title="Return to Home"
          >
            <Logo />
          </div>
          <div
            className="cursor-pointer hover:opacity-80 transition sm:hidden"
            onClick={() => setView("home")}
            title="Return to Home"
          >
            <span className="text-xl font-black tracking-tighter text-slate-800">
              Cover<span className="text-yellow-500">Bee</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView("about")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden sm:block"
          >
            About
          </button>
          <button
            onClick={() => setView("features")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden sm:block"
          >
            Features
          </button>
          <button
            onClick={() => setView("how-it-works")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden sm:block"
          >
            How It Works
          </button>

          <button
            onClick={() => setView("book-cover-dimensions")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden xl:block"
          >
            Dimensions
          </button>
          <button
            onClick={() => setView("spine-width-calculator")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden 2xl:block"
          >
            Spine Width
          </button>
          <button
            onClick={() => setView("paperback-cover-size")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden xl:block"
          >
            Paperback Size
          </button>
          <button
            onClick={() => setView("pricing")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden sm:block"
          >
            Pricing
          </button>
          <button
            onClick={() => setView("contact")}
            className="text-slate-600 hover:text-slate-900 font-semibold transition text-sm hidden lg:block"
          >
            Contact
          </button>
          <div className="hidden md:flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 w-8 rounded-full ${step >= s ? "bg-yellow-500" : "bg-slate-200"}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportPDF}
              disabled={isExportingPDF}
              className="bg-slate-900 text-white px-6 py-2 rounded-full font-bold hover:bg-slate-800 transition shadow-md text-xs lg:text-base disabled:opacity-50"
            >
              {isPaid
                ? `Export PDF (${userPlan ? Math.max(0, PLANS[userPlan].covers - exportedCovers) : 0} left)`
                : isFreeUser
                  ? `Export PDF (${Math.max(0, 1 - exportedCovers)} left)`
                  : "Remove Watermark"}
            </button>
          </div>
          {isPaid && (
            <button
              onClick={() => setShowDashboard(true)}
              className="w-10 h-10 bg-gradient-to-tr from-yellow-400 to-yellow-600 text-white rounded-full flex items-center justify-center font-bold font-serif text-lg shadow-lg border-2 border-white hover:scale-105 transition"
              title="Dashboard"
            >
              {subscriberName ? subscriberName.charAt(0).toUpperCase() : "U"}
            </button>
          )}
        </div>
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
              setView("home");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("about");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            About
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("features");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Features
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("how-it-works");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("bookcoverbee");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            KDP Creator
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("book-cover-dimensions");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Dimensions
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("spine-width-calculator");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Spine Width
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("paperback-cover-size");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Paperback Size
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("pricing");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setView("contact");
            }}
            className="text-2xl font-bold text-slate-800"
          >
            Contact
          </button>
          {isPaid && (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowDashboard(true);
              }}
              className="text-2xl font-bold text-yellow-600"
            >
              My Dashboard
            </button>
          )}
        </div>
      )}

      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar - Controls */}
        <aside className="w-full md:w-[400px] bg-white border-r overflow-y-auto p-6 space-y-8 h-[calc(100vh-64px)]">
          {/* STEP 1: DIMENSIONS */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-left duration-300">
              <h3 className="text-xl font-bold border-b pb-2">
                1. Book Dimensions
              </h3>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Trim Size (KDP Standard)
                </label>
                <select
                  name="trimSize"
                  value={config.trimSize}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none"
                >
                  <option value={TrimSize.SIZE_5_8}>5" x 8"</option>
                  <option value={TrimSize.SIZE_55_85}>5.5" x 8.5"</option>
                  <option value={TrimSize.SIZE_6_9}>
                    6" x 9" (Most Popular)
                  </option>
                  <option value={TrimSize.SIZE_85_11}>8.5" x 11"</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Page Count
                </label>
                <input
                  type="number"
                  name="pageCount"
                  value={config.pageCount}
                  onChange={handleInputChange}
                  min="24"
                  max="800"
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Spine width is auto-calculated based on page count.
                </p>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition"
              >
                Next: Book Details
              </button>
            </div>
          )}

          {/* STEP 2: DETAILS */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-left duration-300">
              <h3 className="text-xl font-bold border-b pb-2">
                2. Cover Content
              </h3>
              <div className="space-y-4">
                <input
                  placeholder="Book Title"
                  name="title"
                  value={config.title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                />
                <input
                  placeholder="Subtitle (Optional)"
                  name="subtitle"
                  value={config.subtitle}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                />
                <input
                  placeholder="Author Name"
                  name="author"
                  value={config.author}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                />
                <textarea
                  placeholder="Back Cover Blurb"
                  name="blurb"
                  rows={4}
                  value={config.blurb}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-100 p-4 rounded-xl font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={
                    !config.title.trim() ||
                    !config.author.trim() ||
                    !config.blurb.trim()
                  }
                  className={`flex-[2] p-4 rounded-xl font-bold transition ${!config.title.trim() || !config.author.trim() || !config.blurb.trim() ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-400"}`}
                >
                  Next: AI Art
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ART */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-left duration-300">
              <h3 className="text-xl font-bold border-b pb-2">
                3. Cover Art (AI)
              </h3>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Describe your vision
                </label>
                <textarea
                  placeholder="e.g., A shadowy man with the moon behind him, dark cinematic atmosphere"
                  name="aiPrompt"
                  rows={4}
                  value={config.aiPrompt}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
                />
              </div>
              <button
                onClick={handleAiGeneration}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-bold shadow-lg transition flex items-center justify-center gap-2 ${
                  isGenerating
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-slate-800"
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate AI Art"
                )}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-slate-100 p-4 rounded-xl font-bold"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-[2] bg-yellow-500 p-4 rounded-xl font-bold"
                  disabled={isGenerating}
                >
                  Next: Typography
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: TYPOGRAPHY */}
          {step === 4 && (
            <div className="space-y-6 animate-in slide-in-from-left duration-300">
              <h3 className="text-xl font-bold border-b pb-2">4. Typography</h3>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Book Genre
                </label>
                <select
                  name="genre"
                  value={config.genre}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-50 border rounded-xl"
                >
                  {Object.values(Genre).map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  {GENRE_HELPERS[config.genre]}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setConfig((prev) => ({
                      ...prev,
                      aiPrompt: GENRE_PROMPTS[config.genre],
                    }));
                    setCoverDirty(true);
                  }}
                  className="mt-3 text-sm font-semibold text-yellow-700 hover:text-yellow-800"
                >
                  Use suggested {config.genre.toLowerCase()} prompt
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Title Font (Genre Optimized)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GENRE_FONTS[config.genre].map((font) => (
                    <button
                      key={font}
                      onClick={() => {
                        setConfig((prev) => ({ ...prev, fontFamily: font }));
                        setCoverDirty(true);
                      }}
                      className={`p-3 border rounded-xl text-center text-sm transition ${
                        config.fontFamily === font
                          ? "bg-black text-white"
                          : "bg-slate-50 hover:bg-slate-100"
                      }`}
                      style={{ fontFamily: `"${font}"` }}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Spine Font
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {["Montserrat", "Crimson Text", "Cinzel"].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setConfig((prev) => ({ ...prev, spineFontFamily: f }));
                        setCoverDirty(true);
                      }}
                      className={`px-4 py-2 rounded-full whitespace-nowrap border ${config.spineFontFamily === f ? "bg-slate-900 text-white" : "bg-white"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Text Color
                </label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setConfig((prev) => ({ ...prev, mainColor: c }));
                        setCoverDirty(true);
                      }}
                      className={`w-10 h-10 rounded-full border-2 ${config.mainColor === c ? "border-yellow-500 ring-2 ring-yellow-200" : "border-slate-200"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Font Style
                </label>
                <div className="flex gap-2">
                  {(["Serif", "Sans-Serif", "Capitals"] as const).map(
                    (style) => (
                      <button
                        key={style}
                        onClick={() => {
                          setConfig((prev) => ({ ...prev, fontStyle: style }));
                          setCoverDirty(true);
                        }}
                        className={`flex-1 p-3 border rounded-xl text-sm ${config.fontStyle === style ? "bg-black text-white" : "bg-slate-50"}`}
                      >
                        {style}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-slate-100 p-4 rounded-xl font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleFinishCover}
                  className="flex-[2] bg-yellow-500 p-4 rounded-xl font-bold"
                >
                  Finish Cover
                </button>
              </div>
            </div>
          )}
        </aside>

        {/* Right Content - Live Preview */}
        <section className="flex-1 bg-slate-200 p-4 md:p-12 flex flex-col items-center justify-center overflow-auto relative">
          <div className="absolute top-8 left-8 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest border border-white/20 shadow-sm z-10">
            Live KDP Compliance Preview
          </div>

          <div className="scale-[0.5] sm:scale-[0.7] md:scale-100 transition-transform origin-center">
            <CoverCanvas config={config} isPaid={isPaid} />
          </div>

          {/* Controls Footer */}
          <div className="mt-12 flex gap-4 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              300 DPI Ready
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              CMYK Profile
            </div>
            <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Bleed Calculated
            </div>
          </div>

          {/* Hidden direct-export button */}
          <button
            id="btn-direct-pdf"
            onClick={handleDirectExportPDF}
            disabled={isExportingPDF}
            title="Export PDF (Direct)"
            className="absolute bottom-2 left-2 p-1 text-slate-300 hover:text-slate-400 transition bg-transparent hover:bg-slate-200/50 rounded z-10 disabled:opacity-0"
          >
            {isExportingPDF ? (
              <svg
                className="animate-spin w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 3v11m0 0l-3.5-3.5M12 14l3.5-3.5"
                />
              </svg>
            )}
          </button>
        </section>
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-3 right-3 z-10 text-slate-400 hover:text-slate-600"
            >
              <svg
                className="w-5 h-5"
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

            {/* STEP 1: Plan Selection */}
            {!selectedPlan ? (
              <div className="p-6">
                <h2 className="text-2xl font-black text-slate-900 mb-1">
                  Choose Your Plan
                </h2>
                <p className="text-slate-600 text-sm mb-6">
                  Select the plan that works best for you
                </p>

                <div className="space-y-4 mb-6">
                  {/* Starter Plan */}
                  <button
                    onClick={() => setSelectedPlan("starter")}
                    className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-yellow-400 hover:bg-yellow-50 transition text-left"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900">
                        {PLANS.starter.name}
                      </h3>
                      <span className="text-2xl font-black text-slate-900">
                        $9<span className="text-sm text-slate-500">/mo</span>
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {PLANS.starter.description}
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41" />
                        </svg>
                        {PLANS.starter.covers} export per month
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41" />
                        </svg>
                        Unlimited cover generation
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41" />
                        </svg>
                        300 DPI print-ready PDF
                      </li>
                    </ul>
                  </button>

                  {/* Author Plan */}
                  <button
                    onClick={() => setSelectedPlan("author")}
                    className="w-full p-4 rounded-2xl border-2 border-yellow-400 bg-yellow-50 hover:bg-yellow-100 transition text-left relative"
                  >
                    <div className="absolute top-0 right-3 text-xs font-black text-yellow-600 bg-white px-2 py-1 rounded-b-lg">
                      POPULAR
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900">
                        {PLANS.author.name}
                      </h3>
                      <span className="text-2xl font-black text-slate-900">
                        $19<span className="text-sm text-slate-500">/mo</span>
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">
                      {PLANS.author.description}
                    </p>
                    <ul className="space-y-1 text-xs text-slate-600">
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41" />
                        </svg>
                        {PLANS.author.covers} exports per month
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41" />
                        </svg>
                        Unlimited cover creation
                      </li>
                      <li className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41" />
                        </svg>
                        Priority support
                      </li>{" "}
                      <li className="flex items-center gap-2">
                        {" "}
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        300 DPI print-ready PDF
                      </li>
                    </ul>
                  </button>
                </div>

                <p className="text-center text-xs text-slate-500">
                  Or continue as a free user with 1 export
                </p>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    handleRegisterFree();
                  }}
                  className="w-full mt-3 border-2 border-slate-300 text-slate-600 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition"
                >
                  Continue Free
                </button>
              </div>
            ) : !userEmail ? (
              <div className="p-4">
                {/* Header */}
                <h2 className="text-2xl font-black text-slate-900 mb-0.5">
                  Upgrade to {PLANS[selectedPlan].name}
                </h2>
                <p className="text-slate-600 text-sm mb-3">
                  Get {PLANS[selectedPlan].covers}{" "}
                  {PLANS[selectedPlan].covers === 1 ? "cover" : "covers"} per
                  month
                </p>

                {/* Price box */}
                <div className="flex items-center justify-between bg-slate-100 rounded-xl px-3 py-2 mb-3">
                  <span className="font-bold text-slate-800 text-base">
                    {PLANS[selectedPlan].name}
                  </span>
                  <span className="font-black text-slate-900 text-base">
                    ${(PLANS[selectedPlan].price / 100).toFixed(2)} / month
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-1 mb-3">
                  {PLANS[selectedPlan].covers === 1 ? (
                    <>
                      <li className="flex items-center gap-2 text-slate-900 text-sm">
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        1 high-resolution cover export per month
                      </li>
                      <li className="flex items-center gap-2 text-slate-900 text-sm">
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Unlimited cover generation
                      </li>
                      <li className="flex items-center gap-2 text-slate-900 text-sm">
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        300 DPI print-ready PDF
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2 text-slate-900 text-sm">
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        5 high-resolution cover exports per month
                      </li>
                      <li className="flex items-center gap-2 text-slate-900 text-sm">
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Unlimited cover creation
                      </li>
                      <li className="flex items-center gap-2 text-slate-900 text-sm">
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Priority support
                      </li>{" "}
                      <li className="flex items-center gap-2 text-slate-900 text-sm">
                        <svg
                          className="w-4 h-4 text-emerald-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        300 DPI print-ready PDF
                      </li>
                    </>
                  )}
                </ul>

                {/* Email */}
                <input
                  type="email"
                  placeholder="Your email address"
                  value={subscriberName}
                  onChange={(e) => setSubscriberName(e.target.value)}
                  className="w-full p-2 mb-1.5 bg-white border-2 border-yellow-400 rounded-lg outline-none focus:border-yellow-500 text-slate-900 placeholder:text-slate-500 transition text-sm"
                />

                {/* Password */}
                <div className="relative mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (min 6 chars)"
                    value={subscriberPassword}
                    onChange={(e) => setSubscriberPassword(e.target.value)}
                    className="w-full p-2 pr-9 bg-white border-2 border-slate-300 rounded-lg outline-none focus:border-yellow-400 text-slate-900 placeholder:text-slate-500 transition text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Log In */}
                <button
                  disabled={
                    isLoggingIn || !subscriberName.includes("@") || !subscriberPassword
                  }
                  onClick={handleLogin}
                  className="w-full border-2 border-slate-900 text-slate-900 bg-white py-2 rounded-lg font-bold text-sm hover:bg-slate-900 hover:text-white transition disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Logging In…
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Log In to Existing Account
                    </>
                  )}
                </button>
                {loginError && (
                  <p className="text-red-500 text-sm text-center mt-1 mb-1 font-medium">
                    {loginError}
                  </p>
                )}

                {/* Divider */}
                <div className="flex items-center gap-2 my-2">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400">or subscribe</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Subscribe button */}
                <button
                  disabled={
                    !subscriberName.includes("@") ||
                    subscriberPassword.length < 6
                  }
                  onClick={() => setUserEmail(subscriberName)}
                  className="w-full bg-slate-900 text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-700 transition disabled:opacity-40 flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Subscribe with Stripe
                </button>
                <p className="text-center text-xs text-slate-500 mt-1">
                  Secure billing · your password sets your login
                </p>

                {/* Back button */}
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="w-full mt-3 border-2 border-slate-200 text-slate-600 bg-white py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition"
                >
                  ← Back to Plans
                </button>
              </div>
            ) : (
              <CheckoutForm
                amount={PLANS[selectedPlan].price}
                currency="usd"
                customerEmail={userEmail}
                onSuccess={async () => {
                  // Register paid subscriber in DB
                  try {
                    await fetch("/api/register-paid", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email: userEmail,
                        password: subscriberPassword,
                      }),
                    });
                  } catch (err) {
                    console.warn("Could not register subscriber:", err);
                  }
                  // Log order to DB
                  try {
                    await fetch("/api/orders", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: userEmail.replace(/[^a-zA-Z0-9]/g, "_"),
                        items: [
                          {
                            plan: PLANS[selectedPlan].name,
                            covers: PLANS[selectedPlan].covers,
                          },
                        ],
                        totalAmount: PLANS[selectedPlan].price / 100,
                      }),
                    });
                  } catch (err) {
                    console.warn("Could not log order:", err);
                  }
                  // Store plan for future reference
                  localStorage.setItem("bcb_user_plan", selectedPlan);
                  setLoggedInEmail(userEmail);
                  setUserPlan(selectedPlan);
                  setIsPaid(true);
                  setSubscriptionDate(new Date());
                  setExportedCovers(0);
                  setShowPaymentModal(false);
                  showToast(
                    `Welcome to ${PLANS[selectedPlan].name}! You have ${PLANS[selectedPlan].covers} covers this month.`,
                    "success",
                  );
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Dashboard Modal */}
      {showDashboard && subscriptionDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-serif font-black text-slate-800">
                  Your Atelier
                </h2>
              </div>
              <button
                onClick={() => setShowDashboard(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-5 h-5"
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
            </div>

            <div className="text-center mb-8">
              <p className="font-serif italic text-slate-600 mb-4 leading-relaxed">
                "A beautiful cover is the beginning of a magnificent story."
              </p>
              <div className="inline-block bg-yellow-100 text-yellow-800 px-5 py-2 rounded-full font-bold shadow-sm">
                {userPlan ? PLANS[userPlan].covers - exportedCovers : 0} /{" "}
                {userPlan ? PLANS[userPlan].covers : 0} Covers Remaining
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border text-sm text-slate-600">
              <div className="flex justify-between items-center group">
                <span>Plan</span>
                <span className="font-medium text-slate-900">
                  {userPlan ? PLANS[userPlan].name : "Unknown"}
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span>Subscribed</span>
                <span className="font-medium text-slate-900">
                  {subscriptionDate.toLocaleDateString()}{" "}
                  {subscriptionDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center group">
                <span>Renews in</span>
                <span className="font-medium text-slate-900">
                  {30 -
                    Math.floor(
                      (new Date().getTime() - subscriptionDate.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                  days
                </span>
              </div>
              <div className="flex justify-between items-center group pt-2 border-t">
                <span>Status</span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
            </div>

            <button
              onClick={handleCancelSubscription}
              className="mt-6 w-full py-3 rounded-xl border-2 border-red-100 text-red-500 font-bold hover:bg-red-50 hover:border-red-200 transition"
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      )}
      {/* ── Toast Notifications ───────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium max-w-xs animate-in slide-in-from-right duration-300 pointer-events-auto
              ${
                t.type === "success"
                  ? "bg-emerald-600 text-white"
                  : t.type === "error"
                    ? "bg-red-500 text-white"
                    : "bg-slate-800 text-white"
              }`}
          >
            <span className="text-base leading-none mt-0.5">
              {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "ℹ"}
            </span>
            {t.message}
          </div>
        ))}
      </div>

      {/* ── Confirm Dialog ────────────────────────────────────── */}
      {confirmState && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <p className="text-slate-800 font-semibold text-base mb-5">
              {confirmState.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmState(null)}
                className="flex-1 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmState.onConfirm();
                  setConfirmState(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Fullscreen PDF Export Loader ─────────────────────────── */}
      {isExportingPDF && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 bg-white rounded-2xl px-10 py-8 shadow-2xl">
            <svg
              className="animate-spin w-10 h-10 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-slate-800 font-bold text-lg">Generating PDF…</p>
            <p className="text-slate-500 text-sm">This may take a few seconds</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
