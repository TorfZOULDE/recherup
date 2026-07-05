import { useState } from "react";
import { User, Briefcase, Handshake, ShieldCheck, Search } from "lucide-react";
import { FAQCard } from "../components/faq/FAQCard";
import { FAQAccordion } from "../components/faq/FAQAccordion";
import { FAQContactBlock } from "../components/faq/FAQContactBlock";
import ContactModal from "../components/contact/ContactModal";

// ─────────────────────────────────────────────────────────────
// DONNÉES STATIQUES — à remplacer plus tard par un appel API :
//
//   useEffect(() => {
//     api.get('/faq').then(res => setFaqData(res.data));
//   }, []);
//
// ─────────────────────────────────────────────────────────────
const FAQ_DATA = {
  candidats: [
    {
      q: "Comment postuler à une offre de stage ?",
      a: "Cliquez sur l'offre qui vous intéresse, puis sur le bouton 'Postuler'. Vous devrez avoir complété votre profil au préalable pour que votre candidature soit visible par le recruteur."
    },
    {
      q: "Mon profil est-il visible par tous ?",
      a: "Non. Vous pouvez gérer la visibilité de votre profil depuis vos paramètres de confidentialité. Vous choisissez qui peut voir vos informations."
    },
    {
      q: "Comment modifier mes informations personnelles ?",
      a: "Rendez-vous dans votre espace 'Mon profil' accessible depuis la navbar. Vous pourrez y modifier votre nom, votre filière, votre photo et vos autres informations."
    },
    {
      q: "Comment trouver un stage adapté à ma filière ?",
      a: "Utilisez la barre de recherche ou le filtre par filière sur la page Entreprises. Vous pouvez aussi activer les alertes pour être notifié des nouvelles offres correspondant à votre profil."
    }
  ],
  entreprises: [
    {
      q: "Comment publier une offre de stage ?",
      a: "Depuis votre espace entreprise, cliquez sur 'Nouvelle offre' et remplissez les détails du poste : intitulé, durée, filières ciblées, rémunération. L'offre sera visible après validation."
    },
    {
      q: "Quels sont les avantages de FilièreConnect ?",
      a: "Vous accédez à une base de talents vérifiés avec des outils de filtrage avancés par filière, compétences et disponibilité. Vous réduisez ainsi le temps de recrutement."
    },
    {
      q: "Comment contacter un candidat ?",
      a: "Une fois qu'un candidat postule à votre offre, vous recevez une notification. Vous pouvez alors accéder à son profil complet et le contacter directement via la messagerie interne."
    }
  ],
  partenaires: [
    {
      q: "Comment devenir partenaire ou sponsor ?",
      a: "Contactez notre équipe commerciale via le formulaire de contact en bas de cette page. Nous vous proposerons une formule adaptée à votre structure et vos objectifs."
    },
    {
      q: "Quelles sont les formules de partenariat disponibles ?",
      a: "Nous proposons plusieurs niveaux : partenaire médias, partenaire école, sponsor événementiel. Chaque formule inclut une visibilité sur la plateforme et lors de nos événements."
    }
  ],
  compte: [
    {
      q: "Comment sécuriser mon compte ?",
      a: "Utilisez un mot de passe fort et unique. L'authentification à deux facteurs sera bientôt disponible. En attendant, ne partagez jamais vos identifiants."
    },
    {
      q: "J'ai oublié mon mot de passe, que faire ?",
      a: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Un lien de réinitialisation vous sera envoyé par e-mail dans les minutes qui suivent."
    },
    {
      q: "Comment supprimer mon compte ?",
      a: "La suppression de compte se fait depuis les paramètres de votre profil, section 'Compte'. Cette action est irréversible et supprime toutes vos données."
    }
  ]
};

const CATEGORIES = [
  { key: "candidats",   icon: User,        title: "Candidats",   desc: "Étudiants & Talents" },
  { key: "entreprises", icon: Briefcase,   title: "Entreprises", desc: "Recrutement" },
  { key: "partenaires", icon: Handshake,   title: "Partenaires", desc: "Sponsoring" },
  { key: "compte",      icon: ShieldCheck, title: "Compte",      desc: "Sécurité" },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("candidats");
  const [search, setSearch]               = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Filtrage par recherche
  const filtered = FAQ_DATA[activeCategory].filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  const activeLabel = CATEGORIES.find((c) => c.key === activeCategory)?.title;

  return (
    <div className="min-h-screen bg-[#05060f] py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full mb-5">
            Centre d'aide
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Questions <span className="text-purple-500">fréquentes</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Trouvez rapidement les réponses à vos questions selon votre profil.
          </p>
        </div>

        {/* ── Barre de recherche ── */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher une question…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0b0e1a] border border-white/10 text-white placeholder-gray-500 pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-purple-500 transition-colors text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* ── Catégories ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {CATEGORIES.map(({ key, icon, title, desc }) => (
            <div
              key={key}
              onClick={() => { setActiveCategory(key); setSearch(""); }}
              className={`cursor-pointer transition-all ${activeCategory === key ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#05060f]" : ""}`}
            >
              <FAQCard icon={icon} title={title} desc={desc} onClick={() => {}} />
            </div>
          ))}
        </div>

        {/* ── Accordéons ── */}
        <div className="bg-[#0b0e1a] rounded-3xl p-8 border border-white/10 min-h-[200px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white capitalize">{activeLabel}</h2>
            <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {filtered.length} question{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <FAQAccordion key={index} question={item.q} answer={item.a} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">Aucune question ne correspond à votre recherche.</p>
              <button
                onClick={() => setSearch("")}
                className="mt-3 text-purple-400 text-sm hover:text-purple-300 transition-colors"
              >
                Effacer la recherche
              </button>
            </div>
          )}
        </div>

        {/* ── Bloc contact ── */}
        <FAQContactBlock onOpenContact={() => setIsContactOpen(true)} />

        {/* ── Modal contact ── */}
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </div>
  );
}