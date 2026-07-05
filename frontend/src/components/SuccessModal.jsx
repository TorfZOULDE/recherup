import { useEffect } from 'react';

export default function SuccessModal({ isOpen, onClose, onContinue, title, message }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-[#070b19] border border-purple-500/20 rounded-[28px] p-8 md:p-10 max-w-md w-full shadow-2xl animate-modal">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-center text-xl font-extrabold text-white mb-4">
          {title || 'Merci pour votre contribution'}
        </h3>
        <p className="text-center text-gray-400 text-sm leading-relaxed mb-8">
          {message || 'Notre equipe analysera les informations soumises avant validation.'}
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-300 text-sm font-semibold hover:border-gray-500 hover:text-white transition-all">
            Fermer
          </button>
          <button onClick={onContinue || onClose}
            className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all">
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
