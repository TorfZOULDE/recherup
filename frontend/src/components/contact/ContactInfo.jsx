import React from 'react';

const Icon = ({ d }) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
    <path d={d} />
  </svg>
);

const infoItems = [
  { 
    d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7-10-7", 
    label: "Email", 
    value: "contact@filiereconnect.com", 
    href: "mailto:contact@filiereconnect.com" 
  },
  { 
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", 
    label: "WhatsApp", 
    value: "+229 01 69 72 16 30", 
    href: "https://wa.me/2290169721630" 
  },
  { 
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", 
    label: "Adresse", 
    value: "Cotonou, Bénin", 
    href: "https://maps.google.com/?q=Cotonou,Bénin" 
  },
  { 
    d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83", 
    label: "Horaires", 
    value: "Lun-Sam 8h-18h", 
    href: null 
  }
];

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      {infoItems.map((item, i) => (
        <div key={i} className="relative group">
          {item.href ? (
            <a 
              href={item.href} 
              target={item.href.startsWith('http') ? "_blank" : undefined} 
              rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
              className="absolute inset-0 z-10"
              aria-label={item.label}
            />
          ) : null}
          
          <div className="bg-[#0c1020] border border-gray-800 p-6 rounded-2xl flex flex-col items-center text-center transition-all group-hover:border-purple-500 group-hover:shadow-lg">
            <div className="mb-4"><Icon d={item.d} /></div>
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">{item.label}</p>
            <p className="text-white text-base font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}