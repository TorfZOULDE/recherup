import React from "react";

export default function AboutHistory() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-20 py-12 select-none">
      
      {/* ================= SECTION : NOTRE HISTOIRE ================= */}
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight pl-2">
          Notre histoire
        </h2>
        
        {/* Grand conteneur horizontal Premium Glassmorphism avec lueur interne */}
        <div className="w-full bg-gradient-to-r from-[#0d1532]/90 via-[#070b19]/95 to-[#0b132d]/90 border border-gray-800/80 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Effet de lueur cyan diffuse dans le coin inférieur droit de la card */}
          <div className="absolute -bottom-10 -right-10 w-72 h-32 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none"></div>
          
          {/* Icône Livre SVG XXL avec cercle rétroéclairé progressif */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#131b3d] to-[#080d22] border border-gray-700/50 flex items-center justify-center shrink-0 shadow-[inset_0_0_15px_rgba(147,51,234,0.15)] relative">
            <div className="absolute inset-0 rounded-full bg-purple-500/5 blur-sm"></div>
            <svg className="w-9 h-9 text-purple-400 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          
          {/* Texte de l'histoire agrandi et ultra-lisible */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium tracking-wide">
            FilièreConnect est né d'un constat simple : des milliers d'étudiants talentueux
            peinent à trouver des stages ou des entreprises adaptées à leur domaine. Souvent,
            le problème n'est pas le manque de compétence, mais le manque d'information
            et de connexion. Nous avons donc créé une plateforme capable de relier
            efficacement talents et entreprises.
          </p>
        </div>
      </div>

      {/* ================= SECTION : LE PROBLEME QUE NOUS RESOLVONS ================= */}
      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight pl-2">
          Le problème que nous résolvons
        </h2>
        
        {/* Grille de 3 colonnes comme sur l'image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Carte 1 : Recherche difficile */}
          <div className="bg-gradient-to-b from-[#0b122c]/90 to-[#060a17]/95 border border-gray-800/80 rounded-2xl p-8 space-y-5 shadow-xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
            {/* Halo bleu subtil en bas à droite de la carte */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full"></div>
            
            {/* Icône Loupe SVG */}
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400 filter drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-black text-xl tracking-wide">Recherche difficile</h4>
              <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                Les étudiants passent trop de temps à chercher les bonnes entreprises.
              </p>
            </div>
          </div>

          {/* Carte 2 : Manque de connexion */}
          <div className="bg-gradient-to-b from-[#0b122c]/90 to-[#060a17]/95 border border-gray-800/80 rounded-2xl p-8 space-y-5 shadow-xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
            {/* Halo violet subtil en bas à droite de la carte */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/5 blur-2xl rounded-full"></div>
            
            {/* Icône Flèches convergentes SVG */}
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3 6-6" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-black text-xl tracking-wide">Manque de connexion</h4>
              <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                Beaucoup d'entreprises restent invisibles pour les jeunes talents.
              </p>
            </div>
          </div>

          {/* Carte 3 : Perte d'opportunités */}
          <div className="bg-gradient-to-b from-[#0b122c]/90 to-[#060a17]/95 border border-gray-800/80 rounded-2xl p-8 space-y-5 shadow-xl relative overflow-hidden group hover:border-purple-400/30 transition-all duration-300">
            {/* Halo cyan subtil en bas à droite de la carte */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/5 blur-2xl rounded-full"></div>
            
            {/* Icône Triangle d'avertissement SVG */}
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-400/90 filter drop-shadow-[0_0_6px_rgba(168,85,247,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-black text-xl tracking-wide">Perte d'opportunités</h4>
              <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed">
                Des opportunités sont perdues à cause d'un manque d'information.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}