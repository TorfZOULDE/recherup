import React from 'react';

export default function ContactCard({ label, value }) {
  return (
    <div className="bg-[#0c1020] border border-gray-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-300">
      <p className="text-gray-500 text-sm mb-2 uppercase tracking-wider">{label}</p>
      <p className="font-bold text-lg text-white">{value}</p>
    </div>
  );
}