// components/helpers.tsx
import React, { createContext, useContext, useMemo, useState } from "react";

// Typy pakietów
export type PackageTier = "Basic" | "Premium" | "Platyna";

// Typ ogłoszenia
export type Ad = {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  phone?: string;
  imageUrl?: string;       // opcjonalne pojedyncze zdjęcie dla kompatybilności
  images?: string[];       // tablica zdjęć
  packageTier?: PackageTier;
  createdAt: number;
};

// Cennik pakietów
export const PACKAGE_PRICES: Record<PackageTier, number> = {
  Basic: 49,
  Premium: 99,
  Platyna: 199,
};

// Formatowanie PLN
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
};

const AdsContext = createContext<AdsContextType | null>(null);

// Seed (opcjonalnie)
const seed: Ad[] = [];

export const AdsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<Ad[]>(seed);

  const addAd = (ad: Omit<Ad, "id" | "createdAt">): Ad => {
    const newAd: Ad = {
      ...ad,
      id: Math.random().toString(36).slice(2),
      createdAt: Date.now(),
    };
    setAds((prev) => [newAd, ...prev]);
    return newAd;
  };

  const setPackageForAd = (id: string, tier: PackageTier) => {
    setAds((prev) =>
      prev.map((a) => (a.id === id ? { ...a, packageTier: tier } : a))
    );
  };

  const value = useMemo(() => ({ ads, addAd, setPackageForAd }), [ads]);

  return <AdsContext.Provider value={value}>{children}</AdsContext.Provider>;
};

export const useAds = () => {
  const ctx = useContext(AdsContext);
  if (!ctx) throw new Error("useAds must be used within AdsProvider");
  return ctx;
};
