// components/PackageChooser.tsx
import React from "react";
import { PackageTier } from "./helpers"; // <- importujemy wspólny typ

interface PackageOption {
  name: PackageTier;
  label: string;
  description: string;
  price: string;
}

const packages: PackageOption[] = [
  {
    name: "Basic",
    label: "Podstawowy",
    description: "Twoje ogłoszenie będzie widoczne przez 7 dni.",
    price: "0 PLN",
  },
  {
    name: "Premium",
    label: "Premium",
    description: "Ogłoszenie wyróżnione, wyższa widoczność przez 14 dni.",
    price: "49 PLN",
  },
  {
    name: "Platyna",
    label: "Platyna",
    description: "Ogłoszenie wyróżnione, najwyższa widoczność przez 21 dni.",
    price: "199 PLN",
  },
  {
    name: "VIP",
    label: "VIP",
    description: "Maksymalna widoczność, wyróżnienie na stronie głównej przez 30 dni.",
    price: "499 PLN",
  },
];

interface Props {
  pkg: PackageTier;
  setPkg: (pkg: PackageTier) => void;
}

export default function PackageChooser({ pkg, setPkg }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Wybierz pakiet</label>
      <div className="grid grid-cols-1 gap-3">
        {packages.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setPkg(p.name)}
            className={`w-full p-4 text-left rounded-2xl border transition-all ${
              pkg === p.name
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-500"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{p.label}</span>
              <span className="text-gray-600">{p.price}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">{p.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
