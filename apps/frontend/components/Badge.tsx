interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "highlight";
  small?: boolean;
  tooltip?: string;
}

export default function Badge({ label, variant = "default", small = false, tooltip }: BadgeProps) {
  const baseStyle = `
    inline-flex items-center rounded-full font-bold transition-all
    ${small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"}
    ${variant === "default" ? "bg-gray-300 text-gray-800" : ""}
    ${variant === "success" ? "bg-green-500 text-white" : ""}
    ${variant === "warning" ? "bg-red-500 text-white" : ""}
    ${variant === "highlight" ? "bg-yellow-400 text-black" : ""}
  `;

  return (
    <span title={tooltip} className={`${baseStyle} hover:scale-105 hover:shadow-md`}>
      {label}
    </span>
  );
}
