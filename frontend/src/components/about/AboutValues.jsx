import { Link } from "react-router-dom";

export default function Banner() {
  return (
    // La bordure dégradée (le cadre externe)
    <div className="relative p-[2px] rounded-[32px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-2xl">
      
      {/* Le conteneur interne (le fond noir avec l'image) */}
      <div className="relative w-full bg-[#0b0e1a] rounded-[30px] overflow-hidden min-h-[300px] flex items-center justify-center">
        
        {/* L'image de fond qui remplit le bloc */}
        <img 
          src="/src/assets/images/image.png" 
          alt="Recrutement" 
          className="absolute inset-0 w-full h-full object-cover opacity-60" 
        />
        
        {/* Overlay sombre pour que le texte soit lisible par-dessus l'image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1a] via-[#0b0e1a]/80 to-transparent"></div>

        {/* Le contenu (Texte + Boutons) */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Rejoignez l'avenir du recrutement
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/entreprises" 
              className="px-8 py-4 bg-white text-[#0b0e1a] font-bold rounded-xl hover:bg-gray-200 transition-all text-lg"
            >
              Explorer les entreprises
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-4 bg-[#1f2438] text-white font-bold rounded-xl hover:bg-[#2a3048] transition-all text-lg border border-white/10"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}