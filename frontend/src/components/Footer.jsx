export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-900/60 bg-[#040817] text-gray-400 font-sans antialiased select-none">
      <div className="max-w-[1450px] mx-auto py-12 px-2">
        
        {/* Grille Principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Colonne 1 : Logo & Description */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-900/20">
                R
              </div>
              <span className="text-white font-black text-xl tracking-tight">
                RecherUp<span className="text-purple-500">.</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              La plateforme de référence pour découvrir, comparer et postuler au sein des meilleures entreprises et filières en Afrique de l'Ouest.
            </p>
            
            {/* Réseaux Sociaux */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="p-2 rounded-lg bg-gray-900/50 hover:bg-purple-950/30 text-gray-500 hover:text-purple-400 border border-gray-800/40 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900/50 hover:bg-purple-950/30 text-gray-500 hover:text-purple-400 border border-gray-800/40 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.317 2.25c-5.384 0-9.75 4.366-9.75 9.75 0 4.307 2.792 7.96 6.663 9.25.488.09.667-.212.667-.47 0-.232-.009-.846-.014-1.662-2.712.589-3.284-1.307-3.284-1.307-.444-1.128-1.085-1.428-1.085-1.428-.885-.605.067-.593.067-.593.979.069 1.494 1.005 1.494 1.005.87 1.49 2.285 1.059 2.842.81.088-.63.34-1.059.62-1.302-2.165-.246-4.441-1.083-4.441-4.82 0-1.065.38-1.936 1.005-2.618-.1-.246-.435-1.238.096-2.581 0 0 .82-.262 2.684 1.002A9.352 9.352 0 0112 6.812c.85.004 1.705.115 2.504.337 1.864-1.264 2.682-1.002 2.682-1.002.533 1.343.198 2.335.1 2.581.626.682 1.003 1.553 1.003 2.618 0 3.747-2.28 4.571-4.453 4.813.35.302.663.899.663 1.812 0 1.308-.012 2.364-.012 2.685 0 .261.176.565.673.469C18.962 19.957 21.75 16.307 21.75 12c0-5.384-4.366-9.75-9.75-9.75z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Plateforme */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Plateforme</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Entreprises</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Filières</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Recommandations IA</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Offres de stage</a></li>
            </ul>
          </div>

          {/* Colonne 3 : Entreprises */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Entreprises</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Ajouter une boîte</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Formules Premium</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Espace Recruteur</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ Support</a></li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Restez connecté</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Inscrivez-vous pour recevoir les alertes des nouvelles boîtes qui recrutent.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-[#0d1326] border border-gray-800 text-xs text-white placeholder-gray-600 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-purple-600/50 transition-all"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center shrink-0">
                ➔
              </button>
            </form>
          </div>

        </div>

        {/* Barre du Bas / Droits d'auteur */}
        <div className="pt-8 border-t border-gray-900/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-medium">
          <p>© {new Date().getFullYear()} Annuaire Inc. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Confidentialité</a>
          </div>
        </div>

      </div>
    </footer>
  );
}