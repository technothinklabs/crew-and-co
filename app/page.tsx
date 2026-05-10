import Image from "next/image";
import Button from "./components/Button";
import SectionHeader from "./components/SectionHeader";
import ProductCard from "./components/ProductCard";
import EventCard from "./components/EventCard";
import ReserveButton from "./components/ReserveButton";
import { getPopularItems } from "./data/menu";
import { events } from "./data/events";

const HERO_IMAGE =
  "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1920";

const STATS = [
  { value: "Est. 2019", label: "Hackney, London" },
  { value: "Open Daily", label: "7 AM – 10 PM" },
  { value: "150+", label: "Menu Items" },
];

export default function HomePage() {
  const popularItems = getPopularItems(3);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col" aria-label="Hero">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Warm interior of Crew & Co. coffee bar in the evening"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-coffee-950/65" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-32 text-center lg:px-10">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-cream-100/70 mb-4">
            London&rsquo;s Favourite Neighbourhood Coffee Bar
          </p>
          <h1 className="font-display font-bold text-white leading-tight tracking-tight text-5xl sm:text-6xl lg:text-8xl max-w-4xl">
            Where Every<br className="hidden sm:block" /> Cup Tells a Story
          </h1>
          <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-cream-200">
            Specialty coffee, fresh pastries, and a warm seat in Hackney.
            Come for the espresso, stay for the neighbourhood.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg" href="/menu">
              Browse the Menu
            </Button>
            <ReserveButton
              variant="secondary"
              size="lg"
              label="Reserve a Table"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white/70"
            />
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 border-t border-white/10 bg-coffee-950/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl divide-x divide-white/10 px-6 lg:px-10">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-1 flex-col items-center py-6 px-4 text-center"
              >
                <span className="font-display text-2xl font-bold text-white leading-none">
                  {stat.value}
                </span>
                <span className="font-sans text-xs text-cream-300/70 mt-1 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Items ─────────────────────────────────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-28" aria-label="Popular menu items">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            overline="Customer Favourites"
            headline="Popular This Week"
            body="Our most-loved drinks and bites, chosen by the Crew & Co. community."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Button variant="secondary" size="lg" href="/menu">
              See the Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-[0] bg-cream-100" aria-hidden="true">
        <svg
          viewBox="0 0 1440 64"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="h-12 w-full lg:h-16"
        >
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z" fill="#F2E5D0" />
        </svg>
      </div>

      {/* ── Events ───────────────────────────────────────────────────────────── */}
      <section
        id="events"
        className="bg-cream-200 py-24 lg:py-28"
        aria-label="Upcoming events"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            overline="What's On"
            headline="Join Us This Week"
            body="From live music to coffee education — there's always something happening at Crew & Co."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Reserve CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-coffee-800 py-24 lg:py-28" aria-label="Reserve a table">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col items-center text-center gap-8">
          <SectionHeader
            headline="Your Table is Waiting"
            body="Book a spot for your next morning ritual, working lunch, or Friday night out."
            align="center"
            light
          />
          <ReserveButton variant="gold" size="lg" label="Reserve a Table" />
        </div>
      </section>
    </>
  );
}
