// src/components/entreprises/SearchResults.jsx
import { useState, useEffect } from "react";
import api from "../../services/api";   // ⚠️ adapte le chemin si ton service est ailleurs
import EntrepriseCard from "./EntrepriseCard";

export default function SearchResults({ query }) {
  const [data, setData] = useState({ results: [], totalPages: 1, page: 1, total: 0 });

  const fetchResults = async (page = 1) => {
    try {
      const res = await api.get(`/companies/search?q=${query}&page=${page}`);
      setData(res.data);
    } catch (err) {
      console.error("Erreur API:", err);
    }
  };

  useEffect(() => {
    if (query !== undefined) fetchResults(1);
  }, [query]);

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      {/* Compteur résultats */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-lg font-bold">
          Résultats pour <span className="text-purple-400">"{query}"</span>
        </h2>
        <p className="text-gray-400 text-sm">
          {data.results.length} affichés sur {data.total} (page {data.page}/{data.totalPages})
        </p>
      </div>

      {/* Grille des cartes */}
      <div className="grid md:grid-cols-2 gap-6">
        {data.results.map((c) => (
          <EntrepriseCard
            key={c.id}
            name={c.name}
            domain={c.domain}
            location={c.city}
            logoUrl={c.logoUrl}
            isCompatible={c.compatibilityScore > 0}
            compatibilityScore={c.compatibilityScore || 0}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          disabled={data.page === 1}
          onClick={() => fetchResults(data.page - 1)}
          className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-40 hover:bg-purple-700 transition"
        >
          ←
        </button>

        {[...Array(data.totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => fetchResults(i + 1)}
            className={`px-4 py-2 rounded-lg font-bold transition ${
              data.page === i + 1
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-purple-700 hover:text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={data.page === data.totalPages}
          onClick={() => fetchResults(data.page + 1)}
          className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-40 hover:bg-purple-700 transition"
        >
          →
        </button>
      </div>
    </div>
  );
}
