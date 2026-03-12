import React, { useEffect, useState } from 'react';
import { Logo } from '../constants';

interface FeaturesProps {
  onStart: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onPricing: () => void;
  onAbout: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onStart, onHome, onHowItWorks, onPricing, onAbout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "AI Book Cover Design Features | BookCoverBee";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Discover the powerful features behind BookCoverBee’s AI book cover generator.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
        <div className="cursor-pointer hover:opacity-80 transition" onClick={onHome} title="Return to Home">
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
            onClick={() => { setIsMobileMenuOpen(false); onHome(); }} 
            className="text-2xl font-bold text-slate-800"
          >
            Home
          </button>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); onAbout(); }} 
            className="text-2xl font-bold text-slate-800"
          >
            About
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

      <main className="flex-1 flex flex-col items-center py-16 px-6 max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="text-center space-y-6 w-full">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Powerful Features Built for Authors
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            BookCoverBee combines artificial intelligence with publishing expertise to deliver professional covers quickly and easily.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-yellow-400 transition">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Automatic Book Cover Dimensions</h3>
            <p className="text-slate-600 text-lg">No more complicated calculations. Enter your trim size and page count and BookCoverBee calculates:</p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center gap-2 text-slate-700"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Full wrap cover dimensions</li>
              <li className="flex items-center gap-2 text-slate-700"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Spine width</li>
              <li className="flex items-center gap-2 text-slate-700"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Front and back cover layout</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-yellow-400 transition">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">AI-Generated Artwork</h3>
            <p className="text-slate-600 text-lg">
              Describe your cover idea and the AI instantly generates unique artwork concepts tailored to your book.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-yellow-400 transition">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Genre-Smart Typography</h3>
            <p className="text-slate-600 text-lg">Different genres require different design styles. BookCoverBee recommends fonts and layouts suited to:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold">Thrillers</span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold">Romance novels</span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold">Sci-fi and fantasy</span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold">Business books</span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold">Cookbooks</span>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold">Memoirs and more</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-yellow-400 transition">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900">High-Resolution Print Exports</h3>
            <p className="text-slate-600 text-lg">All exported covers are:</p>
            <ul className="space-y-2 mt-2">
              <li className="flex items-center gap-2 text-slate-700"><div className="w-2 h-2 rounded-full bg-green-500"></div>300 DPI resolution</li>
              <li className="flex items-center gap-2 text-slate-700"><div className="w-2 h-2 rounded-full bg-green-500"></div>Print-ready PDF format</li>
              <li className="flex items-center gap-2 text-slate-700"><div className="w-2 h-2 rounded-full bg-green-500"></div>Suitable for major publishing platforms</li>
            </ul>
          </div>
        </div>

        {/* Feature 5 - Full Width */}
        <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-xl max-w-4xl w-full text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="relative z-10 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-black mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h2 className="text-3xl font-black mb-4 relative z-10">Fast Design Workflow</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto relative z-10 leading-relaxed mb-8">
            Most covers are generated in under <span className="text-yellow-400 font-bold">30 seconds</span>, saving hours compared with traditional design software.
          </p>
          <button 
            onClick={onStart}
            className="bg-yellow-500 text-black px-10 py-4 rounded-xl font-black text-xl hover:bg-yellow-400 shadow-lg hover:-translate-y-1 transition duration-300 relative z-10"
          >
            Experience It Now ➔
          </button>
        </div>
      </main>
    </div>
  );
};

export default Features;
