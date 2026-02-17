
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-md border-b border-violet-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-violet-900/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-100">HR Brand-Ad Architect</h1>
            <p className="text-[10px] text-violet-400 font-bold uppercase tracking-[0.2em]">Employer Branding Mastermind</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-6">
          <div className="px-3 py-1 bg-violet-500/10 border border-violet-500/30 rounded-full flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-violet-300">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
