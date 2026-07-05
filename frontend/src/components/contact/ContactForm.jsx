import React, { useState } from 'react';
import SuccesModal from '../SuccesModal';

export default function ContactForm({ onClose }) {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'loading' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'support', ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue.');
        setStatus('error');
        return;
      }

      setStatus(null);
      setShowSuccess(true);

    } catch (err) {
      setErrorMsg('Impossible de joindre le serveur.');
      setStatus('error');
    }
  };

  return (
    <>
      <div className="bg-[#0c1020] border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-black text-white mb-8">Envoyez-nous un message</h2>

        {status === 'error' && (
          <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-xl text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMsg}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              required
              placeholder="Nom complet"
              className="w-full bg-[#05060f] border border-gray-700 rounded-xl py-4 pl-12 pr-5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Adresse email"
              className="w-full bg-[#05060f] border border-gray-700 rounded-xl py-4 pl-12 pr-5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <svg className="absolute left-4 top-4 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
            </svg>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Décrivez votre besoin..."
              rows={6}
              className="w-full bg-[#05060f] border border-gray-700 rounded-xl py-4 pl-12 pr-5 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
          >
            {status === 'loading' ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Envoyer le message
              </>
            )}
          </button>
        </form>
      </div>

      {/* SuccessModal — s'affiche par-dessus tout, se ferme seul après 4s */}
      <SuccesModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          onClose(); // ferme aussi le formulaire derrière
        }}
        title="Message envoyé ! 💜"
        message={
          <>
            Merci pour votre message.<br /><br />
            Notre équipe vous répondra dans les plus brefs délais,
            généralement en moins de 24 heures.
          </>
        }
      />
    </>
  );
}