import Image from "next/image";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import ReserveButton from "../components/ReserveButton";

const IMAGES = {
  hero: "/images/pexels-1307698.webp",
  story: "/images/pexels-15259599.webp",
  maya: "/images/pexels-6077664.webp",
  james: "/images/pexels-6077664.webp",
};

const VALUES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3C8.48 3 4 7.48 4 13c0 2.4.9 4.6 2.4 6.3L3 25l5.7-3.4C10.3 22.5 12.1 23 14 23c5.52 0 10-4.48 10-10S19.52 3 14 3z"/>
        <path d="M9 13h10M14 8v10"/>
      </svg>
    ),
    title: "Sourced with Care",
    body: "Every bean we buy comes from farms we've visited or verified. We work with importers who share our commitment to fair wages and sustainable practices.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3l2.5 5.5L22 9.5l-4 4 1 5.5L14 16.5l-5 2.5 1-5.5-4-4 5.5-1L14 3z"/>
      </svg>
    ),
    title: "Community First",
    body: "Open mics, tastings, masterclasses — we host events because we believe a café should be a living room for the neighbourhood, not just a transaction point.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4h14a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"/>
        <path d="M5 10h18M10 16l2 2 4-4"/>
      </svg>
    ),
    title: "Craft in Every Cup",
    body: "We change our filter menu seasonally, dial in every espresso daily, and bake everything in-house. The details aren't optional — they're the whole point.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[55vh] items-center justify-center" aria-label="About hero">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={IMAGES.hero}
            alt="Crew & Co. coffee bar interior"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-coffee-950/65" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 py-24 text-center lg:px-10">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-cream-100/70">
            Our Story
          </p>
          <h1 className="font-display text-5xl font-bold text-white leading-tight lg:text-6xl max-w-2xl">
            Built for the Neighbourhood
          </h1>
          <p className="max-w-xl font-sans text-lg text-cream-200 leading-relaxed">
            A cozy corner of Hackney where great coffee meets real community.
          </p>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────────── */}
      <section
        id="story"
        className="bg-cream-100 py-24 lg:py-28"
        aria-label="Our story"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-[45fr_55fr] lg:gap-20">
            {/* Image */}
            <div className="relative h-80 overflow-hidden rounded-2xl shadow-[0_20px_50px_-8px_rgb(61_21_0_/_0.14)] lg:h-[520px]">
              <Image
                src={IMAGES.story}
                alt="Inside Crew & Co. during a morning rush"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-coffee-500 mb-3">
                  Hackney, London · Since 2019
                </p>
                <h2 className="font-display text-4xl font-bold text-coffee-900 leading-tight lg:text-5xl">
                  From a Railway Arch to a Neighbourhood Institution
                </h2>
              </div>

              <div className="flex flex-col gap-4 font-sans text-base text-coffee-600 leading-relaxed">
                <p>
                  Crew &amp; Co. was born in a 400-square-foot railway arch on Amhurst Road in the autumn of 2019. Maya Chen had just left a decade-long career in structural engineering, and James Okafor had finally stopped saying &ldquo;one day&rdquo; about opening his own place. They met at the Hackney farmers market, bonded over a shared frustration — why was great coffee always paired with a cold, transactional atmosphere? — and shook hands on the idea of Crew &amp; Co. over a pour-over neither of them had budgeted for.
                </p>
                <p>
                  The first three months were humbling. They painted the walls themselves at midnight, sourced a secondhand La Marzocco from a closing Bristol café, and served their first espresso on a Tuesday morning in November to exactly six people — four of whom were family. Word spread slowly, then all at once. By February, there was a queue.
                </p>
                <p>
                  What made people come back wasn&rsquo;t just the coffee — though the coffee is very good. It was the feeling. The Friday open mics that turned strangers into regulars. The Saturday tasting sessions that turned regulars into obsessives. The staff who remembered your name and your order.
                </p>
                <p>
                  Five years on, the arch has been extended, the menu has grown to 150+ items, and the community has grown with it. We still dial in the espresso every morning. We still bake the croissants in-house. And we still haven&rsquo;t quite figured out why the queue starts before we open.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Founders ─────────────────────────────────────────────────────────── */}
      <section
        id="founders"
        className="bg-cream-200 py-24 lg:py-28"
        aria-label="Meet the founders"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            overline="The People Behind the Cup"
            headline="Meet the Founders"
            align="center"
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
            {/* Maya */}
            <div className="flex flex-col items-center gap-5 rounded-2xl bg-white p-8 text-center shadow-[0_4px_12px_-1px_rgb(61_21_0_/_0.09)]">
              <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-cream-200">
                <Image
                  src={IMAGES.maya}
                  alt="Maya Chen, co-founder of Crew & Co."
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-coffee-900">Maya Chen</h3>
                <p className="font-sans text-sm font-medium text-coffee-500 mt-1">
                  Co-Founder &amp; Head of Operations
                </p>
              </div>
              <p className="font-sans text-sm text-coffee-600 leading-relaxed">
                Raised in Hong Kong and trained as a structural engineer, Maya spent a decade designing buildings before a single trip to a coffee farm in Ethiopia&rsquo;s Yirgacheffe region rewired her entirely. She brings the same precision she once applied to load-bearing walls to the craft of espresso. Maya oversees sourcing, roasting relationships, and the obsessive dialling-in that happens before every service.
              </p>
            </div>

            {/* James */}
            <div className="flex flex-col items-center gap-5 rounded-2xl bg-white p-8 text-center shadow-[0_4px_12px_-1px_rgb(61_21_0_/_0.09)]">
              <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-cream-200">
                <Image
                  src={IMAGES.james}
                  alt="James Okafor, co-founder of Crew & Co."
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-coffee-900">James Okafor</h3>
                <p className="font-sans text-sm font-medium text-coffee-500 mt-1">
                  Co-Founder &amp; Creative Director
                </p>
              </div>
              <p className="font-sans text-sm text-coffee-600 leading-relaxed">
                Nigerian-British and proudly Hackney-raised, James trained at Le Cordon Bleu and spent eight years in London&rsquo;s restaurant industry before deciding he cared more about building a neighbourhood gathering place than a Michelin star. At Crew &amp; Co. he leads the food programme, the events calendar, and the culture of the room — that specific warmth that makes first-timers feel like regulars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────────── */}
      <section className="bg-cream-100 py-24 lg:py-28" aria-label="Our values">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeader
            overline="What We Stand For"
            headline="Our Values"
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="flex flex-col gap-4 rounded-2xl border border-cream-300 bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee-100 text-coffee-700">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-coffee-900">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-coffee-600 leading-relaxed">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visit Us ─────────────────────────────────────────────────────────── */}
      <section
        id="visit"
        className="bg-coffee-900 py-24 lg:py-28"
        aria-label="Visit us"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Hours */}
            <div className="flex flex-col gap-6">
              <SectionHeader
                overline="Come Find Us"
                headline="Opening Hours"
                align="left"
                light
              />
              <table className="font-sans text-sm text-cream-300/80 w-full max-w-xs">
                <tbody className="divide-y divide-coffee-800">
                  {[
                    ["Monday – Friday", "7:00 AM – 10:00 PM"],
                    ["Saturday", "8:00 AM – 10:00 PM"],
                    ["Sunday", "8:00 AM – 8:00 PM"],
                  ].map(([day, hours]) => (
                    <tr key={day}>
                      <td className="py-3 pr-8 font-medium text-cream-200">{day}</td>
                      <td className="py-3 text-cream-300/70">{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Address & CTA */}
            <div className="flex flex-col gap-6">
              <SectionHeader
                overline="Our Location"
                headline="Hackney, London"
                align="left"
                light
              />
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3 text-cream-300/80">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold-500">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  <div>
                    <p className="font-sans text-base text-cream-100 font-medium">14 Amhurst Road</p>
                    <p className="font-sans text-sm text-cream-300/70">Hackney, London E8 1JH</p>
                    <p className="font-sans text-sm text-cream-300/70 mt-1">Nearest tube: Hackney Central (Overground)</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="gold" size="md" href="#">
                  Get Directions
                </Button>
                <ReserveButton variant="secondary" size="md" label="Reserve a Table" className="border-cream-500/40 text-cream-200 hover:bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
