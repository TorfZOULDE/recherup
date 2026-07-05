import { useNavigate } from "react-router-dom";

const recommendations = [
  { label: "Informatique", fieldId: 1 },
  { label: "Cybersécurité", fieldId: 2 },
  { label: "Science des données", fieldId: 3 },
];

export default function FiliereIaBanner() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-indigo-500 rounded-3xl blur-md opacity-25 group-hover:opacity-40 transition duration-1000 pointer-events-none" />

      <div className="relative w-full bg-[#0d1530]/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.08)]">

        <div className="flex items-center gap-5 flex-1">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-md animate-ping opacity-70" />
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0c1a3a] to-[#1a123a] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] animate-pulse">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-white font-black text-lg md:text-xl tracking-tight flex items-center gap-2">
              Suggestions personnalisées
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-bounce" />
            </h3>
            <p className="text-gray-400 text-sm font-medium max-w-xl leading-relaxed">
              Notre intelligence artificielle analyse votre profil pour vous recommander les filières d'avenir les plus adaptées.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {recommendations.map((item) => (
            <button
              key={item.fieldId}
              onClick={() => navigate(`/entreprises?filiere=${item.fieldId}`)}
              className="bg-[#16224f]/60 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-transparent text-sm font-extrabold px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer active:scale-95 whitespace-nowrap"
            >
              ✨ {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
