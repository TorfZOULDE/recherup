import React, { useState } from 'react';
import ContactForm from './ContactForm';
import { useNavigate } from 'react-router-dom';

export default function ContactHeader() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-16 py-12">
        {/* Partie Texte */}
        <div className="space-y-8 max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-[1.1]">
            "Parlons de <span className="text-purple-500">votre avenir</span>"
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed">
            Une question, une suggestion ou un partenariat ? Notre équipe est là pour vous accompagner.
            <br />
            <span className="text-gray-300 font-medium">Nous répondons généralement en moins de 24 heures.</span>
          </p>

          {/* Boutons */}
          <div className="flex flex-wrap gap-6 pt-4">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Nous écrire
            </button>

            <button
              onClick={() => navigate('/faq')}
              className="flex items-center gap-3 bg-transparent border-2 border-gray-700 hover:border-gray-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Voir FAQ
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full lg:w-[450px] aspect-square rounded-[2rem] overflow-hidden border border-gray-800 shadow-2xl">
          <img
            src="contact-header.jpeg"
            alt="Support client"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060f]/60 to-transparent" />
        </div>
      </div>

      {/* Overlay modal formulaire */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(5,6,15,0.7)' }}
        >
          <div className="relative w-full max-w-2xl">
            {/* Bouton fermer */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute -top-4 -right-4 z-10 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <ContactForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
  );
}