import { PACKAGE_PRICES, PackageTier, formatPLN } from "./helpers";

const tiers: PackageTier[] = ["Basic", "Premium", "Platyna"];

export default function PackageSelector({ value, onChange }: { value: PackageTier; onChange: (t: PackageTier) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {tiers.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={`rounded-2xl border p-4 text-left transition ${value === t ? "border-gray-900 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{t}</span>
            <span className="text-sm text-gray-500">{formatPLN(PACKAGE_PRICES[t])}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {t === "Basic" && "Podstawowa ekspozycja"}
            {t === "Premium" && "Wyróżnienie na liście"}
            {t === "Platyna" && "Najwyższa ekspozycja"}
          </p>
        </button>
      ))}
    </div>
  );
}
