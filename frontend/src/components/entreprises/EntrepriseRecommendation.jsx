export default function EntrepriseRecommendation() {
  return (
    <div className="w-full bg-gradient-to-r from-[#0d1632] via-[#090f24] to-[#0d1632] border border-cyan-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_0_30px_rgba(6,182,212,0.06)] mb-8">
      
      {/* Partie Gauche : Icône Puce IA + Phrase personnalisée */}
      <div className="flex items-center gap-4">
        {/* Boîtier de la puce IA rétroéclairé bleu */}
        <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] shrink-0 animate-pulse">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        </div>
        
        {/* Texte dynamique */}
        <div className="space-y-0.5">
          <h3 className="text-white font-extrabold text-base tracking-tight">
            Recommandé pour vous
          </h3>
          <p className="text-gray-400 text-xs md:text-sm">
            Basé sur votre filière <span className="text-blue-400 font-bold">Informatique</span> et votre profil, nous avons trouvé ces entreprises.
          </p>
        </div>
      </div>

      {/* Petit témoin lumineux ou puce de status à droite */}
      <div className="hidden md:flex items-center gap-2 bg-[#06182c]/60 px-3 py-1.5 rounded-lg border border-cyan-500/20 text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
        Analyse active
      </div>

    </div>
  );
}