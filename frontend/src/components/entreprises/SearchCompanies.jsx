// src/components/entreprises/SearchCompanies.jsx
import { useState } from "react";
import SearchResults from "./SearchResults";

export default function SearchCompanies() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Ici tu peux déclencher la recherche API si besoin
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10">
      {/* Barre de recherche */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une entreprise, ville ou domaine..."
          className="flex-1 px-4 py-3 rounded-lg bg-[#0f1330] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition"
        >
          Rechercher
        </button>
      </form>

      {/* Résultats */}
      {query && <SearchResults query={query} />}
    </div>
  );
}
