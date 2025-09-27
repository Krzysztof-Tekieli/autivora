import React, { useState } from "react";
import Image from "next/image";
import PriceBadge from "./PriceBadge";

// Typy
export type PackageTier = "Basic" | "Premium" | "Platyna" | "VIP";

export type Seller = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  verified?: boolean;
  avatarUrl?: string;
};

export type Ad = {
  id: number; // <-- zmienione z string na number
  title: string;
  description: string;
  descriptionLong?: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  imageUrl?: string;
  images?: string[];
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  color?: string;
  location?: string;
  categories?: string[];
  seller?: Seller;
  createdAt: string;
  status?: "ACTIVE" | "ARCHIVED" | "PENDING" | "SOLD";
  packageTier?: PackageTier;
  isNew?: boolean;
  isPromoted?: boolean;
  phone?: string;
};

type AdCardProps = {
  ad: Ad;
};

const PACKAGE_COLORS: Record<PackageTier, string> = {
  Basic: "bg-gray-300 text-gray-800",
  Premium: "bg-yellow-400 text-black",
  Platyna: "bg-gradient-to-r from-purple-500 to-purple-700 text-white",
  VIP: "bg-gradient-to-r from-red-600 to-red-400 text-white",
};

// Komponent seller – memoizowany
const SellerInfo: React.FC<{ seller: Seller }> = React.memo(({ seller }) => (
  <div className="flex items-center mt-3 space-x-3 border-t pt-3">
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
      {seller.avatarUrl ? (
        <Image src={seller.avatarUrl} alt={seller.name} fill className="object-cover" />
      ) : (
        <span className="text-gray-400 flex items-center justify-center h-full w-full">
          👤
        </span>
      )}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-800">{seller.name}</span>
        {seller.verified && (
          <span className="text-blue-500 text-xs font-bold">✔️ Zweryfikowany</span>
        )}
      </div>
      {seller.phone && <div className="text-gray-500 text-xs">📞 {seller.phone}</div>}
      {seller.email && <div className="text-gray-500 text-xs">✉️ {seller.email}</div>}
    </div>
  </div>
));

export const AdCard: React.FC<AdCardProps> = React.memo(({ ad }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (ad.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === (ad.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const displayImage =
    ad.images && ad.images.length > 0 ? ad.images[currentImageIndex] : ad.imageUrl;

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-3xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300 group">
      {/* Badges */}
      <div className="flex justify-end space-x-2 p-3 z-10 relative">
        {ad.isNew && (
          <span
            title="Nowe ogłoszenie"
            className="px-3 py-1 bg-green-500 text-white font-bold rounded-full text-xs animate-pulse"
          >
            NOWE
          </span>
        )}
        {ad.isPromoted && (
          <span
            title="Ogłoszenie promowane"
            className="px-3 py-1 bg-red-500 text-white font-bold rounded-full text-xs animate-pulse"
          >
            PROMOWANE
          </span>
        )}
        {ad.packageTier && (
          <span
            title={`Pakiet: ${ad.packageTier}`}
            className={`px-3 py-1 font-bold rounded-full text-xs ${PACKAGE_COLORS[ad.packageTier]}`}
          >
            {ad.packageTier.toUpperCase()}
          </span>
        )}
      </div>

      {/* Carousel */}
      <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
        )}
        {displayImage ? (
          <Image
            src={displayImage}
            alt={ad.title}
            fill
            className={`object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoadingComplete={() => setImageLoaded(true)}
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Brak zdjęcia
          </div>
        )}

        {ad.images && ad.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {ad.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 w-3 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-extrabold text-gray-900">{ad.title}</h2>
        <PriceBadge value={ad.price} />

        <div className="text-gray-600 text-sm flex flex-wrap gap-2">
          <span>Marka: {ad.brand}</span>
          <span>Model: {ad.model}</span>
          <span>Rok: {ad.year}</span>
          {ad.mileage && <span>Przebieg: {ad.mileage} km</span>}
          {ad.fuelType && <span>Paliwo: {ad.fuelType}</span>}
          {ad.transmission && <span>Sk. biegów: {ad.transmission}</span>}
          {ad.color && <span>Kolor: {ad.color}</span>}
        </div>

        <div
          className="text-gray-700 text-sm overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: expandedDescription ? "500px" : "60px" }}
        >
          {ad.descriptionLong || ad.description}
        </div>
        {ad.descriptionLong && ad.descriptionLong.length > 120 && (
          <button
            onClick={() => setExpandedDescription(!expandedDescription)}
            className="text-indigo-600 ml-1 hover:underline text-xs"
          >
            {expandedDescription ? "Pokaż mniej" : "Czytaj więcej"}
          </button>
        )}

        {ad.categories && (
          <div className="flex flex-wrap gap-2 mt-2">
            {ad.categories.map((cat) => (
              <span
                key={cat}
                className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        {ad.location && (
          <div className="text-gray-500 text-xs mt-2 flex items-center space-x-1">
            <span>📍</span>
            <span>{ad.location}</span>
          </div>
        )}

        {ad.seller && <SellerInfo seller={ad.seller} />}

        <div className="flex justify-between items-center mt-4 border-t pt-3 text-gray-400 text-xs">
          <span>Dodano: {new Date(ad.createdAt).toLocaleDateString()}</span>
          <span>ID: {ad.id}</span>
        </div>
      </div>
    </div>
  );
});

export default AdCard;
