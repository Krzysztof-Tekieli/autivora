import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import PriceBadge from "../../components/PriceBadge";
import AdDetailsCarousel from "../../components/AdDetailsCarousel";

type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  phone: string;
  images: string[];
  packageTier?: "Basic" | "Premium" | "Platyna";
  createdAt: string;
};

export default function AdDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/ads/${id}`)
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data) => setAd(data))
      .catch(() => setAd(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><p>Ładowanie...</p></Layout>;
  if (!ad) return <Layout><p>Ogłoszenie nie znalezione ❌</p></Layout>;

  return (
    
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <AdDetailsCarousel images={ad.images || []} title={ad.title} />

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{ad.title}</h1>
          <PriceBadge value={ad.price} />
        </div>

        <p className="text-sm text-gray-500">
          {ad.brand} • {ad.model} • {ad.year}
        </p>

        {ad.phone && (
          <p className="text-sm text-gray-600 font-medium">📞 {ad.phone}</p>
        )}

        <p className="text-gray-700">{ad.description}</p>

        {ad.packageTier && (
          <span
            className={`inline-block text-sm px-3 py-1 rounded-full border mt-2 ${
              ad.packageTier === "Basic"
                ? "bg-gray-100 text-gray-700 border-gray-200"
                : ad.packageTier === "Premium"
                ? "bg-amber-100 text-amber-800 border-amber-200"
                : "bg-indigo-100 text-indigo-800 border-indigo-200"
            }`}
          >
            {ad.packageTier}
          </span>
        )}
      </div>
    
  );
}
