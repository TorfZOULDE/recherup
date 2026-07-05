import { useNavigate } from "react-router-dom";

const iconColors = [
  "text-indigo-400", "text-pink-400", "text-blue-400",
  "text-teal-400", "text-amber-400", "text-emerald-400",
];

const DefaultIcon = ({ name, colorClass }) => (
  <div className={`w-6 h-6 flex items-center justify-center font-black text-lg ${colorClass}`}>
    {name?.charAt(0)?.toUpperCase() || "F"}
  </div>
);

export default function FiliereCard({ id, title, count, desc, icon, colorIdx = 0, isHighlighted = false }) {
  const navigate = useNavigate();
  const colorClass = iconColors[colorIdx % iconColors.length];

  return (
    <div
      className={`bg-[#070b19]/80 border-2 rounded-2xl p-7 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:-translate-y-2 hover:bg-[#0c132e] hover:border-purple-500/50 group cursor-pointer relative overflow-hidden
        ${isHighlighted ? "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]" : "border-gray-800/60"}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="space-y-5 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="w-12 h-12 bg-[#0e1630] rounded-xl border border-gray-800/80 flex items-center justify-center shadow-inner group-hover:border-cyan-500/30 group-hover:bg-[#121c3e] transition-all duration-300">
            {icon ? icon : <DefaultIcon name={title} colorClass={colorClass} />}
          </div>
          <span className="bg-[#10162e] text-gray-400 group-hover:text-cyan-300 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-800/40 tracking-wide transition-colors">
            {count ?? "—"}
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="text-white font-black text-xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all">
            {title}
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed max-w-[95%] font-medium">
            {desc || "Découvrez les entreprises de ce domaine."}
          </p>
        </div>
      </div>

      <div className="w-full flex justify-end mt-6">
        <button
          onClick={() => navigate(`/entreprises?filiere=${id}`)}
          className="bg-[#161f38] hover:bg-[#582be8] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl border border-gray-800 hover:border-transparent transition-all duration-200 flex items-center gap-2 group/btn cursor-pointer shadow-md"
        >
          <span>Découvrir</span>
          <svg className="w-4 h-4 text-cyan-400 group-hover/btn:text-white transition-transform duration-200 transform group-hover/btn:translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
