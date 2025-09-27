import { useEffect, useState } from "react";
import AdCard from "../components/AdCard";
import { Ad } from "../components/types";

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/ads");
        if (!res.ok) throw new Error("Błąd sieci przy pobieraniu ogłoszeń");
        const data: Ad[] = await res.json();
        setAds(data);
      } catch (err) {
        console.error("Błąd pobierania ogłoszeń:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const filteredAds = ads
    .filter((ad) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (ad) => selectedBrands.length === 0 || selectedBrands.includes(ad.brand)
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Ogłoszenia</h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Szukaj ogłoszenia..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => {}}
        >
          Szukaj
        </button>
      </div>

      {/* Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Marka</h4>
          {["Toyota", "BMW", "Audi", "Mercedes", "Ford"].map((brand) => (
            <label key={brand} className="flex items-center gap-2 mb-1 text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </aside>

        {/* Ads Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                  />
                ))}
            </div>
          ) : filteredAds.length === 0 ? (
            <p>Brak ogłoszeń do wyświetlenia.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
