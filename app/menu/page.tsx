"use client";

import { useEffect, useRef, useState } from "react";
import MenuCard from "../components/MenuCard";
import { CATEGORIES, CATEGORY_SUBTITLES, getItemsByCategory } from "../data/menu";
import type { Category } from "../data/menu";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const sectionRefs = useRef<Map<Category, HTMLElement>>(new Map());
  const isScrollingToRef = useRef(false);

  /* Intersection observer — update active tab as user scrolls */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    CATEGORIES.forEach((cat) => {
      const el = sectionRefs.current.get(cat);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingToRef.current) {
            setActiveCategory(cat);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(cat: Category) {
    isScrollingToRef.current = true;
    setActiveCategory(cat);
    const el = sectionRefs.current.get(cat);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 72 - 60;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    setTimeout(() => { isScrollingToRef.current = false; }, 800);
  }

  return (
    <>
      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div className="bg-coffee-900 py-16 text-center">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-cream-400 mb-3">
          Crew &amp; Co. London
        </p>
        <h1 className="font-display text-5xl font-bold text-white lg:text-6xl">
          The Menu
        </h1>
        <p className="mt-4 font-sans text-base text-cream-300/70 max-w-md mx-auto px-6">
          Everything made fresh, sourced with care, and served with warmth.
        </p>
      </div>

      {/* ── Sticky category tabs ─────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-40 border-b border-cream-300 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-10">
          <div className="flex overflow-x-auto scrollbar-hide gap-1 py-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollTo(cat)}
                className={`shrink-0 rounded-pill px-5 py-2 font-sans text-sm font-medium transition-all duration-[220ms] whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-coffee-800 text-cream-100 shadow-sm"
                    : "text-coffee-600 hover:text-coffee-900 hover:bg-cream-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Menu sections ────────────────────────────────────────────────────── */}
      <div className="bg-cream-100">
        {CATEGORIES.map((cat, i) => {
          const items = getItemsByCategory(cat);
          const isFood = cat === "Pastries" || cat === "Sandwiches";

          return (
            <div key={cat}>
              <section
                ref={(el) => { if (el) sectionRefs.current.set(cat, el); }}
                id={cat}
                className="py-20 lg:py-24"
                aria-label={`${cat} menu section`}
              >
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                  {/* Section header */}
                  <div className="mb-10 flex flex-col gap-1.5">
                    <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-coffee-500">
                      {cat}
                    </p>
                    <h2 className="font-display text-4xl font-bold text-coffee-900 lg:text-5xl">
                      {CATEGORY_SUBTITLES[cat]}
                    </h2>
                  </div>

                  {/* Items grid */}
                  <div
                    className={`grid gap-4 ${
                      isFood
                        ? "grid-cols-1 md:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                  >
                    {items.map((item) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </section>

              {/* Wave divider between sections (not after last) */}
              {i < CATEGORIES.length - 1 && (
                <div
                  className="w-full overflow-hidden leading-[0] bg-cream-100"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 1440 40"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    className="h-8 w-full"
                  >
                    <path
                      d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z"
                      fill="#E8D3B5"
                      fillOpacity="0.5"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
