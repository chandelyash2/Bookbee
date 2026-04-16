import React, { useEffect, useState } from 'react';
import { Logo } from '../constants';

const goToContact = () => {
  window.history.pushState({}, "", "/contact");
  window.dispatchEvent(new PopStateEvent("popstate"));
};

interface AboutProps {
  onStart: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onFeatures: () => void;
  onBookCoverBee: () => void;
  onBookCoverDimensions: () => void;
  onSpineWidthCalculator: () => void;
  onPaperbackCoverSize: () => void;
}

const About: React.FC<AboutProps> = ({ onStart, onHome, onHowItWorks, onPricing, onFeatures, onBookCoverBee, onBookCoverDimensions, onSpineWidthCalculator, onPaperbackCoverSize }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "About BookCoverBee | AI Cover Design for Authors";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn about the mission behind BookCoverBee and how it helps authors create professional book covers quickly.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
        <div className="cursor-pointer hover:opacity-80 transition" onClick={onHome} title="Return to Home">
          <Logo />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={onHome} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            Home
          </button>
          <button onClick={onFeatures} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            Features
          </button>
          <button onClick={onHowItWorks} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            How It Works
          </button>
          <button onClick={onBookCoverBee} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            KDP Creator
          </button>
          <button onClick={onBookCoverDimensions} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            Dimensions
          </button>
          <button onClick={onSpineWidthCalculator} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            Spine Width
          </button>
          <button onClick={onPaperbackCoverSize} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            Paperback Size
          </button>
          <button onClick={onPricing} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            Pricing
          </button>
          <button onClick={goToContact} className="text-slate-600 hover:text-slate-900 font-semibold transition">
            Contact
          </button>
          <button onClick={onStart} className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition shadow-md">
            Create Cover
          </button>
        </div>
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(true)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <button className="absolute top-5 right-8 p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onHome(); }} className="text-2xl font-bold text-slate-800">
            Home
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onFeatures(); }} className="text-2xl font-bold text-slate-800">
            Features
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onHowItWorks(); }} className="text-2xl font-bold text-slate-800">
            How It Works
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onBookCoverBee(); }} className="text-2xl font-bold text-slate-800">
            KDP Creator
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onBookCoverDimensions(); }} className="text-2xl font-bold text-slate-800">
            Dimensions
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onSpineWidthCalculator(); }} className="text-2xl font-bold text-slate-800">
            Spine Width
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onPaperbackCoverSize(); }} className="text-2xl font-bold text-slate-800">
            Paperback Size
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onPricing(); }} className="text-2xl font-bold text-slate-800">
            Pricing
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); goToContact(); }} className="text-2xl font-bold text-slate-800">
            Contact
          </button>
          <button onClick={() => { setIsMobileMenuOpen(false); onStart(); }} className="bg-yellow-500 text-black px-8 py-3 rounded-full font-black text-xl shadow-lg">
            Create Cover
          </button>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center py-16 px-6 max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="text-center space-y-6 w-full">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Our Mission
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
            BookCoverBee was created to solve a problem faced by thousands of independent authors.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-lg text-slate-700 leading-relaxed w-full">
          <p>
            Great books often struggle because their covers look amateur. Hiring a professional designer can cost hundreds of dollars, and traditional design software is difficult to learn.
          </p>
          <p className="font-bold text-slate-900 text-xl">
            BookCoverBee bridges that gap.
          </p>
          <p>
            Our AI technology helps authors create beautiful, professional book covers in seconds, without needing graphic design experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* Built for Self-Publishers */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-center space-y-6 relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition pointer-events-none"></div>
            <h2 className="text-2xl font-black relative z-10">Built for Self-Publishers</h2>
            <p className="text-slate-300 relative z-10">
              The platform was designed specifically for modern self-publishing workflows. 
            </p>
            <p className="text-yellow-400 font-medium relative z-10">
              It supports the most common book trim sizes used by platforms like Kindle Direct Publishing, making it simple to upload your finished cover and publish your book.
            </p>
          </div>

          {/* Who Uses BookCoverBee */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Who Uses BookCoverBee?</h2>
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Independent authors
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Self-publishers
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Small publishing houses
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Bloggers creating ebooks
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Coaches and course creators
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center w-full pt-8">
          <p className="text-xl text-slate-700 font-bold mb-8">
            If you have a book idea, BookCoverBee helps you present it with a professional cover.
          </p>
          <button 
            onClick={onStart}
            className="bg-yellow-500 text-black px-10 py-4 rounded-xl font-black text-xl hover:bg-yellow-400 shadow-lg hover:-translate-y-1 transition duration-300"
          >
            Start Designing
          </button>
        </div>
      </main>
    </div>
  );
};

export default About;
