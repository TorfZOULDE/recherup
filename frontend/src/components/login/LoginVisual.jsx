export default function LoginVisual() {
  return (
    <div className="p-12 flex flex-col justify-center h-full">
      <h1 className="text-white text-5xl font-bold mb-6 leading-tight">
        "Heureux de<br/>vous revoir"
      </h1>
      <p className="text-gray-300 text-lg mb-8 max-w-md">
        Reconnectez-vous pour retrouver vos recherches, candidatures et recommandations personnalisées.
      </p>
      <div className="space-y-4">
        {['Recherches sauvegardées', 'Recommandations IA', 'Candidatures suivies'].map((text) => (
          <div key={text} className="flex items-center gap-3 bg-white/10 border border-white/20 backdrop-blur-md w-fit px-5 py-3 rounded-full text-white font-medium">
            <span className="text-cyan-400">✓</span> {text}
          </div>
        ))}
      </div>
    </div>
  );
}