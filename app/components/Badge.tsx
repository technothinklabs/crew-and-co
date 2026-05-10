import type { Badge as BadgeType } from "../data/menu";

type BadgeVariant = BadgeType | "category";

interface BadgeProps {
  variant: BadgeVariant;
  children?: string;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  Popular: "bg-coffee-100 text-coffee-700",
  "House Favorite": "bg-gold-100 text-gold-700",
  New: "bg-spice-500 text-cream-50",
  Seasonal: "bg-coffee-200 text-coffee-700",
  "": "bg-cream-200 text-coffee-600",
  category: "bg-cream-200 text-coffee-600",
};

const variantLabels: Partial<Record<BadgeVariant, string>> = {
  "House Favorite": "House Fav",
};

export default function Badge({ variant, children, className = "" }: BadgeProps) {
  const label = children ?? variantLabels[variant] ?? variant;
  if (!label) return null;

  return (
    <span
      className={`inline-flex items-center rounded-pill px-2.5 py-0.5 font-sans text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
