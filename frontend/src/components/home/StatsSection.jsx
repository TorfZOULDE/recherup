export default function StatsSection() {
  const stats = [
    {
      value: "5 000+",
      label: "Entreprises",
      color: "text-purple-500",
      svg: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      value: "200+",
      label: "Filières",
      color: "text-purple-500",
      svg: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.151-.312.592-.312.743 0l3.003 6.202 6.744.757c.343.038.48.462.222.692l-4.996 4.475 1.34 6.643c.068.339-.294.602-.586.421L12 19.475l-6.046 3.218c-.292.181-.654-.082-.586-.42l1.34-6.644-4.996-4.475c-.258-.23-.122-.654.222-.692l6.744-.757 3.003-6.202z" />
        </svg>
      )
    },
    {
      value: "50 000+",
      label: "Utilisateurs",
      color: "text-blue-500",
      svg: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      value: "98%",
      label: "Satisfaction",
      color: "text-emerald-500",
      svg: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-10 my-6 antialiased font-sans select-none border-y border-gray-900/30 bg-[#040817]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center justify-center gap-4 group">
            {/* Icône avec sa couleur spécifique */}
            <div className={`${stat.color} transition-transform duration-300 group-hover:scale-105 shrink-0`}>
              {stat.svg}
            </div>

            {/* Chiffre et Label */}
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl md:text-2xl tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="text-gray-500 font-medium text-xs md:text-sm mt-1 tracking-wide">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}