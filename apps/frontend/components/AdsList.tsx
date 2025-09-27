import React from "react";
import AdCard, { Ad, Seller } from "./AdCard";

type RawAd = {
  id: string; // przychodzi z backendu jako string
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
  createdAt?: number | string; // może przyjść jako number lub string
  status?: "active" | "archived" | "pending" | "sold";
  packageTier?: "Basic" | "Premium" | "Platyna" | "VIP";
  isNew?: boolean;
  isPromoted?: boolean;
};

type AdsListProps = {
  ads: RawAd[];
};

const mapRawToAd = (raw: RawAd): Ad => ({
  id: Number(raw.id), // konwertujemy string na number
  title: raw.title,
  description: raw.description,
  descriptionLong: raw.descriptionLong,
  price: raw.price,
  brand: raw.brand,
  model: raw.model,
  year: raw.year,
  imageUrl: raw.imageUrl,
  images: raw.images,
  mileage: raw.mileage,
  fuelType: raw.fuelType,
  transmission: raw.transmission,
  color: raw.color,
  location: raw.location,
  categories: raw.categories,
  seller: raw.seller,
  createdAt: typeof raw.createdAt === "string"
    ? raw.createdAt
    : new Date(raw.createdAt || Date.now()).toISOString(), // zawsze string ISO
  status:
    raw.status === "active"
      ? "ACTIVE"
      : raw.status === "archived"
      ? "ARCHIVED"
      : raw.status === "pending"
      ? "PENDING"
      : raw.status === "sold"
      ? "SOLD"
      : "ACTIVE",
  packageTier: raw.packageTier,
  isNew: raw.isNew,
  isPromoted: raw.isPromoted,
});

const AdsList: React.FC<AdsListProps> = ({ ads }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={mapRawToAd(ad)} />
      ))}
    </div>
  );
};

export default AdsList;
