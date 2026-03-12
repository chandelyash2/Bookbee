import React, { useEffect, useState } from 'react';
import { Logo } from '../constants';

interface HomeProps {
  onStart: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onFeatures: () => void;
  onAbout: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onHowItWorks, onPricing, onFeatures, onAbout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    document.title = "AI Book Cover Creator for Authors | BookCoverBee";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Create professional book covers in seconds with BookCoverBee AI. Automatic spine and size calculations for KDP and print books. Export high-resolution covers instantly.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
        <Logo />        
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
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
          <button 
            className="absolute top-5 right-8 p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onAbout(); }} 
            className="text-2xl font-bold text-slate-800"
          >
            About
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onFeatures(); }} 
            className="text-2xl font-bold text-slate-800"
          >
            Features
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onHowItWorks(); }} 
            className="text-2xl font-bold text-slate-800"
          >
            How It Works
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onPricing(); }} 
            className="text-2xl font-bold text-slate-800"
          >
            Pricing
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onStart(); }} 
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-black text-xl shadow-lg"
          >
            Create Cover
          </button>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center py-16 px-6 max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
            Create Professional Book Covers in Seconds
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Welcome to BookCoverBee, the AI-powered book cover generator built for authors, publishers, and self-publishers.
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 mt-8 space-y-6 text-lg text-slate-700 leading-relaxed max-w-3xl">
          <p>
            Designing a book cover used to require graphic design skills, expensive software, and hours of frustrating calculations. BookCoverBee changes everything.
          </p>
          <p>
            Simply enter your book size, number of pages, and design idea. Within seconds, our intelligent design engine generates stunning, professional book covers ready for publishing.
          </p>
          <p>
            Whether you're writing a thriller, romance, cookbook, or nonfiction title, BookCoverBee creates visually striking covers tailored to your genre.
          </p>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-8 items-stretch pt-4">
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <h2 className="text-2xl font-black text-slate-900 border-b pb-4">Why Authors Love BookCoverBee</h2>
            <ul className="space-y-5 flex-1 mt-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span><strong className="text-slate-900">Instant Cover Creation</strong> – AI generates designs in seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span><strong className="text-slate-900">Automatic Size Calculations</strong> – No more spine width math</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span><strong className="text-slate-900">Genre-Smart Fonts</strong> – Perfect typography suggestions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span><strong className="text-slate-900">High-Resolution Export</strong> – Print-ready 300 DPI files</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-green-100 text-green-700 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span><strong className="text-slate-900">Perfect for Self-Publishing</strong> – Optimised for KDP and print platforms</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t font-semibold text-slate-800 text-center">
              From first idea to finished cover, BookCoverBee helps bring your book to life.
            </div>
          </div>

          <div className="space-y-6 bg-slate-900 text-white p-8 rounded-3xl shadow-xl h-full flex flex-col relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            
            <h2 className="text-2xl font-black border-b border-slate-700 pb-4 relative z-10">How It Works</h2>
            <ol className="space-y-5 text-slate-300 list-decimal list-inside marker:font-bold marker:text-yellow-500 flex-1 mt-4 relative z-10">
              <li className="pl-2">Choose your book size (5×8, 5.5×8.5, 6×9, or 8.5×11).</li>
              <li className="pl-2">Enter your page count.</li>
              <li className="pl-2">Add your title, subtitle, and back cover blurb.</li>
              <li className="pl-2">Select your genre and preferred fonts.</li>
              <li className="pl-2">Describe your cover idea and let the AI create the design.</li>
              <li className="pl-2">Export a 300 DPI print-ready PDF when you're happy.</li>
            </ol>
            <div className="mt-6 pt-6 border-t border-slate-800 relative z-10">
              <p className="text-yellow-400 font-bold mb-6 text-center">
                Within moments, your book cover is ready for upload to your publishing platform.
              </p>
              <button 
                onClick={onStart}
                className="w-full bg-yellow-500 text-black font-black text-lg py-4 rounded-xl hover:bg-yellow-400 transition shadow-lg hover:-translate-y-1"
              >
                Start Creating Now ➔
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
