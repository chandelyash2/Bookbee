import React, { useEffect } from "react";
import { Logo } from "../constants";

interface ContactPageProps {
  onHome: () => void;
  onStart: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onHome, onStart }) => {
  useEffect(() => {
    document.title = "Contact | BookCoverBee";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Contact BookCoverBee for enquiries.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
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
            onClick={onStart}
            className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition shadow-md"
          >
            Create Cover
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-sm p-10 md:p-14 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Contact
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 leading-relaxed">
            For enquiries please contact edpriceuk @ Hotmail dot com
          </p>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
