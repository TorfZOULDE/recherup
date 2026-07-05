import { useState } from 'react';
import api from '../services/api';
import SuccessModal from './SuccessModal';

const EMPTY = { company_name: '', city: '', domain: '', contact_email: '' };

// ── Icônes SVG ────────────────────────────────────────────────
function IconClose({ onClick }) {
  return (
    <button onClick={onClick}
      className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all">
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  );
}
function IconBack({ onClick }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 text-xs font-semibold mb-3 transition-colors">
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
      </svg>
      Retour
    </button>
  );
}
function IconBuilding() {
  return (
    <svg className="abs-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
    </svg>
  );
}
function IconCity() {
  return (
    <svg className="abs-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  );
}
function IconDomain() {
  return (
    <svg className="abs-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}
function IconMail() {
  return (
    <svg className="abs-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
    </svg>
  );
}

// ── Champ avec icône ──────────────────────────────────────────
function Field({ label, icon, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-purple-400/70">
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

const inp = "w-full bg-[#0a0d1a] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/15 transition-all";

export default function SuggestionPopup({ onClose }) {
  const [step, setStep]         = useState('choice');
  const [form, setForm]         = useState(EMPTY);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const source_type = step === 'company' ? 'company' : 'user';
      await api.post('/suggestions', { ...form, source_type });
      setShowModal(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la soumission.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => { setStep('choice'); setForm(EMPTY); setError(''); };

  return (
    <>
      <SuccessModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); onClose(); }}
        onContinue={() => { setShowModal(false); onClose(); }}
        title="Merci pour votre suggestion 💜"
        message="Votre contribution aide toute la communauté. Notre équipe analysera les informations soumises avant validation."
      />

      <div className="relative bg-[#070b19] border border-purple-500/20 rounded-[28px] p-8 w-full max-w-lg shadow-2xl shadow-purple-950/40">

        {/* Glow déco */}
        <div className="pointer-events-none absolute -top-16 -left-16 w-56 h-56 rounded-full bg-purple-600/10 blur-3xl" />

        {/* Fermer */}
        <IconClose onClick={onClose} />

        {/* ── CHOIX ── */}
        {step === 'choice' && (
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-4">
              Proposer une entreprise
            </span>
            <h2 className="text-2xl font-extrabold text-white mb-1">Qui êtes-vous ?</h2>
            <p className="text-gray-500 text-sm mb-8">Choisissez votre profil pour adapter le formulaire.</p>

            <div className="grid grid-cols-1 gap-4">
              {/* Étudiant */}
              <button onClick={() => setStep('user')}
                className="group flex items-center gap-5 bg-white/[0.03] hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/40 rounded-2xl p-5 text-left transition-all duration-200">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-purple-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-base mb-0.5 group-hover:text-purple-300 transition-colors">
                    Étudiant / Utilisateur
                  </p>
                  <p className="text-gray-500 text-sm">Je connais une entreprise et je veux la suggérer</p>
                </div>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-600 group-hover:text-purple-400 transition-colors shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>

              {/* Entreprise */}
              <button onClick={() => setStep('company')}
                className="group flex items-center gap-5 bg-white/[0.03] hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/40 rounded-2xl p-5 text-left transition-all duration-200">
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-blue-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-base mb-0.5 group-hover:text-blue-300 transition-colors">
                    Représentant d'entreprise
                  </p>
                  <p className="text-gray-500 text-sm">Je veux inscrire mon entreprise sur la plateforme</p>
                </div>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-600 group-hover:text-blue-400 transition-colors shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── FORMULAIRE UTILISATEUR ── */}
        {step === 'user' && (
          <form onSubmit={handleSubmit}>
            <IconBack onClick={goBack} />
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-4">
              Étudiant / Utilisateur
            </span>
            <h2 className="text-2xl font-extrabold text-white mb-1">Je connais une entreprise</h2>
            <p className="text-gray-500 text-sm mb-7">Remplis ce que tu sais — pas besoin d'avoir toutes les infos.</p>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <Field label="Nom de l'entreprise *" icon={<IconBuilding />}>
                <input type="text" name="company_name" value={form.company_name}
                  onChange={handleChange} placeholder="Ex : Orange Bénin" required className={inp} />
              </Field>

              <Field label="Ville *" icon={<IconCity />}>
                <input type="text" name="city" value={form.city}
                  onChange={handleChange} placeholder="Ex : Cotonou" required className={inp} />
              </Field>

              <Field label="Domaine / Secteur *" icon={<IconDomain />}>
                <input type="text" name="domain" value={form.domain}
                  onChange={handleChange} placeholder="Ex : Télécommunications" required className={inp} />
              </Field>

              <Field label="Email de contact (optionnel)" icon={<IconMail />}>
                <input type="email" name="contact_email" value={form.contact_email}
                  onChange={handleChange} placeholder="contact@entreprise.com" className={inp} />
              </Field>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-purple-900/40 disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm">
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><IconSend /><span>Envoyer ma suggestion</span></>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ── FORMULAIRE ENTREPRISE ── */}
        {step === 'company' && (
          <form onSubmit={handleSubmit}>
            <IconBack onClick={goBack} />
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
              Représentant d'entreprise
            </span>
            <h2 className="text-2xl font-extrabold text-white mb-1">Inscrivez votre entreprise</h2>
            <p className="text-gray-500 text-sm mb-7">Remplissez les informations officielles de votre entreprise.</p>

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <Field label="Nom officiel de l'entreprise *" icon={<IconBuilding />}>
                <input type="text" name="company_name" value={form.company_name}
                  onChange={handleChange} placeholder="Ex : Nextmux SARL" required className={inp} />
              </Field>

              <Field label="Ville / Siège social *" icon={<IconCity />}>
                <input type="text" name="city" value={form.city}
                  onChange={handleChange} placeholder="Ex : Cotonou" required className={inp} />
              </Field>

              <Field label="Secteur d'activité *" icon={<IconDomain />}>
                <input type="text" name="domain" value={form.domain}
                  onChange={handleChange} placeholder="Ex : Informatique & Services" required className={inp} />
              </Field>

              <Field label="Email officiel de contact *" icon={<IconMail />}>
                <input type="email" name="contact_email" value={form.contact_email}
                  onChange={handleChange} placeholder="contact@entreprise.com" required className={inp} />
              </Field>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/40 disabled:opacity-50 disabled:cursor-not-allowed mt-2 text-sm">
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><IconSend /><span>Soumettre mon entreprise</span></>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}