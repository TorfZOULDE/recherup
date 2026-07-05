import { useEffect } from 'react';

export default function SuccesModal({ isOpen, onClose, title, message }) {
  // Fermer avec Echap
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Bloquer le scroll quand ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Fermeture automatique après 4 secondes
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => onClose(), 8000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative max-w-md w-full rounded-[28px] overflow-hidden shadow-2xl shadow-purple-950/40 animate-modal">

        {/* Image de fond */}
        <img
          src="/logo.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Contenu par-dessus */}
        <div className="relative z-10 p-8 md:p-10 flex flex-col items-center">

          {/* Barre de progression */}
          <div className="w-full h-1 bg-white/20 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-purple-400 rounded-full animate-progress" />
          </div>

          {/* Icône succès */}
          <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Titre */}
          <h3 className="text-center text-xl md:text-2xl font-extrabold text-white mb-4">
            {title || 'Merci pour votre message 💜'}
          </h3>

          {/* Message */}
          <p className="text-center text-gray-300 text-sm leading-relaxed">
            {message || (
              <>
                Votre message a bien été envoyé.<br /><br />
                Notre équipe vous répondra dans les plus brefs délais.
              </>
            )}
          </p>

        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal {
          animation: modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}</style>
    </div>
  );
}