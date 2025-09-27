// pages/ad/[id].tsx
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import PriceBadge from "../../components/PriceBadge";
import AdDetailsCarousel from "../../components/AdDetailsCarousel";

export type PackageTier = "Basic" | "Premium" | "Platyna" | "VIP";

export type Ad = {
  id: string;
  title: string;
  description: string;
  descriptionLong?: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  phone?: string;
  images?: string[];
  packageTier?: PackageTier;
  createdAt: number | string;
};

const PACKAGE_CLASSES: Record<PackageTier, string> = {
  Basic: "bg-gray-100 text-gray-700 border-gray-200",
  Premium: "bg-amber-100 text-amber-800 border-amber-200",
  Platyna: "bg-indigo-100 text-indigo-800 border-indigo-200",
  VIP: "bg-red-100 text-red-700 border-red-200",
};

export default function AdDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    fetch(`http://localhost:3001/api/ads/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Ad) => setAd(data))
      .catch(() => setAd(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-4">
          <p className="text-center text-gray-500 animate-pulse">Ładowanie...</p>
        </div>
      </Layout>
    );

  if (!ad)
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-4">
          <p className="text-center text-red-500 font-bold">
            Ogłoszenie nie znalezione ❌
          </p>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Carousel */}
        <AdDetailsCarousel images={ad.images || []} title={ad.title} />

        {/* Title & Price */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-900">{ad.title}</h1>
          <PriceBadge value={ad.price} />
        </div>

        {/* Meta info */}
        <div className="text-gray-500 text-sm flex flex-wrap gap-2">
          <span>{ad.brand}</span>
          <span>{ad.model}</span>
          <span>{ad.year}</span>
        </div>

        {/* Contact */}
        {ad.phone && (
          <p className="text-sm text-gray-600 font-medium">📞 {ad.phone}</p>
        )}

        {/* Description */}
        <p className="text-gray-700">{ad.descriptionLong || ad.description}</p>

        {/* Package Tier */}
        {ad.packageTier && (
          <span
            className={`inline-block text-sm px-3 py-1 rounded-full border mt-2 ${
              PACKAGE_CLASSES[ad.packageTier]
            }`}
          >
            {ad.packageTier.toUpperCase()}
          </span>
        )}

        {/* Footer */}
        <div className="text-gray-400 text-xs mt-4 border-t pt-2 flex justify-between">
          <span>Dodano: {new Date(ad.createdAt).toLocaleDateString()}</span>
          <span>ID: {ad.id}</span>
        </div>
      </div>
    </Layout>
  );
}
