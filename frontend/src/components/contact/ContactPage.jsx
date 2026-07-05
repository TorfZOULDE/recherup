import React from 'react';
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="bg-[#05060f] min-h-screen py-10 px-6 md:px-20">
      <ContactHeader />
      <ContactInfo />
      <ContactForm />
    </div>
  );
}