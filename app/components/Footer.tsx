import Link from "next/link";

const COLUMNS = [
  {
    heading: "Menu",
    links: [
      { label: "Espresso", href: "/menu#Espresso" },
      { label: "Special Drinks", href: "/menu#Special Drinks" },
      { label: "Pastries", href: "/menu#Pastries" },
      { label: "Sandwiches", href: "/menu#Sandwiches" },
      { label: "Full Drinks", href: "/menu#Full Drinks" },
    ],
  },
  {
    heading: "Visit",
    links: [
      { label: "Our Location", href: "/about#visit" },
      { label: "Opening Hours", href: "/about#visit" },
      { label: "Events", href: "/#events" },
      { label: "Reserve a Table", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about#story" },
      { label: "Meet the Founders", href: "/about#founders" },
      { label: "Careers", href: "#" },
    ],
  },
];

const SOCIAL = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" strokeWidth="0"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-coffee-900 text-cream-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_repeat(3,1fr)] lg:gap-16">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                <circle cx="14" cy="14" r="13" fill="#421B04" />
                <path d="M14 6c0 0-6 4-6 9a6 6 0 0012 0c0-5-6-9-6-9z" fill="#D4920A" />
                <path d="M14 8v10M11 12c1-1.5 3-2 3-2s2 .5 3 2" stroke="#421B04" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="font-display text-2xl font-bold text-cream-100">
                Crew &amp; Co.
              </span>
            </div>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-cream-300/80">
              A cozy coffee bar and neighbourhood gathering space in Hackney, London.
              Specialty coffee, fresh pastries, and real community.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-coffee-700 text-cream-300/60 transition-colors hover:border-coffee-500 hover:text-cream-100"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-cream-100">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-cream-300/70 transition-colors duration-[150ms] hover:text-cream-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Address strip */}
        <div className="mt-12 rounded-xl border border-coffee-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
          <div className="flex items-center gap-2 text-cream-300/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span className="font-sans text-sm">14 Amhurst Road, Hackney, London E8 1JH</span>
          </div>
          <div className="flex items-center gap-2 text-cream-300/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span className="font-sans text-sm">Mon–Fri 7 AM–10 PM · Sat–Sun 8 AM–10 PM</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-coffee-800 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-cream-300/50">
            © 2026 Crew &amp; Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-xs text-cream-300/50 transition-colors hover:text-cream-100"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
