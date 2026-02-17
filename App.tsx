
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobForm from './components/JobForm';
import AdDisplay from './components/AdDisplay';
import { JobInputData, GeneratedAdResponse } from './types';
import { generateJobAd } from './services/geminiService';

const LOADING_MESSAGES = [
  "Mažu z textu 'mladý a dynamický kolektiv'...",
  "Dolaďuji WIIFM, aby kandidáti věděli, proč k vám chtějí...",
  "Kontroluji, zda požadavky nepřipomínají nákupní seznam pro Supermana...",
  "Připravuji háček, na který se chytí ti nejlepší...",
  "Leštím váš Employer Brand, aby zářil víc než konkurence...",
  "Přemýšlím, jak popsat tu nejtěžší část práce fakt lidsky...",
  "Hledám ty správné emotikony pro váš LinkedIn post...",
  "Filtruji korporátní hantýrku a klišé...",
  "Dávám pozor, aby inzerát nezněl jako z minulého století..."
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [ad, setAd] = useState<GeneratedAdResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (loading) {
      interval = window.setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 2500);
    } else {
      setLoadingMsgIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (data: JobInputData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateJobAd(data);
      setAd(result);
    } catch (err) {
      console.error(err);
      setError("Omlouváme se, při generování inzerátu došlo k chybě. Ujistěte se, že nahráváte PDF nebo textový soubor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-violet-500/20">
            <h2 className="text-xl font-bold mb-6 text-violet-400 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Zadání pozice
            </h2>
            <JobForm onSubmit={handleGenerate} isLoading={loading} />
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-violet-500/20 min-h-[500px] flex flex-col relative overflow-hidden">
             {/* Decorative background pulse */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <h2 className="text-xl font-bold mb-6 text-violet-400 flex items-center z-10">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Náhled inzerátu
            </h2>
            
            <div className="flex-1 flex flex-col z-10">
              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-violet-500/20 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                  </div>
                  <div className="max-w-xs h-16 flex items-center justify-center">
                    <p className="text-slate-100 font-bold text-lg animate-in fade-in slide-in-from-bottom-2 duration-500 key={loadingMsgIndex}">
                      {LOADING_MESSAGES[loadingMsgIndex]}
                    </p>
                  </div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-black opacity-50">Generuji neodolatelnou nabídku</p>
                </div>
              ) : error ? (
                <div className="flex-1 flex items-center justify-center text-center p-8 bg-red-950/30 rounded-xl border border-red-500/30">
                  <p className="text-red-400 font-medium">{error}</p>
                </div>
              ) : ad ? (
                <AdDisplay ad={ad} />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                  <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l5 5v11a2 2 0 01-2 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 3v5h5" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 13h8m-8 4h8" />
                    </svg>
                  </div>
                  <p className="text-slate-400 italic max-w-xs">Zadejte parametry nebo nahrajte dokument vlevo pro vygenerování unikátního inzerátu.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-900 mt-8">
        <p className="mb-2">Vyvinuto s respektem k férovému náboru a Employer Brandingu.</p>
        <p className="font-semibold text-slate-400">&copy; {new Date().getFullYear()} HR Brand-Ad Architect &bull; Alma Career Ready</p>
      </footer>
    </div>
  );
};

export default App;
