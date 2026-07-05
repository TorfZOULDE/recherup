import { useState, useEffect } from 'react';
import { register, login } from '../../services/auth.service';
import CompteModal from '../CompteModal';

// ── icônes inline ────────────────────────────────────────────────────────────
function UserIcon() {
  return (
    <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
    </svg>
  );
}
function CloseIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
      aria-label="Fermer"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  );
}

// ── Formulaire d'inscription (auto-contenu, sans navigate) ───────────────────
function InlineRegisterForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'etudiant', filiere: '',
  });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword)
      return setError('Les mots de passe ne correspondent pas.');
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await register(payload);
      onSuccess(); // → ouvre CompteModal
    } catch (err) {
      setError(err.response?.data?.error || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full bg-[#05060f] border border-white/10 p-3 pl-10 rounded-xl text-white outline-none focus:border-purple-500 transition-colors text-sm";
  const inp2 = "w-full bg-[#05060f] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-purple-500 transition-colors text-sm";
  const lbl = "block text-gray-400 text-xs mb-1.5";

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* Nom + Email */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Nom complet</label>
          <div className="relative">
            <UserIcon />
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inp} />
          </div>
        </div>
        <div>
          <label className={lbl}>Email</label>
          <div className="relative">
            <MailIcon />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inp} />
          </div>
        </div>
      </div>

      {/* Mots de passe */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Mot de passe</label>
          <div className="relative">
            <LockIcon />
            <input type="password" name="password" value={formData.password} onChange={handleChange} required className={inp} />
          </div>
        </div>
        <div>
          <label className={lbl}>Confirmer</label>
          <div className="relative">
            <LockIcon />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className={inp} />
          </div>
        </div>
      </div>

      {/* Rôle + Filière */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>Profil</label>
          <select name="role" value={formData.role} onChange={handleChange} className={inp2}>
            <option value="etudiant">Étudiant</option>
            <option value="recruteur">Recruteur</option>
          </select>
        </div>
        <div>
          <label className={lbl}>Filière</label>
          <input type="text" name="filiere" value={formData.filiere} onChange={handleChange} placeholder="Informatique" className={inp2} />
        </div>
      </div>

      {/* CGU */}
      <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
        <input type="checkbox" required className="accent-purple-600 w-4 h-4" />
        <span>J'accepte les conditions d'utilisation</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 py-3.5 rounded-xl font-bold text-white text-sm hover:bg-purple-700 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Création en cours…' : 'Créer mon compte'}
      </button>
    </form>
  );
}

// ── Formulaire de connexion (auto-contenu, sans navigate) ────────────────────
function InlineLoginForm({ onSuccess }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData);
      onSuccess(); // → ferme tout
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full bg-[#0b0e1a] border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500 transition-colors text-sm";

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error && (
        <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}
      <div>
        <label className="block text-gray-400 mb-2 text-xs">Adresse e-mail</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="exemple@email.com" className={inp} />
      </div>
      <div>
        <label className="block text-gray-400 mb-2 text-xs">Mot de passe</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" className={inp} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {loading ? 'Connexion…' : 'Se connecter'}
        {!loading && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        )}
      </button>
    </form>
  );
}

// ── Overlay modal générique ───────────────────────────────────────────────────
function ModalOverlay({ children, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="animate-modal w-full flex items-center justify-center">
        {children}
      </div>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(20px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        .animate-modal > * { animation: modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>
    </div>
  );
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function UnlockExperience() {
  // 'idle' | 'register' | 'compte' | 'login'
  const [step, setStep] = useState('idle');

  const features = [
    {
      text: "Favoris et historique",
      svg: (
        <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      text: "Alertes nouveautés",
      svg: (
        <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      text: "Recommandations IA",
      svg: (
        <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      text: "Gestion des candidatures",
      svg: (
        <svg className="w-4 h-4 text-[#8b5cf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* ── Section ── */}
      <section className="py-14 antialiased font-sans select-none">
        <div className="w-full bg-[#110935] border border-purple-500/10 rounded-[28px] flex flex-col md:flex-row items-stretch justify-between relative overflow-hidden min-h-[380px] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

          {/* Partie gauche */}
          <div className="flex-1 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6 z-10 max-w-full md:max-w-[55%]">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Débloquez toute l'expérience
              </h2>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed font-normal">
                Créez un compte gratuitement pour sauvegarder vos recherches, recevoir des recommandations personnalisées et ne manquer aucune opportunité.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 pt-1">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-950/40 border border-purple-500/20 flex items-center justify-center shrink-0">
                    {feat.svg}
                  </div>
                  <span className="text-gray-300 font-medium text-xs lg:text-sm tracking-wide">
                    {feat.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep('register')}
                className="inline-block bg-[#582be8] hover:bg-[#4c22cc] text-white text-sm lg:text-base font-bold px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg shadow-purple-950/50"
              >
                Créer mon compte
              </button>
            </div>
          </div>

          {/* Partie droite : image */}
          <div
            className="hidden md:block w-[45%] lg:w-[48%] bg-cover bg-center relative"
            style={{ backgroundImage: "url('/src/assets/images/image.png')" }}
          >
            <div className="absolute inset-y-0 -left-1 w-24 bg-gradient-to-r from-[#110935] via-[#110935]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Modal : Formulaire d'inscription ── */}
      {step === 'register' && (
        <ModalOverlay onClose={() => setStep('idle')}>
          <div className="relative bg-[#0b0e1a] border border-purple-500/20 rounded-[28px] p-8 md:p-10 w-full max-w-2xl shadow-2xl shadow-purple-950/40">
            <CloseIcon onClick={() => setStep('idle')} />

            {/* En-tête */}
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-white">Créer un compte</h2>
              <p className="text-gray-400 text-sm mt-1">Rejoignez FilièreConnect gratuitement</p>
            </div>

            <InlineRegisterForm onSuccess={() => setStep('compte')} />
          </div>
        </ModalOverlay>
      )}

      {/* ── Modal : Compte créé (CompteModal) ── */}
      <CompteModal
        isOpen={step === 'compte'}
        onClose={() => setStep('login')}
      />

      {/* ── Modal : Formulaire de connexion ── */}
      {step === 'login' && (
        <ModalOverlay onClose={() => setStep('idle')}>
          <div className="relative bg-[#0b0e1a] border border-purple-500/20 rounded-[28px] p-8 md:p-10 w-full max-w-md shadow-2xl shadow-purple-950/40">
            <CloseIcon onClick={() => setStep('idle')} />

            {/* En-tête */}
            <div className="mb-7 text-center">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-white">Connexion</h2>
              <p className="text-gray-400 text-sm mt-1">Bienvenue ! Connectez-vous pour continuer</p>
            </div>

            <InlineLoginForm onSuccess={() => { setStep('idle'); window.location.reload(); }} />
          </div>
        </ModalOverlay>
      )}
    </>
  );
}