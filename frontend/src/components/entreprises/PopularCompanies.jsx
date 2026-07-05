// src/components/entreprises/PopularCompanies.jsx
import SearchResults from "./SearchResults";

export default function PopularCompanies() {
  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      <h2 className="text-white text-2xl font-bold mb-6">Entreprises populaires</h2>
      {/* Ici on passe une query vide pour afficher toutes les entreprises populaires */}
      <SearchResults query="" />
    </div>
  );
}
