import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-[#11172b] rounded-2xl p-2 w-full max-w-xl">
      <input
        type="text"
        placeholder="Rechercher par filière, domaine ou entreprise..."
        className="flex-1 bg-transparent outline-none px-4 text-gray-300"
      />

      <button className="bg-purple-600 p-3 rounded-xl">
        <Search size={20} />
      </button>
    </div>
  );
}