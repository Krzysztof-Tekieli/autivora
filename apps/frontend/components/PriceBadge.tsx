import { formatPLN } from "./helpers";

export default function PriceBadge({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center rounded-2xl bg-gray-900 text-white px-3 py-1 text-sm font-medium">
      {formatPLN(value)}
    </div>
  );
}
