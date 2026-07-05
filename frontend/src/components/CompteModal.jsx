import { useEffect } from 'react';

export default function CompteModal({ isOpen, onClose }) {
  
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal avec logo en fond */}
      <div 
        className="relative bg-[#070b19] border border-purple-500/20 rounded-[28px] p-8 md:p-10 max-w-md w-full shadow-2xl shadow-purple-950/40 animate-modal text-center overflow-hidden"
        style={{ 
          backgroundImage: "url('/logo.png')", 
          backgroundSize: "contain", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Couche de recouvrement pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-[#070b19]/90" />

        {/* Contenu */}
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h3 className="text-2xl font-extrabold text-white mb-4">
            Bienvenue sur Filiére Connect !
          </h3>

          <div className="text-gray-400 text-sm leading-relaxed mb-8">
            Votre compte est maintenant actif.<br /><br />
            Préparez-vous à découvrir des stages, des entreprises et des opportunités adaptées à votre profil.<br /><br />
            <span className="text-purple-400 font-bold">Le futur commence maintenant.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all shadow-lg shadow-purple-950/30"
          >
            OK
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal { animation: modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
}