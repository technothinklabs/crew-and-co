# Crew & Co. Style Guide

> Visual language reference for the Crew & Co. coffee brand.
> Tech stack: Next.js 16 · React 19 · TypeScript · Tailwind CSS v4

---

## Brand Personality

Crew & Co. is an artisan coffee brand built on warmth, craft, and community. Every visual decision should echo the feeling of a perfectly brewed morning cup — rich, unhurried, and welcoming.

| Pillar | Description | Visual Expression |
|--------|-------------|-------------------|
| **Warmth** | Inviting, never corporate | Earthy browns, cream surfaces, soft curves |
| **Craft** | Deliberate, skilled | Serif headlines, precise typographic spacing |
| **Community** | Open, approachable | Generous whitespace, readable copy, friendly tone |

**The one thing to remember:** Every screen should feel like stepping into a warm café on a cold morning.

---

## Color System

Design tokens live in `docs/design/tokens.css`. Import into `app/globals.css`:
```css
@import "tailwindcss";
@import "../docs/design/tokens.css";
```

### Primary — Coffee

The structural backbone of the brand. Use dark shades for text and CTAs; light shades for backgrounds and tints.

| Swatch | Token | Hex | Tailwind | Primary Use |
|--------|-------|-----|----------|-------------|
| ████ | `coffee-950` | `#0D0400` | `text-coffee-950` | Extreme contrast moments |
| ████ | `coffee-900` | `#1E0900` | `text-coffee-900` | **Headlines, primary text** |
| ████ | `coffee-800` | `#2F1100` | `bg-coffee-800` | **CTA button backgrounds** |
| ████ | `coffee-700` | `#421B04` | `bg-coffee-700` | Hover states on dark elements |
| ████ | `coffee-600` | `#5C3210` | `text-coffee-600` | **Secondary/body text** |
| ████ | `coffee-500` | `#7F4E22` | `text-coffee-500` | Decorative icons |
| ████ | `coffee-400` | `#A8703F` | `text-coffee-400` | **Muted text, placeholders** |
| ████ | `coffee-300` | `#C8966D` | `border-coffee-300` | Dividers, image borders |
| ████ | `coffee-200` | `#DFC1A0` | `border-coffee-200` | Light borders |
| ████ | `coffee-100` | `#F0E2CE` | `bg-coffee-100` | Tinted section backgrounds |
| ████ | `coffee-50`  | `#FAF5EF` | `bg-coffee-50` | Near-white warm surface |

### Accent — Gold

Used sparingly. Reserve gold for price callouts, star ratings, badges, and premium highlights. Never use as the dominant color on a page.

| Swatch | Token | Hex | Tailwind | Primary Use |
|--------|-------|-----|----------|-------------|
| ████ | `gold-500` | `#D4920A` | `bg-gold-500` | **Price badges, badge bg** |
| ████ | `gold-400` | `#F2AE0D` | `text-gold-400` | Star rating fills |
| ████ | `gold-300` | `#F8C73A` | `text-gold-300` | Decorative highlights |
| ████ | `gold-200` | `#FCDF84` | `bg-gold-200` | Very light tint |
| ████ | `gold-100` | `#FEF1C4` | `bg-gold-100` | Warm alert backgrounds |

### Accent — Spice

High-energy accent for notification badges, sale tags, and active/live states. Use in very small doses.

| Swatch | Token | Hex | Tailwind | Use |
|--------|-------|-----|----------|-----|
| ████ | `spice-500` | `#C04B0A` | `bg-spice-500` | Badge dots, "Hot" tags |
| ████ | `spice-400` | `#F3722C` | `text-spice-400` | Hover on spice elements |

### Neutral — Cream

Page background tiers. Never use stark white as the page background — always layer warm cream under surfaces.

| Swatch | Token | Hex | Tailwind | Use |
|--------|-------|-----|----------|-----|
| ████ | `cream-50`  | `#FDFAF7` | `bg-cream-50` | Elevated card surface |
| ████ | `cream-100` | `#FAF4EC` | `bg-cream-100` | **Default page background** |
| ████ | `cream-200` | `#F2E5D0` | `bg-cream-200` | Section alternates |
| ████ | `cream-300` | `#E8D3B5` | `border-cream-300` | Subtle borders, dividers |
| ████ | `cream-400` | `#D9BD96` | `border-cream-400` | Input borders |

### Semantic Color Aliases

Prefer these in component CSS over raw palette tokens so that theming/dark mode changes propagate automatically.

```css
/* Applied as CSS vars — use in stylesheets */
var(--bg-page)          /* cream-100 — page background */
var(--bg-surface)       /* #FFFFFF   — card/modal surface */
var(--bg-elevated)      /* cream-50  — card on cream bg */
var(--text-primary)     /* coffee-900 */
var(--text-secondary)   /* coffee-600 */
var(--text-muted)       /* coffee-400 */
var(--accent-brand)     /* coffee-800 — CTA backgrounds */
var(--accent-gold)      /* gold-500  */
var(--border-subtle)    /* cream-300 */
var(--border-default)   /* cream-400 */
```

### Contrast Ratios (WCAG AA / AAA)

| Text Color | Background | Ratio | Rating |
|-----------|-----------|-------|--------|
| `coffee-900` | `cream-100` | ~16.4:1 | AAA |
| `coffee-800` | `cream-100` | ~13.1:1 | AAA |
| `coffee-900` | `#FFFFFF` | ~18.2:1 | AAA |
| `cream-100` | `coffee-800` | ~13.1:1 | AAA |
| `cream-100` | `coffee-700` | ~10.8:1 | AAA |
| `gold-900` | `gold-100` | ~8.2:1 | AAA |

---

## Typography

### Font Families

Fonts are self-hosted via `next/font/google`. Update `app/layout.tsx`:

```tsx
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
```

| Role | Family | CSS Variable | Tailwind Class |
|------|--------|-------------|----------------|
| **Display / Headlines** | Playfair Display | `--font-display` | `font-display` |
| **Body / UI** | DM Sans | `--font-sans` | `font-sans` |
| **Code** | JetBrains Mono | `--font-mono` | `font-mono` |

**Pairing principle:** Playfair Display's high contrast serifs carry authority and warmth in headlines. DM Sans provides a clean, humanist counter-balance for body text — never competing, always complimentary.

### Type Scale

| Level | px | Tailwind | Font | Weight | Leading | Usage |
|-------|-----|----------|------|--------|---------|-------|
| Display 2XL | 80 | `text-8xl` | display | 800 | 1.05 | Hero — max 3 words per line |
| Display XL | 64 | `text-7xl` | display | 700 | 1.1 | Primary section headers |
| Display LG | 48 | `text-5xl` | display | 700 | 1.15 | Feature section titles |
| Display MD | 36 | `text-4xl` | display | 700 | 1.2 | Card-level headlines |
| Display SM | 30 | `text-3xl` | display | 700 | 1.25 | Sub-section, pull quotes |
| Heading LG | 24 | `text-2xl` | sans | 600 | 1.3 | Page section labels |
| Heading MD | 20 | `text-xl` | sans | 600 | 1.35 | Card headings |
| Heading SM | 18 | `text-lg` | sans | 600 | 1.4 | List/form section headers |
| Body LG | 18 | `text-lg` | sans | 400 | 1.6 | Hero subtext, intros |
| Body MD | 16 | `text-base` | sans | 400 | 1.65 | General body copy |
| Body SM | 14 | `text-sm` | sans | 400 | 1.5 | Captions, metadata |
| Overline | 12 | `text-xs` | sans | 500 | 1.5 | Category labels |
| Micro | 11 | `text-[11px]` | sans | 400 | 1.4 | Legal, fine print |

### Typography Patterns

**Hero Headline**
```tsx
<h1 className="font-display text-6xl lg:text-7xl font-bold text-coffee-900 leading-[1.05] tracking-tight">
  Enjoy Your Morning Coffee
</h1>
```

**Section Header**
```tsx
<h2 className="font-display text-4xl lg:text-5xl font-bold text-coffee-900 leading-tight">
  Our Menu
</h2>
```

**Overline Label** (used above section titles)
```tsx
<p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-coffee-500">
  Featured Collection
</p>
```

**Body Paragraph**
```tsx
<p className="font-sans text-base lg:text-lg text-coffee-600 leading-relaxed max-w-prose">
  Boost your productivity and build your mood with a glass of coffee in the morning,
  100% natural from garden.
</p>
```

**Price Display** (reference: "$7.99")
```tsx
<span className="font-display text-3xl font-bold text-gold-600">$7.99</span>
```

**Stat Number** (reference: "1K+", "3k+", "150+")
```tsx
<span className="font-display text-5xl font-bold text-coffee-900">1K+</span>
<span className="font-sans text-sm text-coffee-500 mt-1 block">Reviews</span>
```

---

## Spacing

### Base Unit
Tailwind v4 uses `--spacing` (0.25rem = 4px) as its base. The full Tailwind spacing scale applies.

### Component-Level Spacing

| Context | Value | Tailwind |
|---------|-------|----------|
| Section vertical padding | 96px–112px | `py-24` / `py-28` |
| Section vertical padding (hero) | 128px | `py-32` |
| Container horizontal padding | 24px–40px | `px-6 lg:px-10` |
| Card padding (standard) | 32px | `p-8` |
| Card padding (compact) | 24px | `p-6` |
| List item gap | 16px | `gap-4` |
| Inline element gap | 8px–12px | `gap-2 lg:gap-3` |
| Icon-to-label gap | 8px | `gap-2` |
| Stack (text group) | 12px | `space-y-3` |
| Section header to content | 40px–56px | `mt-10 lg:mt-14` |

### Max Widths

| Context | Value | Tailwind |
|---------|-------|----------|
| Page container | 1280px | `max-w-7xl mx-auto` |
| Editorial content | 768px | `max-w-3xl` |
| Narrow form | 480px | `max-w-xl` |
| Hero text column | 540px | `max-w-[540px]` |

---

## Effects

### Border Radius Reference

| Token | px | Tailwind | Use |
|-------|-----|----------|-----|
| `--radius-xs` | 4 | `rounded-xs` | Micro-tags, kbd elements |
| `--radius-sm` | 8 | `rounded-sm` | Input fields |
| `--radius-md` | 12 | `rounded-md` | Dropdowns, tooltips |
| `--radius-lg` | 16 | `rounded-lg` | Product cards |
| `--radius-xl` | 24 | `rounded-xl` | Featured cards |
| `--radius-2xl` | 32 | `rounded-2xl` | Hero image frames |
| `--radius-3xl` | 48 | `rounded-3xl` | Hero section container |
| `--radius-pill` | ∞ | `rounded-pill` | **Buttons, badges** |

### Shadow Reference

All shadows use `rgb(61 21 0)` (coffee-toned, never grey) for brand cohesion.

| Token | Tailwind | Elevation | Use |
|-------|----------|-----------|-----|
| `--shadow-xs` | `shadow-xs` | 1 | Input fields, ghost cards |
| `--shadow-sm` | `shadow-sm` | 2 | Dropdowns, small popovers |
| `--shadow-md` | `shadow-md` | 3 | **Product cards (default)** |
| `--shadow-lg` | `shadow-lg` | 4 | Modals, drawers |
| `--shadow-xl` | `shadow-xl` | 5 | Hero elements |
| `--shadow-hero` | `shadow-hero` | 6 | Feature product imagery |

**Card hover pattern:**
```css
.card {
  transition: transform var(--duration-slow) var(--ease-smooth),
              box-shadow var(--duration-slow) var(--ease-smooth);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

---

## Motion

### Principles

1. **Warmth over speed** — Slightly longer easing (220–350ms) creates a relaxed, inviting pace. Never rush.
2. **One orchestrated entrance** — The hero section has one coordinated stagger animation on page load. Other sections animate simply on scroll.
3. **Purposeful only** — Animate to aid comprehension or reward attention, not as decoration.
4. **Respect preference** — Always wrap `@keyframes` in `@media (prefers-reduced-motion: no-preference)`.

### Easing Functions

| CSS Variable | Tailwind | Value | Best For |
|-------------|----------|-------|----------|
| `--ease-smooth` | `ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | General UI transitions |
| `--ease-spring` | `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions, button press |
| `--ease-out-expo` | `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Panel/drawer reveals |
| `--ease-in-out` | `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Crossfades, tab switches |

### Duration Scale

| CSS Variable | Tailwind | ms | Use |
|-------------|----------|----|-----|
| `--duration-instant` | `duration-instant` | 80 | Ripple / immediate feedback |
| `--duration-fast` | `duration-fast` | 150 | Hover color, opacity |
| `--duration-base` | `duration-base` | 220 | Button press, border color |
| `--duration-slow` | `duration-slow` | 350 | Card lift, nav transitions |
| `--duration-slower` | `duration-slower` | 550 | Section reveals (scroll) |
| `--duration-slowest` | `duration-slowest` | 800 | Hero page entry |

### Page Entry Animation

```css
/* Single coordinated entrance — stagger children with delay */
@media (prefers-reduced-motion: no-preference) {
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-up {
    animation: fadeUp var(--duration-slower) var(--ease-out-expo) both;
  }

  /* Apply with Tailwind arbitrary delay */
  /* [animation-delay:100ms] [animation-delay:200ms] etc. */
}
```

---

## Layout & Grid

### Page Container

```tsx
/* Standard container — use on every top-level section */
<section className="w-full max-w-7xl mx-auto px-6 lg:px-10">
```

### Hero Layout

Asymmetric split: **45% text / 55% visual** on desktop. Stack vertically on mobile.

```tsx
<section className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] gap-12 lg:gap-0 items-center">
  <div>/* Text content */</div>
  <div>/* Hero visual / product image */</div>
</section>
```

### Product Grid

| Breakpoint | Columns |
|-----------|---------|
| Mobile (`< 640px`) | 1 |
| Tablet (`640px–1023px`) | 2 |
| Desktop (`≥ 1024px`) | 3 |
| Wide (`≥ 1280px`) | 4 |

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Section Wave Divider

Alternate between `cream-100` and `cream-200` (or white) sections. Use an inline SVG wave to create the organic transition seen in the reference.

```tsx
<div className="w-full overflow-hidden leading-[0] text-cream-200">
  <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
  </svg>
</div>
```

---

## Imagery

### Photography

- **Toning:** Warm golden-hour light. No cool or blue filters.
- **Subjects:** Coffee cups, beans, steam close-ups, barista hands, cozy interiors.
- **Card format:** 4:3 ratio for product card images.
- **Hero format:** 1:1 or free-standing product shots with transparent or removed backgrounds.
- **Next.js usage:** Always `next/image` with `priority` on above-fold images.

```tsx
import Image from "next/image";
<Image
  src="/products/latte-hero.png"
  alt="Crew & Co. Signature Latte"
  width={600}
  height={600}
  priority
  className="object-contain drop-shadow-hero"
/>
```

### Illustration & Decoration

- **Coffee bean line art:** Use as subtle background patterns (low opacity, `coffee-200` color). Referenced in the design — drawn outlines of beans scattered behind stats.
- **Organic shapes:** Soft wave SVGs for section transitions. Blob/amorphous shapes as behind-product atmosphere.
- **Icon style:** Outlined stroke icons, 1.5px stroke weight, `coffee-600` color by default. Prefer Phosphor Icons or Lucide React for consistency.

---

## Accessibility

| Rule | Implementation |
|------|----------------|
| Color contrast | All text/bg pairs exceed 4.5:1 (WCAG AA). See contrast table above. |
| Focus ring | `outline-2 outline-offset-2 outline-gold-500` via `:focus-visible` |
| Motion | All animations inside `@media (prefers-reduced-motion: no-preference)` |
| Alt text | Meaningful alt on all `next/image` components. Decorative images: `alt=""` |
| Semantic HTML | Use `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` |
| Heading order | Never skip heading levels (h1 → h2 → h3) |
| Interactive size | All click targets ≥ 44×44px (WCAG 2.5.5) |
| Skip link | `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>` |

---

## Do / Don't

| ✅ Do | ❌ Don't |
|-------|---------|
| Use `cream-100` as the page background | Use stark white (`#FFFFFF`) as page bg |
| Use `font-display` (Playfair) for all h1–h3 | Mix random serif fonts with Playfair |
| Use `rounded-pill` on primary CTA buttons | Use square or slightly-rounded CTAs |
| Keep gold accent to ≤ 10% of any screen | Use gold for large background fills |
| Use `coffee-900` for body text on light bg | Use pure black `#000000` anywhere |
| Test all hover states at 150ms transition | Instant or >500ms hover transitions |
| Scale type with `clamp()` for fluid sizing | Jump hard at a single breakpoint |
| Use `next/image` for all images | Use raw `<img>` tags |
