export const FAQContactBlock = ({ onOpenContact }) => (
  <div className="mt-16 bg-gradient-to-r from-[#1a1230] to-[#0f0a1f] p-8 rounded-3xl border border-[#332454] text-center">
    <h3 className="text-white text-xl font-bold mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
    <p className="text-[#94a3b8] mb-6">Notre équipe est à votre disposition pour vous accompagner.</p>
    <button onClick={onOpenContact} className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-xl font-bold transition-all">
      Contacter le support
    </button>
  </div>
);