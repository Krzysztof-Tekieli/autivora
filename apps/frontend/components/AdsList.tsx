import React, { useEffect, useState } from "react";
import AdCard from "./AdCard";

type Ad = {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  phone?: string;
  packageType?: "Basic" | "Premium" | "Platyna";
  status: string;
  expiresAt: string;
  createdAt: number; // <-- dodane
  imageUrl?: string;
};

export default function AdsList() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("http://localhost:3001/ads");
        const dataFromBackend = await res.json();

        const now = new Date();
        const activeAds = dataFromBackend
          .filter(
            (ad: any) =>
              ad.status === "ACTIVE" && new Date(ad.expiresAt) > now
          )
          .map((ad: any) => ({
            ...ad,
            createdAt: new Date(ad.createdAt).getTime(), // <-- konwersja na number
          }));

        setAds(activeAds);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <p>Ładowanie ogłoszeń...</p>;
  if (ads.length === 0) return <p>Brak aktywnych ogłoszeń.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}
