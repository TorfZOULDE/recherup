import React from 'react';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section className="w-full py-20 bg-[#05060f] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-12">Parlons de votre avenir</h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}