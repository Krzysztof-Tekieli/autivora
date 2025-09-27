import { formatPLN } from "./helpers";

interface Props {
  value: number;
  variant?: "default" | "highlight"; // różne style badge
  small?: boolean; // opcjonalnie mniejszy rozmiar
  label?: string; // tooltip np. "Cena promocyjna"
}

export default function PriceBadge({
  value,
  variant = "default",
  small = false,
  label,
}: Props) {
  const baseStyle = `
    inline-flex items-center rounded-2xl font-medium transition-all
    ${small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}
    ${variant === "default"
      ? "bg-gray-900 text-white shadow-sm"
      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"}
  `;

  return (
    <div title={label} className={`${baseStyle} hover:scale-105 hover:shadow-xl`}>
      {formatPLN(value)}
    </div>
  );
}
