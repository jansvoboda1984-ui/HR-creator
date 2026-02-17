
import React, { useState } from 'react';
import { GeneratedAdResponse } from '../types';

interface AdDisplayProps {
  ad: GeneratedAdResponse;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ ad }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Formátování textu pro LinkedIn s emotikonami a jasnou strukturou
    const fullText = `
🚀 ${ad.headline.toUpperCase()}

${ad.hook}

🎯 O ČEM TO BUDE REÁLNĚ?
${ad.content}

🤝 HLEDÁME PARŤÁKA, KTERÝ...
${ad.requirements}

✨ PROČ K NÁM BUDETE CHODIT RÁDI?
${ad.offer}

📍 Máte zájem? Ozvěte se nám!

#kariera #nabor #employerbranding #hiring #jobopportunity
    `.trim();

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar relative pb-10">
      <div className="sticky top-0 z-20 flex justify-end pb-4 bg-slate-900/80 backdrop-blur-sm -mx-2 px-2 pt-2">
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg border-2 ${
            copied
              ? 'bg-green-600 text-white border-green-500 scale-105'
              : 'bg-violet-600 text-white border-violet-500 hover:bg-violet-700 hover:shadow-violet-600/40'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Zkopírováno!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Kopírovat pro LinkedIn</span>
            </>
          )}
        </button>
      </div>

      {ad.criticism && (
        <div className="bg-amber-950/30 border-2 border-amber-500/30 p-5 rounded-2xl animate-in zoom-in duration-300">
          <div className="flex items-center space-x-3 mb-2 text-amber-400 font-black tracking-widest text-xs">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>[ KRITICKÁ SEBEREFLEXE ]</span>
          </div>
          <p className="text-amber-200/80 text-sm italic leading-relaxed font-medium">{ad.criticism}</p>
        </div>
      )}

      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div>
          <h3 className="text-4xl font-black text-white leading-tight mb-6 tracking-tight">{ad.headline}</h3>
          <div className="flex flex-wrap gap-2 mb-6">
             <span className="px-3 py-1 bg-violet-600 text-white text-[10px] font-black rounded-md uppercase tracking-widest">
              Premium Ad
            </span>
             <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-black rounded-md uppercase tracking-widest border border-slate-700">
              EB Optimized
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-gradient-to-b from-violet-600 to-transparent rounded-full"></div>
          <p className="text-xl text-slate-300 font-medium leading-relaxed italic pl-6">
            {ad.hook}
          </p>
        </div>

        <section className="group">
          <h4 className="text-xs font-black text-violet-400 mb-4 flex items-center tracking-widest uppercase">
            <span className="w-6 h-6 rounded-lg bg-violet-600/20 flex items-center justify-center mr-3 text-violet-400 border border-violet-500/30 group-hover:scale-110 transition-transform">1</span>
            O čem to bude reálně?
          </h4>
          <div className="bg-slate-800/40 p-6 rounded-2xl text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-700/50 group-hover:border-violet-500/20 transition-colors">
            {ad.content}
          </div>
        </section>

        <section className="group">
          <h4 className="text-xs font-black text-violet-400 mb-4 flex items-center tracking-widest uppercase">
             <span className="w-6 h-6 rounded-lg bg-violet-600/20 flex items-center justify-center mr-3 text-violet-400 border border-violet-500/30 group-hover:scale-110 transition-transform">2</span>
            Hledáme parťáka, který...
          </h4>
          <div className="bg-slate-800/40 p-6 rounded-2xl text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-700/50 group-hover:border-violet-500/20 transition-colors">
            {ad.requirements}
          </div>
        </section>

        <section className="group">
          <h4 className="text-xs font-black text-violet-400 mb-4 flex items-center tracking-widest uppercase">
             <span className="w-6 h-6 rounded-lg bg-violet-600/20 flex items-center justify-center mr-3 text-violet-400 border border-violet-500/30 group-hover:scale-110 transition-transform">3</span>
            Proč k nám budete chodit rádi?
          </h4>
          <div className="bg-gradient-to-br from-violet-900/20 to-indigo-900/20 p-6 rounded-2xl text-slate-300 whitespace-pre-wrap leading-relaxed border border-violet-500/30 shadow-lg shadow-violet-950/20">
            {ad.offer}
          </div>
        </section>

        <div className="pt-10 border-t border-slate-800 flex flex-col items-center">
          <div className="text-center space-y-4">
            <p className="text-slate-500 text-sm font-medium">Líbí se vám tento návrh?</p>
            <div className="flex space-x-3">
               <button className="px-8 py-3 bg-white text-slate-950 font-black rounded-xl hover:bg-slate-200 transition-colors shadow-xl">
                STÁHNOUT JAKO PDF
              </button>
            </div>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              Architektura inzerátu odpovídá standardům Férového náboru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDisplay;
