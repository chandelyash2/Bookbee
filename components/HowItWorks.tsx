import React, { useEffect, useState } from 'react';
import { Logo } from '../constants';

interface HowItWorksProps {
  onStart: () => void;
  onHome: () => void;
  onPricing: () => void;
  onFeatures: () => void;
  onAbout: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onStart, onHome, onPricing, onFeatures, onAbout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "How BookCoverBee Works | AI Book Cover Generator";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn how to create stunning AI-generated book covers in under a minute using BookCoverBee.");
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
            onClick={() => { setIsMobileMenuOpen(false); onFeatures(); }} 
            className="text-2xl font-bold text-slate-800"
          >
            Features
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

      <main className="flex-1 flex flex-col items-center py-16 px-6 max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
        <div className="text-center space-y-6 w-full">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Design a Book Cover in Under 30 Seconds
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
            Creating a professional book cover has never been easier. BookCoverBee guides you through a simple process designed for authors, not graphic designers.
          </p>
        </div>

        <div className="w-full space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent pt-8">
          
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white font-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">1</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl text-slate-900 mb-3">Choose Your Book Size</h3>
              <p className="text-slate-600 mb-4">Select the trim size of your book:</p>
              <ul className="grid grid-cols-2 gap-2 text-sm text-slate-700 font-medium mb-4">
                <li className="bg-slate-50 border p-2 rounded-lg text-center">5 × 8</li>
                <li className="bg-slate-50 border p-2 rounded-lg text-center">5.5 × 8.5</li>
                <li className="bg-slate-50 border p-2 rounded-lg text-center">6 × 9</li>
                <li className="bg-slate-50 border p-2 rounded-lg text-center">8.5 × 11</li>
              </ul>
              <p className="text-sm text-slate-500">Enter your page count and BookCoverBee automatically calculates the full wrap dimensions including the spine.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white font-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">2</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl text-slate-900 mb-3">Add Your Book Details</h3>
              <p className="text-slate-600 mb-4">Input key elements including:</p>
              <ul className="space-y-2 text-sm text-slate-700 mb-4">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></div> Book title</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></div> Subtitle (optional)</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></div> Author name</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></div> Back cover blurb</li>
              </ul>
              <p className="text-sm text-slate-500">These will automatically be positioned within the cover layout.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white font-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">3</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl text-slate-900 mb-3">Select Your Genre</h3>
              <p className="text-slate-600 mb-4">Choose your genre and BookCoverBee suggests suitable typography and styles, such as:</p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                <span className="bg-slate-100 px-3 py-1 rounded-full border">Thriller</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full border">Romance</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full border">Fantasy</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full border">Non-fiction</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full border">Cookbooks</span>
                <span className="bg-slate-100 px-3 py-1 rounded-full border">Memoirs</span>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-900 text-white font-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">4</div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl text-slate-900 mb-3">Describe Your Design</h3>
              <p className="text-slate-600 mb-4">Tell the AI what you'd like to see on your cover.</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm mb-4">
                <strong className="block text-xs uppercase tracking-wider text-slate-500 mb-1">Example:</strong>
                "A dark forest at night with a single cabin light glowing."
              </div>
              <p className="text-sm text-slate-500 font-medium text-yellow-600 block">The AI instantly generates multiple professional concepts.</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white font-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-900 p-6 rounded-2xl shadow-xl text-white">
              <h3 className="font-bold text-xl mb-3">Export Your Finished Cover</h3>
              <p className="text-slate-300 mb-4">Once you're happy with your design, export your cover as a 300 DPI print-ready PDF.</p>
              <p className="text-yellow-400 font-bold mb-4">Upload it directly to your publishing platform and you're ready to go.</p>
              <button 
                onClick={onStart}
                className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
              >
                Start Designing
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
