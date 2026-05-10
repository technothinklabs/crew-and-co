"use client";

import Button from "./Button";

interface ReserveButtonProps {
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
}

export default function ReserveButton({
  variant = "secondary",
  size = "lg",
  label = "Reserve a Table",
  className,
}: ReserveButtonProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("crew:open-reserve-modal"));
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={className}>
      {label}
    </Button>
  );
}
