import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "danger";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-coffee-800 text-cream-100 hover:bg-coffee-700 shadow-sm hover:shadow-md",
  secondary:
    "border-[1.5px] border-coffee-300 text-coffee-800 bg-transparent hover:bg-coffee-50 hover:border-coffee-500",
  ghost:
    "text-coffee-600 bg-transparent hover:text-coffee-900 hover:bg-cream-200",
  gold: "bg-gold-500 text-coffee-900 hover:bg-gold-400 shadow-sm hover:shadow-md",
  danger:
    "bg-spice-500 text-cream-50 hover:bg-spice-600 shadow-sm hover:shadow-md",
};

const sizeStyles: Record<Size, string> = {
  xs: "h-8 px-4 text-xs gap-1.5",
  sm: "h-10 px-5 text-sm gap-2",
  md: "h-12 px-7 text-sm font-semibold gap-2",
  lg: "h-14 px-9 text-base font-semibold gap-2",
  xl: "h-16 px-10 text-lg font-semibold gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  iconRight,
  iconLeft,
  disabled,
  loading,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center font-sans rounded-pill",
    "transition-all duration-[220ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
    "active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={base}>
        {iconLeft}
        {children}
        {iconRight}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={base}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {iconLeft}
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
      {iconRight}
    </button>
  );
}
