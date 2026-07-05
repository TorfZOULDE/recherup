export const FAQCard = ({ icon: Icon, title, desc, onClick }) => (
  <button onClick={onClick} className="bg-[#1a1230] border border-[#332454] p-6 rounded-2xl flex flex-col items-center text-center transition-all hover:border-[#a855f7] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] group">
    <div className="mb-4 text-[#a855f7] group-hover:scale-110 transition-transform"><Icon size={32} /></div>
    <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
    <p className="text-[#94a3b8] text-sm">{desc}</p>
  </button>
);