// helpers.ts
import React, { createContext, useContext, useMemo, useState } from "react";

// ---------- Typy ----------

// Typy pakietów
export type PackageTier = "Basic" | "Premium" | "Platyna" | "VIP";

// Status ogłoszenia
export type AdStatus = "active" | "pending" | "archived" | "sold";

// Lokalizacja ogłoszenia
export type Location = {
  country: string;
  region: string;
  city: string;
  postalCode?: string;
  street?: string;
  coordinates?: { lat: number; lng: number };
};

// Sprzedawca
export type Seller = {
  id: string;
  name: string;
  avatarUrl?: string;
  verified: boolean;
  rating?: number;
  reviewsCount?: number;
  phone?: string;
  email?: string;
  joinDate?: number;
  dealer?: boolean;
};

// Multimedia
export type Media = {
  url: string;
  type: "image" | "video" | "360";
  thumbnailUrl?: string;
};

// Statystyki ogłoszenia
export type AdStats = {
  views: number;
  favorites: number;
  contacts: number;
};

// Typ ogłoszenia
export type Ad = {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;

  brand: string;
  model: string;
  year: number;
  mileage?: number;
  fuelType?: "Benzyna" | "Diesel" | "LPG" | "Hybryda" | "Elektryczny";
  transmission?: "Manualna" | "Automatyczna";
  bodyType?: string;
  color?: string;
  doors?: number;

  phone?: string;

  imageUrl?: string;
  images?: string[];
  media?: Media[];

  packageTier?: PackageTier;
  isNew?: boolean;
  isPromoted?: boolean;
  highlight?: boolean;

  categories?: string[];
  location?: Location;
  seller?: Seller;

  stats?: AdStats;

  status?: AdStatus;
  expiresAt?: number;

  createdAt: number;
  updatedAt?: number;
};

// ---------- Cennik pakietów ----------
export const PACKAGE_PRICES: Record<PackageTier, number> = {
  Basic: 49,
  Premium: 99,
  Platyna: 199,
  VIP: 499,
};

// ---------- Formatowanie PLN ----------
export const formatPLN = (n: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(n);

// ---------- Ads Context ----------
type AdsContextType = {
  ads: Ad[];
  addAd: (ad: Omit<Ad, "id" | "createdAt">) => Ad;
  setPackageForAd: (id: string, tier: PackageTier) => void;
  promoteAd: (id: string) => void;
  archiveAd: (id: string) => void;
  incrementViews: (id: string) => void;
  addToFavorites: (id: string) => void;
};

const AdsContext = createContext<AdsContextType | null>(null);

const seed: Ad[] = [];

export const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<Ad[]>(seed);

  const addAd = (ad: Omit<Ad, "id" | "createdAt">): Ad => {
    const newAd: Ad = {
      ...ad,
      id: Math.random().toString(36).slice(2),
      createdAt: Date.now(),
      isNew: true,
      status: "active",
      stats: { views: 0, favorites: 0, contacts: 0 },
    };
    setAds((prev) => [newAd, ...prev]);
    return newAd;
  };

  const setPackageForAd = (id: string, tier: PackageTier) => {
    setAds((prev) =>
      prev.map((a) => (a.id === id ? { ...a, packageTier: tier } : a))
    );
  };

  const promoteAd = (id: string) => {
    setAds((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPromoted: true, highlight: true } : a))
    );
  };

  const archiveAd = (id: string) => {
    setAds((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "archived" } : a))
    );
  };

  const incrementViews = (id: string) => {
    setAds((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, stats: { ...a.stats!, views: a.stats!.views + 1 } } : a
      )
    );
  };

  const addToFavorites = (id: string) => {
    setAds((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, stats: { ...a.stats!, favorites: a.stats!.favorites + 1 } } : a
      )
    );
  };

  const value = useMemo(
    () => ({ ads, addAd, setPackageForAd, promoteAd, archiveAd, incrementViews, addToFavorites }),
    [ads]
  );

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
};

export const useAds = () => {
  const ctx = useContext(AdsContext);
  if (!ctx) throw new Error("useAds must be used within AdsProvider");
  return ctx;
};
