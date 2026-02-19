import React, { useState, useRef } from 'react';
import { GeneratedAdResponse } from '../types';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface AdDisplayProps {
  ad: GeneratedAdResponse;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ ad }) => {
  const [copied, setCopied] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const fullText = `🚀 ${ad.headline.toUpperCase()}\n\n${ad.hook}\n\n🎯 O ČEM TO BUDE REÁLNĚ?\n${ad.content}\n\n🤝 HLEDÁME PARŤÁKA, KTERÝ...\n${ad.requirements}\n\n✨ PROČ K NÁM BUDETE CHODIT RÁDI?\n${ad.offer}`.trim();
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPDF = () => {
    if (!adRef.current) return;

    const element = adRef.current;
    
    const opt = {
      margin:       15,
      filename:     `Inzerat-${ad.headline.substring(0, 15)}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc: Document) => {
          // BRUTÁLNÍ SÍLA: Vložíme do tiskového dokumentu vlastní CSS
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            #pdf-export-content {
              background: white !important;
              color: black !important;
              padding: 10px !important;
            }
            /* Všechno v PDF bude černé */
            #pdf-export-content * {
              color: black !important;
              background-color: transparent !important;
              border-color: #d1d5db !important;
              text-shadow: none !important;
            }
            /* Nadpis bude extra výrazný */
            #pdf-export-content h3 {
              color: #000000 !important;
              font-weight: 900 !important;
            }
            /* Kritika bude mít šedý podkres, aby byla čitelná */
            #pdf-export-content .criticism-box {
              background-color: #fef3c7 !important;
              border: 1px solid #f59e0b !important;
              padding: 15px !important;
              border-radius: 8px !important;
            }
            /* Vypnutí těch fialových gradientů v PDF */
            #pdf-export-content .bg-gradient-to-br {
              background: #f8fafc !important;
              border: 1px solid #e2e8f0 !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar relative pb-10">
      <div className="sticky top-0 z-20 flex justify-end pb-4 bg-slate-900/80 backdrop-blur-sm -mx-2 px-2 pt-2">
        <button
          onClick={handleCopy}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg border-2 ${
            copied ? 'bg-green-600 border-green-500' : 'bg-violet-600 border-violet-500 hover:bg-violet-700'
          }`}
        >
          <span>{copied ? 'Zkopírováno!' : 'Kopírovat pro LinkedIn'}</span>
        </button>
      </div>

      {/* ID pdf-export-content je klíčové pro naše tiskové CSS */}
      <div ref={adRef} id="pdf-export-content" className="space-y-10 p-4">
        {ad.criticism && (
          <div className="criticism-box bg-amber-950/30 border-2 border-amber-500/30 p-5 rounded-2xl">
            <h4 className="text-amber-400 font-black text-xs mb-2 uppercase">[ KRITIKA ZADÁNÍ ]</h4>
            <p className="text-amber-200/80 text-sm italic">{ad.criticism}</p>
          </div>
        )}

        <div className="space-y-10">
          <div>
            <h3 className="text-4xl font-black text-white leading-tight mb-4">{ad.headline}</h3>
            <p className="text-xl text-slate-300 font-medium italic border-l-4 border-violet-600 pl-6">{ad.hook}</p>
          </div>
          
          <section>
            <h4 className="text-xs font-black text-violet-400 mb-4 uppercase tracking-widest">1. Náplň práce</h4>
            <div className="bg-slate-800/40 p-6 rounded-2xl text-slate-300 whitespace-pre-wrap leading-relaxed">{ad.content}</div>
          </section>

          <section>
            <h4 className="text-xs font-black text-violet-400 mb-4 uppercase tracking-widest">2. Požadavky</h4>
            <div className="bg-slate-800/40 p-6 rounded-2xl text-slate-300 whitespace-pre-wrap leading-relaxed">{ad.requirements}</div>
          </section>

          <section>
            <h4 className="text-xs font-black text-violet-400 mb-4 uppercase tracking-widest">3. Co nabízíme</h4>
            <div className="bg-gradient-to-br from-violet-900/20 to-indigo-900/20 p-6 rounded-2xl text-slate-300 whitespace-pre-wrap leading-relaxed">{ad.offer}</div>
          </section>
        </div>
      </div>

      <div className="pt-10 border-t border-slate-800 flex flex-col items-center">
        <button 
          onClick={handleDownloadPDF}
          className="px-8 py-4 bg-white text-slate-950 font-black rounded-xl hover:bg-slate-200 transition-all shadow-2xl active:scale-95"
        >
          STÁHNOUT JAKO PDF
        </button>
      </div>
    </div>
  );
};

export default AdDisplay;
