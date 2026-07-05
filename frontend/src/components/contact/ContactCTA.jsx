import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactModal from './ContactModal';

export default function ContactCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="w-full py-20 px-6">
      <div 
        className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-12 md:p-24 text-center"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-3xl">
            "Construisons ensemble l'avenir du recrutement"
          </h2>
          <p className="text-gray-200 text-xl md:text-2xl font-medium">
            Aidez-nous à connecter davantage de talents et d'entreprises
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <button
              onClick={() => navigate('/entreprises')}
              className="flex items-center justify-center gap-3 bg-white text-purple-900 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              Explorer les entreprises
            </button>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all hover:scale-105"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              Nous contacter
            </button>
          </div>
        </div>

        <div className="absolute inset-0 bg-purple-900/20 mix-blend-multiply"></div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}