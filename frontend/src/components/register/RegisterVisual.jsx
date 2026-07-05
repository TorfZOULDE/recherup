export default function RegisterVisual() {
  return (
    <div className="flex flex-col justify-center h-full p-12 text-white">
      <h1 className="text-6xl font-bold mb-6 leading-tight">Rejoignez<br/>FilièreConnect</h1>
      <p className="text-gray-400 mb-10 text-lg">Créez votre compte et accédez à des opportunités adaptées à votre filière.</p>
      
      {/* Statistiques flottantes */}
      <div className="space-y-4">
        {[ { n: "+5000", t: "entreprises" }, { n: "+200", t: "filières" }, { n: "+10000", t: "utilisateurs" } ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md w-48">
            <div className="text-2xl font-bold">{stat.n}</div>
            <div className="text-sm text-gray-400">{stat.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}