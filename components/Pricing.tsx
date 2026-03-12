import React, { useEffect, useState } from 'react';
import { Logo } from '../constants';

interface PricingProps {
  onStart: () => void;
  onHome: () => void;
  onHowItWorks: () => void;
  onFeatures: () => void;
  onAbout: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStart, onHome, onHowItWorks, onFeatures, onAbout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "BookCoverBee Pricing | Affordable AI Book Cover Design";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Simple pricing for professional AI book covers. Export stunning print-ready designs starting at just $9 per month.");
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
            onClick={() => { setIsMobileMenuOpen(false); onStart(); }} 
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-black text-xl shadow-lg"
          >
            Create Cover
          </button>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center py-16 px-6 max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="text-center space-y-4 w-full">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Simple, Affordable Pricing
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            BookCoverBee allows you to design unlimited covers and only pay when you export your final high-resolution file.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto pt-8">
          {/* Starter Plan */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Starter Plan</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-slate-900">$9</span>
              <span className="text-slate-500 font-medium">/ month</span>
            </div>
            <p className="text-slate-600 mb-8 h-12">Perfect for authors publishing occasionally.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span className="font-bold">1 high-resolution cover export per month</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>Unlimited AI cover generation</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>Genre-specific fonts and styles</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>Automatic spine and size calculations</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700">
                <div className="mt-1 text-green-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>300 DPI print-ready PDF export</span>
              </li>
            </ul>
            
            <button 
              onClick={onStart}
              className="w-full bg-slate-100 text-slate-900 border-2 border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-200 transition"
            >
              Get Started
            </button>
          </div>

          {/* Author Plan */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-black px-4 py-1 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
            
            <h3 className="text-2xl font-black mb-2">Author Plan</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-yellow-400">$19</span>
              <span className="text-slate-400 font-medium">/ month</span>
            </div>
            <p className="text-slate-300 mb-8 h-12">Ideal for active writers and indie publishers.</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-slate-100">
                <div className="mt-1 text-yellow-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span className="font-bold">5 high-resolution cover exports per month</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="mt-1 text-yellow-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>Unlimited cover creation</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="mt-1 text-yellow-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>Genre-based typography suggestions</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="mt-1 text-yellow-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>Instant design generation</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <div className="mt-1 text-yellow-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg></div>
                <span>Print-ready 300 DPI PDF downloads</span>
              </li>
            </ul>
            
            <button 
              onClick={onStart}
              className="w-full bg-yellow-500 text-black py-3 rounded-xl font-black text-lg hover:bg-yellow-400 shadow-lg hover:shadow-xl transition hover:-translate-y-0.5"
            >
              Choose Author Plan
            </button>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm max-w-4xl text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Why BookCoverBee is Different</h2>
          <div className="space-y-4 text-slate-600 text-lg max-w-3xl mx-auto">
            <p>
              Most design software charges expensive subscription fees or requires graphic design expertise.
            </p>
            <p>
              BookCoverBee focuses on simplicity, speed, and publishing accuracy.
            </p>
            <p className="font-bold text-slate-800">
              You design as many covers as you like and only use your export credits when you're ready to publish.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
