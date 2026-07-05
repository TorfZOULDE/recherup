import { useState, useEffect, useCallback } from "react";
import HeroSection from "../components/home/HeroSection";
import ActionCards from "../components/home/ActionCards";
import BrowseCategories from "../components/home/BrowseCategories";
import PopularCompanies from "../components/home/PopularCompanies";
import StatsSection from "../components/home/StatsSection";
import UnlockExperience from "../components/home/UnlockExperience";
import AddCompanyForm from "../components/home/AddCompanyForm";
import api from "../services/api";

export default function Home() {
  const [searchQuery, setSearchQuery]     = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching]         = useState(false);

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    try {
      const { data } = await api.get(`/companies/home-search?q=${encodeURIComponent(q.trim())}`);
      setSearchResults(data);
    } catch (e) {
      console.error(e);
      setSearchResults({ fields: [], companies: [] });
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => doSearch(searchQuery), 400);
    return () => clearTimeout(t);
  }, [searchQuery, doSearch]);

  const isSearching = !!searchQuery.trim();

  // Pendant la recherche on garde les anciens résultats
  // jusqu'à ce que les nouveaux arrivent
  const fields    = isSearching ? (searchResults?.fields    ?? null) : null;
  const companies = isSearching ? (searchResults?.companies ?? null) : null;

  return (
    <div className="min-h-screen bg-[#040817] text-white px-4 sm:px-8 md:px-10 overflow-x-hidden">
      <div className="max-w-[1450px] mx-auto space-y-6">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => doSearch(searchQuery)}
          searching={searching}
        />
        <ActionCards />
        <BrowseCategories
          searchFields={fields}
          isSearching={isSearching}
          searching={searching}
        />
        <PopularCompanies
          searchCompanies={companies}
          isSearching={isSearching}
          searching={searching}
        />
        <StatsSection />
        <UnlockExperience />
        <AddCompanyForm />
      </div>
    </div>
  );
}