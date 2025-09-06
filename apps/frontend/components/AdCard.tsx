import Link from "next/link";
import PriceBadge from "./PriceBadge";
import { Ad } from "./helpers";

const tierStyles: Record<string, string> = {
  Basic: "bg-gray-100 text-gray-700 border-gray-200",
  Premium: "bg-amber-100 text-amber-800 border-amber-200",
  Platyna: "bg-indigo-100 text-indigo-800 border-indigo-200",
};

export default function AdCard({ ad }: { ad: Ad }) {
  return (
    <Link
      href={`/ad/${ad.id}`}
      className="group block overflow-hidden rounded-2xl bg-white border shadow-sm hover:shadow-md transition"
    >
      <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
        {ad.images && ad.images.length > 0 ? (
          <img
            src={ad.images[0]}
            alt={ad.title}
            className="h-full w-full object-cover group-hover:scale-[1.02] transition"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-gray-400">
            Brak zdjęcia
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-tight line-clamp-2">{ad.title}</h3>
          <PriceBadge value={ad.price} />
        </div>
        <p className="text-sm text-gray-500">
          {ad.brand} • {ad.model} • {ad.year}
        </p>
        {ad.phone && <p className="text-sm text-gray-600 font-medium">📞 {ad.phone}</p>}
        {ad.packageTier && (
          <span
            className={`inline-flex text-xs px-2 py-1 rounded-full border ${tierStyles[ad.packageTier]}`}
          >
            {ad.packageTier}
          </span>
        )}
      </div>
    </Link>
  );
}
