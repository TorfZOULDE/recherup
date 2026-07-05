import React from "react";

export default function AboutMission() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 py-12 select-none">
      
      {/* Titre Principal de la Section */}
      <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight pl-2">
        Notre mission
      </h2>

      {/* --- CARTE PREMIUM GLASSMORPHISM --- */}
      <div className="w-full bg-gradient-to-br from-[#0c122c]/90 via-[#070b19]/95 to-[#091026]/90 border border-gray-800/80 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        
        {/* Lueur diffuse néon cyan caractéristique en bas à droite de la carte */}
        <div className="absolute -bottom-12 -right-12 w-80 h-36 bg-cyan-500/10 blur-[70px] rounded-full pointer-events-none"></div>
        
        {/* Icône Fusée SVG avec cercle dégradé en arrière-plan */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#141d44] to-[#080d24] border border-gray-700/40 flex items-center justify-center shrink-0 shadow-[inset_0_0_20px_rgba(59,130,246,0.15)] relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-sm"></div>
          <svg className="w-9 h-9 text-purple-400 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.96 14.96 0 01-12.12 6.16 14.96 14.96 0 016.16-12.12m5.96 5.96l-5.96-5.96m0 0L3.75 3.75" />
          </svg>
        </div>

        {/* Bloc Textuel Interne */}
        <div className="space-y-2 relative z-10">
          <span className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-500 block">
            Premium card
          </span>
          <p className="text-white font-black text-xl md:text-2xl leading-relaxed tracking-wide max-w-4xl">
            Construire le plus grand écosystème africain reliant étudiants, diplômés, professionnels et entreprises.
          </p>
        </div>
      </div>

      {/* --- GRILLE DES CHIFFRES CLÉS (STYLISÉE INDIVIDUELLEMENT) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 pt-6 text-center">
        
        {/* Compteur 1 : Entreprises */}
        <div className="space-y-2 group">
          <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-purple-600 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            +5000
          </h3>
          <p className="text-gray-400 text-sm sm:text-base font-medium tracking-wide">
            entreprises
          </p>
        </div>

        {/* Compteur 2 : Filières */}
        <div className="space-y-2 group">
          <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-600 drop-shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            +200
          </h3>
          <p className="text-gray-400 text-sm sm:text-base font-medium tracking-wide">
            filières
          </p>
        </div>

        {/* Compteur 3 : Pays Couverts */}
        <div className="space-y-2 group">
          <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-cyan-400 to-cyan-600 drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            +10
          </h3>
          <p className="text-gray-400 text-sm sm:text-base font-medium tracking-wide">
            pays couverts
          </p>
        </div>

        {/* Compteur 4 : Utilisateurs */}
        <div className="space-y-2 group">
          <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-teal-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            +10000
          </h3>
          <p className="text-gray-400 text-sm sm:text-base font-medium tracking-wide">
            utilisateurs
          </p>
        </div>

      </div>

    </div>
  );
}