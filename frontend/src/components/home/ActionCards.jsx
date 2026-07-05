import { useState } from 'react';
import SuggestionPopup from '../SuggestionPopup';
import AddCompanyForm from './AddCompanyForm';

export default function ActionCards() {
  const [popup, setPopup] = useState(null); // null | 'suggest' | 'add'

  return (
    <>
      {/* Popup Proposer (étudiant) */}
      {popup === 'suggest' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setPopup(null); }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md">
            <SuggestionPopup defaultType="user" onClose={() => setPopup(null)} />
          </div>
        </div>
      )}

      {/* Popup Ajouter entreprise (formulaire complet) */}
{popup === 'add' && (
  <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-4 overflow-y-auto"
    onClick={(e) => { if (e.target === e.currentTarget) setPopup(null); }}>
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
    <div className="relative z-10 w-full max-w-2xl my-4 sm:my-8">
      <button onClick={() => setPopup(null)}
        className="absolute -top-3 -right-3 z-20 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all shadow-lg text-sm">
        ✕
      </button>
      <AddCompanyForm onSuccess={() => setPopup(null)} />
    </div>
  </div>
)}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-16 antialiased font-sans">

        {/* BLOC GAUCHE (Violet) : Vous êtes une entreprise ? */}
        <div className="bg-gradient-to-br from-[#140b2e] via-[#090518] to-[#05030f] border border-purple-500/20 rounded-3xl p-10 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden group shadow-[0_0_50px_rgba(139,92,246,0.05)] hover:border-purple-500/40 transition-all duration-300 min-h-[280px]">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-purple-600/15 transition-all duration-500"></div>
          <div className="flex-1 space-y-8 relative z-10 pr-4 w-full">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">Vous êtes une entreprise ?</h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[420px] font-normal">Ajoutez votre entreprise à notre annuaire et gagnez en visibilité auprès de milliers de talents.</p>
            </div>
            <button onClick={() => setPopup('add')}
              className="bg-[#6d28d9] hover:bg-[#7c3aed] text-white text-base font-bold px-7 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-purple-900/30 active:scale-[0.98] cursor-pointer">
              Ajouter mon entreprise ➔
            </button>
          </div>
          <div className="relative flex-none flex items-center justify-center w-36 h-36 mt-6 sm:mt-0 self-center sm:self-auto">
            <div className="absolute inset-0 m-auto w-24 h-24 bg-purple-500/15 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="absolute inset-0 m-auto w-12 h-12 bg-[#8b5cf6]/30 rounded-full blur-xl"></div>
            <svg width="85" height="85" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-purple-400/90 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <path d="M7.5 15C7.5 13.6193 8.61929 12.5 10 12.5H20C21.3807 12.5 22.5 13.6193 22.5 15V45H7.5V15Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22.5 7.5C22.5 6.11929 23.6193 5 25 5H35C36.3807 5 37.5 6.11929 37.5 7.5V45H22.5V7.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M37.5 20C37.5 18.6193 38.6193 17.5 40 17.5H50C51.3807 17.5 52.5 18.6193 52.5 20V45H37.5V20Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 45H55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 20H15.025" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 27.5H15.025" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 12.5H30.025" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 20H30.025" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 27.5H30.025" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M45 25H45.025" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M45 32.5H45.025" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* BLOC DROITE (Bleu) : Connaissez-vous une entreprise ? */}
        <div className="bg-gradient-to-br from-[#061836] via-[#030c1c] to-[#01050f] border border-blue-500/20 rounded-3xl p-10 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center relative overflow-hidden group shadow-[0_0_50px_rgba(37,99,235,0.05)] hover:border-blue-500/40 transition-all duration-300 min-h-[280px]">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-600/15 transition-all duration-500"></div>
          <div className="flex-1 space-y-8 relative z-10 pr-4 w-full">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">Connaissez-vous une entreprise ?</h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[420px] font-normal">Aidez-nous à enrichir notre base de données en nous proposant des entreprises que vous connaissez.</p>
            </div>
            <button onClick={() => setPopup('suggest')}
              className="bg-[#2563eb] hover:bg-[#3b82f6] text-white text-base font-bold px-7 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-900/30 active:scale-[0.98] cursor-pointer">
              Proposer une entreprise ➔
            </button>
          </div>
          <div className="relative flex-none flex items-center justify-center w-36 h-36 mt-6 sm:mt-0 self-center sm:self-auto">
            <div className="absolute inset-0 m-auto w-24 h-24 bg-blue-500/15 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500"></div>
            <div className="absolute inset-0 m-auto w-12 h-12 bg-[#3b82f6]/30 rounded-full blur-xl"></div>
            <svg width="85" height="85" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 text-blue-400/90 drop-shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <path d="M12.5 52.5C12.5 45.5964 18.0964 40 25 40H35C41.9036 40 47.5 45.5964 47.5 52.5H12.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M25 25C25 27.7614 22.7614 30 20 30C17.2386 30 15 27.7614 15 25C15 22.2386 17.2386 20 20 20C22.7614 20 25 22.2386 25 25Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M45 25C45 27.7614 42.7614 30 40 30C37.2386 30 35 27.7614 35 25C35 22.2386 37.2386 20 40 20C42.7614 20 45 22.2386 45 25Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30 17.5C30 21.6421 26.6421 25 22.5 25C18.3579 25 15 21.6421 15 17.5C15 13.3579 18.3579 10 22.5 10C26.6421 10 30 13.3579 30 17.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M45 17.5C45 21.6421 41.6421 25 37.5 25C33.3579 25 30 21.6421 30 17.5C30 13.3579 33.3579 10 37.5 10C41.6421 10 45 13.3579 45 17.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

      </section>
    </>
  );
}