import React from 'react';
// Vérifie bien ces chemins en fonction de là où se trouvent tes fichiers

import ContactLayout from '../components/contact/ContactLayout';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05060f]">
      {/* Conteneur pour centrer et aligner la Navbar et le Contenu */}
      <div className="max-w-7xl mx-auto px-6">
        
        <ContactLayout />
      </div>
      
     
    </div>
  );
}