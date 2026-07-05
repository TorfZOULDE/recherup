import React from 'react';
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactFAQ from './ContactFAQ';
import SocialLinks from './SocialLinks';
import ContactCTA from './ContactCTA';

export default function ContactLayout() {
  return (
    <div className="min-h-screen bg-[#05060f] text-white py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header - Centré et aéré */}
        <div className="border-b border-gray-800 pb-12">
          <ContactHeader />
        </div>
        
        {/* Grille principale avec contrôle strict des largeurs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Colonne de gauche (Info + Formulaire) - prend 7/12 de la largeur sur desktop */}
          <div className="lg:col-span-7 space-y-12">
            <ContactInfo />
            <ContactForm />
          </div>

          {/* Colonne de droite (FAQ + Social) - prend 5/12 de la largeur */}
          <div className="lg:col-span-5 space-y-12">
            <ContactFAQ />
            <SocialLinks />
          </div>
          
        </div>

        {/* Bloc CTA pleine largeur pour conclure */}
        <div className="pt-12">
          <ContactCTA />
        </div>
        
      </div>
    </div>
  );
}