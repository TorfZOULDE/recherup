import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: "Comment ajouter une entreprise ?",
    a: "Rendez-vous sur la page Entreprises, puis cliquez sur le bouton 'Suggérer une entreprise'. Remplissez le formulaire avec le nom, le secteur et les informations de contact. Notre équipe validera votre suggestion sous 48h."
  },
  {
    q: "L'inscription est-elle obligatoire ?",
    a: "Non, vous pouvez consulter les entreprises et les filières sans compte. Cependant, l'inscription est nécessaire pour postuler à des offres, sauvegarder vos favoris et recevoir des recommandations personnalisées."
  },
  {
    q: "Comment postuler à une offre de stage ?",
    a: "Créez votre compte et complétez votre profil. Ensuite, parcourez les offres disponibles sur la page Entreprises, cliquez sur l'offre qui vous intéresse et appuyez sur 'Postuler'. Le recruteur recevra votre candidature directement."
  },
  {
    q: "Comment signaler une erreur ?",
    a: "Utilisez le formulaire de contact ci-dessus en choisissant 'Support technique'. Décrivez l'erreur rencontrée avec le plus de détails possible (page concernée, message d'erreur, navigateur utilisé). Notre équipe vous répond sous 24h."
  },
  {
    q: "Mes données personnelles sont-elles sécurisées ?",
    a: "Oui. Vos données sont stockées de manière sécurisée et ne sont jamais partagées avec des tiers sans votre consentement. Vous pouvez à tout moment modifier ou supprimer votre compte depuis vos paramètres."
  },
  {
    q: "Comment devenir partenaire de FilièreConnect ?",
    a: "Cliquez sur 'Nous écrire' et sélectionnez 'Entreprise', puis choisissez 'Devenir partenaire' comme type de demande. Notre équipe commerciale vous contactera pour discuter des formules disponibles."
  }
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="bg-[#0c1020] border border-gray-800 p-8 rounded-3xl mt-12 shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-2">Questions fréquentes</h3>
      <p className="text-gray-500 text-sm mb-8">Cliquez sur une question pour afficher la réponse.</p>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              openIndex === i
                ? 'border-purple-500 bg-[#131a35] shadow-[0_0_20px_rgba(147,51,234,0.15)]'
                : 'border-gray-800 bg-[#0c1020] hover:border-gray-600'
            }`}
          >
            {/* Question */}
            <button
              className="w-full flex justify-between items-center p-5 text-left gap-4"
              onClick={() => toggle(i)}
            >
              <span className={`font-semibold text-base transition-colors ${openIndex === i ? 'text-white' : 'text-gray-300'}`}>
                {item.q}
              </span>
              <ChevronDown
                size={20}
                className={`shrink-0 transition-transform duration-300 ${
                  openIndex === i ? 'rotate-180 text-purple-400' : 'text-gray-500'
                }`}
              />
            </button>

            {/* Réponse */}
            <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
              <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                {item.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}