import { useEffect, useState } from "react";
import AdCard from "../components/AdCard";
import { Ad } from "../components/helpers";

export default function HomePage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/ads");
        if (!res.ok) throw new Error("Błąd sieci przy pobieraniu ogłoszeń");
        const data = await res.json();
        setAds(data);
      } catch (err) {
        console.error("Błąd pobierania ogłoszeń:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Ogłoszenia</h1>
      </div>

      {loading ? (
        <p>Ładowanie ogłoszeń...</p>
      ) : ads.length === 0 ? (
        <p>Brak ogłoszeń do wyświetlenia.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}
