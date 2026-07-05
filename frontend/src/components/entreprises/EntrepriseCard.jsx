import { useNavigate } from 'react-router-dom';

export default function EntrepriseCard({ id, name, domain, location, isCompatible, logoSvg, compatibilityScore, canApply, contactEmail }) {
  const navigate = useNavigate();
  const canShowApply = canApply && !!contactEmail;
  return (
    <div className="bg-[#070b19]/80 border-2 border-gray-800/60 hover:border-purple-500/50 rounded-2xl p-7 flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:-translate-y-2 hover:bg-[#0c1435] group relative overflow-hidden shadow-lg">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="space-y-6 w-full">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 bg-[#101731] border border-gray-800 rounded-2xl flex items-center justify-center p-3 shrink-0 shadow-inner group-hover:border-purple-500/30 transition-colors">
            {logoSvg}
          </div>
          
          <div className="space-y-1">
            <h4 className="text-white font-black text-xl tracking-tight group-hover:text-purple-300 transition-colors">
              {name}
            </h4>
            <p className="text-gray-400 text-sm font-semibold tracking-wide">
              Domaine : <span className="text-gray-300">{domain}</span>
            </p>
            <p className="text-cyan-400 text-xs font-bold flex items-center gap-1.5 pt-1">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
        </div>
      </div>

      {/* Barre d'actions du bas */}
      <div className="flex items-center gap-4 mt-8 w-full">
        <button
          onClick={() => navigate(`/entreprises/${id}`)}
          className="flex-1 py-3.5 rounded-xl border border-gray-700 bg-transparent text-gray-300 text-sm font-extrabold hover:bg-white/[0.04] hover:text-white transition-all cursor-pointer active:scale-95 whitespace-nowrap">
          Voir détails
        </button>

        {/*
          Logique :
          - canShowApply (can_apply=1 ET email renseigné) -> lien mailto "Postuler"
          - sinon, si compatible -> badge compatibilité seul
          - sinon -> rien (juste "Voir détails" prend toute la largeur)
        */}
        {canShowApply ? (
          isCompatible ? (
            <div className="flex-1 bg-[#062424] border border-emerald-500/30 text-emerald-400 text-xs md:text-sm font-black py-3.5 rounded-xl text-center shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {compatibilityScore}% compatible
            </div>
          ) : (
            <a
              href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Candidature - ${name}`)}`}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 hover:brightness-110 text-white text-sm font-black shadow-lg shadow-purple-950/50 transition-all cursor-pointer active:scale-95 whitespace-nowrap text-center">
              Postuler
            </a>
          )
        ) : (
          isCompatible && (
            <div className="flex-1 bg-[#062424] border border-emerald-500/30 text-emerald-400 text-xs md:text-sm font-black py-3.5 rounded-xl text-center shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {compatibilityScore}% compatible
            </div>
          )
        )}
      </div>

    </div>
  );
}