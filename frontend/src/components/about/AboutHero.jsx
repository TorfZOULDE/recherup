import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth.service";

let localGroupImage;
try {
  localGroupImage = require("../assets/images/image copy 3.png");
} catch (e) {
  localGroupImage = "/src/assets/images/image copy 3.png";
}

export default function AboutHero() {
  const navigate = useNavigate();
  const connected = isAuthenticated();

  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800";
  };

  const handleCTA = () => {
    navigate(connected ? '/entreprises' : '/register');
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center py-10 md:py-16 lg:py-24 relative select-none">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-purple-600/5 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* GAUCHE */}
      <div className="lg:col-span-6 space-y-6 md:space-y-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
          "Connecter les{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#3b82f6] to-[#06b6d4]">
            talents
          </span>{" "}
          aux bonnes opportunités"
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-medium max-w-2xl">
          Chez FilièreConnect, nous croyons qu'aucun étudiant ne devrait perdre une opportunité
          simplement parce qu'il ne connaît pas les bonnes entreprises.
        </p>

        <div className="pt-1">
          <button
            onClick={handleCTA}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] hover:from-[#5a52e6] hover:to-[#4f93f6] text-white text-base font-black px-8 py-4 md:px-10 md:py-5 rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] cursor-pointer active:scale-95">
            <span>{connected ? 'Explorer les entreprises' : 'Découvrir la plateforme'}</span>
            <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* DROITE */}
      <div className="lg:col-span-6 flex justify-center items-center relative z-10 mt-4 lg:mt-0">
        <div className="absolute w-[85%] h-[85%] bg-gradient-to-tr from-[#06b6d4]/15 via-[#a855f7]/20 to-transparent blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 border-[2px] border-purple-500/40 rounded-[2.5rem] rotate-[4deg] scale-[1.04] pointer-events-none" />
        <div className="absolute inset-0 border border-cyan-400/30 rounded-[2.5rem] -rotate-[3deg] scale-[1.02] pointer-events-none" />

        <div className="w-full rounded-[2rem] overflow-hidden border-2 border-gray-800/80 bg-[#070b19] shadow-2xl relative z-10">
          <img
            src={localGroupImage}
            onError={handleImageError}
            alt="Étudiants FilièreConnect"
            className="w-full h-auto object-cover max-h-[300px] sm:max-h-[400px] md:max-h-[460px]"
          />
        </div>
      </div>

    </section>
  );
}