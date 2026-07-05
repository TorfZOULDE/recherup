export default function EntrepriseSearch({ value, onChange }) {
  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      {/* Conteneur XXL avec lueur violette intense (Border + Shadow néon) */}
      <div className="bg-[#090d22]/90 border-2 border-purple-600/50 rounded-full p-2.5 flex items-center justify-between shadow-[0_0_50px_rgba(147,51,234,0.25)] focus-within:border-purple-500 focus-within:shadow-[0_0_60px_rgba(147,51,234,0.4)] transition-all duration-300 backdrop-blur-md">
        
        {/* Zone Input de recherche agrandie */}
        <div className="flex items-center gap-4 pl-6 flex-1">
          {/* Icône Loupe XXL */}
          <svg 
            className="w-6 h-6 text-gray-400 shrink-0" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          {/* Texte de saisie plus gros (text-base à md:text-lg) */}
          <input 
            type="text" 
            placeholder="Rechercher une entreprise, filière, domaine, ville..." 
            value={value}
            onChange={onChange}
            className="w-full bg-transparent text-base md:text-lg text-white placeholder-gray-500 focus:outline-none py-3 tracking-wide font-medium"
          />
        </div>

        {/* Grand Bouton Rechercher Éclatant (Padding et texte agrandis) */}
        <button className="bg-[#582be8] hover:bg-[#4c22cc] text-white text-base font-black px-10 py-4 rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-lg shadow-purple-950/50 tracking-wider whitespace-nowrap ml-2">
          Rechercher
        </button>
        
      </div>
    </div>
  );
}