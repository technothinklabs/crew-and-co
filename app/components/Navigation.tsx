"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";

interface NavigationProps {
  onReserve: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
];

export default function Navigation({ onReserve }: NavigationProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-cream-300 bg-white/95 backdrop-blur-sm transition-shadow duration-[220ms] ${
        scrolled ? "shadow-[0_2px_4px_0_rgb(61_21_0_/_0.07)]" : ""
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-coffee-900 transition-colors duration-[150ms] hover:text-coffee-700"
          aria-label="Crew & Co. home"
        >
          {/* Coffee leaf icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="14" cy="14" r="13" fill="#2F1100" />
            <path
              d="M14 6c0 0-6 4-6 9a6 6 0 0012 0c0-5-6-9-6-9z"
              fill="#D4920A"
            />
            <path
              d="M14 8v10M11 12c1-1.5 3-2 3-2s2 .5 3 2"
              stroke="#2F1100"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          Crew &amp; Co.
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-sans text-sm font-medium transition-colors duration-[150ms] ${
                    isActive
                      ? "text-coffee-900 underline underline-offset-4 decoration-gold-500 decoration-2"
                      : "text-coffee-600 hover:text-coffee-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={onReserve}
            className="hidden md:inline-flex"
          >
            Reserve a Table
          </Button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-coffee-600 transition-colors hover:bg-cream-100 hover:text-coffee-900 md:hidden focus-visible:outline-2 focus-visible:outline-gold-500"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-cream-300 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-lg px-4 py-3 font-sans text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-cream-100 text-coffee-900"
                        : "text-coffee-600 hover:bg-cream-100 hover:text-coffee-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => { setMenuOpen(false); onReserve(); }}
                className="w-full"
              >
                Reserve a Table
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
