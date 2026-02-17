
import React, { useState, useRef } from 'react';
import { JobInputData, FileData } from '../types';

interface JobFormProps {
  onSubmit: (data: JobInputData) => void;
  isLoading: boolean;
}

const JobForm: React.FC<JobFormProps> = ({ onSubmit, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [formData, setFormData] = useState<JobInputData>({
    position: '',
    salary: '',
    hardestPart: '',
    mainBenefit: '',
    tasks: '',
    requirements: '',
    benefits: '',
    companyVibe: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Supported: PDF and Text (Word .docx requires library parsing, we recommend PDF)
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      setFileData({
        base64,
        mimeType: file.type,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, file: fileData || undefined });
  };

  const inputClasses = "w-full px-4 py-2.5 bg-slate-800 border border-violet-500/30 rounded-xl text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all";
  const labelClasses = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* File Upload Section */}
      <div className="p-4 bg-violet-500/5 border border-dashed border-violet-500/30 rounded-2xl transition-all hover:bg-violet-500/10">
        <label className={labelClasses}>Máte popis pozice v souboru? (PDF/Text)</label>
        {!fileData ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center py-4 cursor-pointer"
          >
            <svg className="w-8 h-8 text-violet-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-medium text-slate-300">Nahrát dokument</p>
            <p className="text-[10px] text-slate-500">Doporučeno: PDF s původním inzerátem</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.txt" 
              onChange={handleFileChange} 
            />
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-violet-500/20 rounded-lg border border-violet-500/40">
            <div className="flex items-center space-x-3 truncate">
              <svg className="w-5 h-5 text-violet-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A1 1 0 0111 2.414l5.586 5.586A1 1 0 0117 8.586V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              <span className="text-sm font-medium text-slate-200 truncate">{fileData.name}</span>
            </div>
            <button 
              type="button" 
              onClick={removeFile}
              className="p-1 hover:bg-rose-500/20 rounded text-rose-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Název pozice</label>
          <input
            required
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="např. Frontend Vývojář/ka"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Mzda (rozpětí/fix)</label>
          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="např. 60 000 - 80 000 Kč"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label className={labelClasses}>Co je na té práci fakt těžké?</label>
        <input
          name="hardestPart"
          value={formData.hardestPart}
          onChange={handleChange}
          placeholder="Buďte upřímní - co kandidáta zapotí?"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Ten největší unikátní benefit?</label>
        <input
          name="mainBenefit"
          value={formData.mainBenefit}
          onChange={handleChange}
          placeholder="Proč jít k vám a ne ke konkurenci?"
          className={inputClasses}
        />
      </div>

      <div>
        <label className={labelClasses}>Náplň práce (výsledky)</label>
        <textarea
          required
          name="tasks"
          rows={3}
          value={formData.tasks}
          onChange={handleChange}
          placeholder="Co bude reálným výsledkem jeho/její práce?"
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div>
        <label className={labelClasses}>Požadavky</label>
        <textarea
          required
          name="requirements"
          rows={3}
          value={formData.requirements}
          onChange={handleChange}
          placeholder="Co musí umět? (Lidsky, prosím)"
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-xl font-black text-white shadow-xl transition-all transform active:scale-[0.98] overflow-hidden relative group ${
          isLoading 
            ? 'bg-slate-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-violet-600 to-indigo-700 hover:shadow-violet-500/30'
        }`}
      >
        <span className="relative z-10">{isLoading ? 'GENERUJI ARCHITEKTURU...' : 'NAVRHNOUT PROFI INZERÁT'}</span>
        {!isLoading && (
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
        )}
      </button>
    </form>
  );
};

export default JobForm;
