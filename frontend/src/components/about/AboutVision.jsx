import React from "react";

export default function AboutVision() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 py-12 select-none">
      {/* Titre de la Section */}
      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight pl-2">
        Notre vision
      </h2>
      
      {/* --- BANDEAU HORIZONTAL AVEC L'IMAGE DEPUIS LE DOSSIER PUBLIC --- */}
      <div 
        className="w-full min-h-[320px] md:min-h-[260px] rounded-3xl border border-purple-500/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url('/africa_vision.png')` }}
      >
        {/* Overlay sombre progressif à gauche pour garantir un contraste parfait du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030614] via-[#040920]/80 to-transparent z-0"></div>

        {/* Halo néon violet supplémentaire pour rappeler l'ambiance lumineuse */}
        <div className="absolute left-0 top-0 w-[300px] h-full bg-purple-600/10 blur-[100px] pointer-events-none z-0"></div>

        {/* --- CONTENU TEXTUEL REHAUSSÉ --- */}
        <div className="w-full max-w-2xl px-8 md:px-12 py-8 relative z-10 space-y-4">
          <p className="text-white font-black text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wide drop-shadow-[0_4px_12px_rgba(3,6,20,0.8)]">
            Nous voulons devenir la référence africaine pour la découverte d'opportunités professionnelles et académiques.
          </p>
        </div>

        {/* Petite décoration particule SVG discrète tout en haut à droite */}
        <div className="absolute top-6 right-8 text-cyan-400/40 opacity-70 animate-pulse hidden md:block">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
      </div>
    </div>
  );
}