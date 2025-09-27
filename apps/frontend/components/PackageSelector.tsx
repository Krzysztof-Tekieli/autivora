import { PACKAGE_PRICES, PackageTier, formatPLN } from "./helpers";

const tiers: PackageTier[] = ["Basic", "Premium", "Platyna"];

interface Props {
  value: PackageTier;
  onChange: (t: PackageTier) => void;
}

export default function PackageSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tiers.map((t) => {
        const isSelected = value === t;

        // Tekst opisu pakietu
        const description =
          t === "Basic"
            ? "Podstawowa ekspozycja, widoczność standardowa."
            : t === "Premium"
            ? "Wyróżnienie na liście, większa widoczność."
            : "Najwyższa ekspozycja, widoczność premium na stronie głównej.";

        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={`
              relative group flex flex-col justify-between rounded-2xl border p-5 transition-all
              ${isSelected ? "border-blue-600 bg-blue-50 shadow-lg" : "border-gray-300 hover:border-gray-500 hover:bg-gray-50"}
            `}
          >
            {/* Nazwa i cena */}
            <div className="flex justify-between items-center mb-2">
              <span className={`font-semibold text-lg ${isSelected ? "text-blue-700" : "text-gray-800"}`}>{t}</span>
              <span className="text-sm text-gray-500">{formatPLN(PACKAGE_PRICES[t])}</span>
            </div>

            {/* Opis */}
            <p className={`text-xs ${isSelected ? "text-blue-600" : "text-gray-500"}`}>{description}</p>

            {/* Wyróżnienie wybranego */}
            {isSelected && (
              <span className="absolute top-2 right-2 text-xs bg-blue-600 text-white rounded-full px-2 py-0.5 font-medium shadow-md">
                Wybrane
              </span>
            )}

            {/* Efekt hover */}
            <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-400 pointer-events-none"></span>
          </button>
        );
      })}
    </div>
  );
}
