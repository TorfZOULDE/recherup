
// Importation des sous-composants créés
import AboutHero from "../components/about/AboutHero";
import AboutHistory from "../components/about/AboutHistory";
import AboutMission from "../components/about/AboutMission";
import AboutVision from "../components/about/AboutVision";
import AboutValues from "../components/about/AboutValues";

// Importe tes images locales ici (adapte les chemins selon ton projet)
// import groupImg from "../assets/about-group.jpg";
// import africaImg from "../assets/about-africa.png";

export default function APropos() {
  return (
    <div className="min-h-screen bg-[#030614] text-white px-4 sm:px-8 md:px-10 font-sans relative antialiased overflow-x-hidden">
      
      {/* Décorations stellaires cosmiques en arrière-plan */}
      <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-purple-900/5 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-950/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1450px] mx-auto space-y-14">
        
        {/* 1. Hero Section */}
        <AboutHero groupImage={null} /> {/* Passe ton image du groupe ici en variable */}

        {/* 2. Histoire et Constats */}
        <AboutHistory />

        {/* 3. Mission et Chiffres clés */}
        <AboutMission />

        {/* 4. Vision Africaine */}
        <AboutVision africaImage={null} /> {/* Passe ton image de l'Afrique ici en variable */}

        {/* 5. Grille de Valeurs */}
        <AboutValues />

        
        
      </div>
    </div>
  );
}