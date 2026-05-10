# Crew & Co. Component Specifications

> Implementation guide for all UI components.  
> Stack: Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS v4  
> Tokens: `docs/design/tokens.css` · Style guide: `docs/design/style-guide.md`

---

## Component Index

1. [Navigation](#1-navigation)
2. [Button](#2-button)
3. [Badge](#3-badge)
4. [Hero Section](#4-hero-section)
5. [Product Card](#5-product-card)
6. [Stat Block](#6-stat-block)
7. [Menu Item](#7-menu-item)
8. [Review Card](#8-review-card)
9. [Section Header](#9-section-header)
10. [Form Elements](#10-form-elements)
11. [Footer](#11-footer)

---

## 1. Navigation

### Anatomy
```
[Logo] ←——————→ [Link] [Link] [Link] [Link] ←——→ [Icon] [Icon] [CTA Button]
```

### Specs
| Property | Value |
|----------|-------|
| Height | 72px (`h-18`) |
| Background | `#FFFFFF` with `border-b border-cream-300` |
| Horizontal padding | `px-6 lg:px-10` |
| Position | `sticky top-0 z-50` |
| Scroll shadow | `shadow-sm` on scroll (add via JS `scrollY > 0`) |
| Max width | `max-w-7xl mx-auto` (inner) |

### Logo
- Brand mark: coffee leaf icon + "Crew & Co." wordmark
- Font: `font-display` (Playfair Display), `text-xl font-bold text-coffee-900`
- Hover: `text-coffee-700` transition `duration-fast ease-smooth`

### Nav Links
- Font: `font-sans text-sm font-medium text-coffee-600`
- Hover: `text-coffee-900` + `2px underline offset-4 decoration-gold-500`
- Active: `text-coffee-900 underline underline-offset-4 decoration-gold-500`
- Gap between links: `gap-8` on desktop

### Icon Buttons (Search, Cart)
- Size: 40px touch target (`w-10 h-10`)
- Icon: 20px, `text-coffee-600`, hover `text-coffee-900`
- Background on hover: `bg-cream-100 rounded-full`

### CTA Button (Sign In / Order)
→ See [Button — Primary](#2-button)

### TypeScript Interface
```tsx
interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  items: NavItem[];
  cartCount?: number;
}
```

### Code Pattern
```tsx
// app/components/Navigation.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation({ items, cartCount = 0 }: NavigationProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cream-300 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-coffee-900 transition-colors duration-fast hover:text-coffee-700">
          {/* Logo icon + wordmark */}
          Crew & Co.
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`font-sans text-sm font-medium transition-colors duration-fast ${
                  pathname === item.href
                    ? "text-coffee-900 underline underline-offset-4 decoration-gold-500"
                    : "text-coffee-600 hover:text-coffee-900"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Search, Cart icons */}
          <Button variant="primary" size="sm" href="/order">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  );
}
```

---

## 2. Button

The most critical interactive element. Follows the pill-shaped CTA from the reference.

### Variants

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `coffee-800` | `cream-100` | none | bg `coffee-700`, lift `translateY(-1px)` |
| `secondary` | `transparent` | `coffee-800` | `1.5px coffee-300` | bg `coffee-50`, border `coffee-500` |
| `ghost` | `transparent` | `coffee-600` | none | text `coffee-900`, bg `cream-200` |
| `gold` | `gold-500` | `coffee-900` | none | bg `gold-400` |
| `danger` | `spice-500` | `cream-50` | none | bg `spice-600` |

### Sizes

| Size | Height | Padding | Font |
|------|--------|---------|------|
| `xs` | 32px | `px-4 py-1.5` | `text-xs font-medium` |
| `sm` | 40px | `px-5 py-2` | `text-sm font-medium` |
| `md` (default) | 48px | `px-7 py-3` | `text-sm font-semibold` |
| `lg` | 56px | `px-9 py-3.5` | `text-base font-semibold` |
| `xl` | 64px | `px-10 py-4` | `text-lg font-semibold` |

### Icon Placement
- `iconLeft`: Icon before label, `gap-2`
- `iconRight`: Icon after label, `gap-2` — used for "Order Now →" pattern in reference
- `iconOnly`: Square (equal width/height), icon centered

### States
- **Default:** See variant table
- **Hover:** Specified per variant + `shadow-sm` added
- **Active/Pressed:** `scale-[0.97]` + remove shadow
- **Disabled:** `opacity-40 cursor-not-allowed`, no hover effect
- **Loading:** Spinner replaces label, `cursor-wait`

### TypeScript Interface
```tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "gold" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  href?: string;        // renders as <Link> when provided
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
```

### Code Pattern
```tsx
// app/components/Button.tsx
import Link from "next/link";

const variantStyles = {
  primary:   "bg-coffee-800 text-cream-100 hover:bg-coffee-700 shadow-sm hover:shadow-md",
  secondary: "border border-coffee-300 text-coffee-800 hover:bg-coffee-50 hover:border-coffee-500",
  ghost:     "text-coffee-600 hover:text-coffee-900 hover:bg-cream-200",
  gold:      "bg-gold-500 text-coffee-900 hover:bg-gold-400 shadow-sm",
  danger:    "bg-spice-500 text-cream-50 hover:bg-spice-600",
};

const sizeStyles = {
  xs: "h-8 px-4 text-xs",
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm font-semibold",
  lg: "h-14 px-9 text-base font-semibold",
  xl: "h-16 px-10 text-lg font-semibold",
};

export default function Button({
  variant = "primary", size = "md", href, children,
  iconRight, iconLeft, disabled, className, ...props
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-pill font-sans
    transition-all duration-base ease-smooth active:scale-[0.97]
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500
    disabled:opacity-40 disabled:cursor-not-allowed`;

  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className ?? ""}`;

  if (href) {
    return <Link href={href} className={classes}>{iconLeft}{children}{iconRight}</Link>;
  }
  return (
    <button className={classes} disabled={disabled} {...props}>
      {iconLeft}{children}{iconRight}
    </button>
  );
}
```

### Usage Examples
```tsx
/* Primary CTA — matches reference "Order Now →" */
<Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
  Order Now
</Button>

/* Nav Sign In */
<Button variant="primary" size="sm" href="/signin">
  Sign In
</Button>

/* Outline secondary */
<Button variant="secondary" size="md">
  View Menu
</Button>
```

---

## 3. Badge

Small inline labels for categories, prices, and status.

### Variants

| Variant | Background | Text | Use |
|---------|-----------|------|-----|
| `price` | `gold-500` | `coffee-900` | Price callouts ("Start at $7.99") |
| `category` | `coffee-100` | `coffee-700` | Product tags ("Espresso", "Cold Brew") |
| `hot` | `spice-500` | `cream-50` | "New", "Hot", "Sale" |
| `count` | `coffee-900` | `cream-50` | Cart count bubble |
| `rating` | `gold-100` | `gold-700` | Star rating label |

### Sizes
- `sm`: `text-xs px-2 py-0.5`
- `md`: `text-sm px-3 py-1`
- `lg`: `text-base px-4 py-1.5`

### Price Badge (reference: "Start At / $7.99")
This is the circular gold badge from the design.

```tsx
// Circular price badge — matches reference design
<div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-gold-500 shadow-md">
  <span className="font-sans text-[10px] font-medium text-coffee-800 leading-none">Start At</span>
  <span className="font-display text-lg font-bold text-coffee-900 leading-tight">$7.99</span>
</div>
```

### Standard Badge
```tsx
// app/components/Badge.tsx
export default function Badge({ variant = "category", size = "md", children }) {
  const styles = {
    price:    "bg-gold-500 text-coffee-900",
    category: "bg-coffee-100 text-coffee-700",
    hot:      "bg-spice-500 text-cream-50",
    count:    "bg-coffee-900 text-cream-50",
    rating:   "bg-gold-100 text-gold-700",
  };
  return (
    <span className={`inline-flex items-center rounded-pill font-sans font-medium
      ${styles[variant]} ${size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"}`}>
      {children}
    </span>
  );
}
```

---

## 4. Hero Section

The full-width landing hero. Matches the reference layout: text left, product image right, stats below.

### Layout
```
┌──────────────────────────────────────────────────────────────┐
│  [Overline label]                   [Product Image Hero]     │
│                                                              │
│  [H1 Display Headline]              [Primary product visual] │
│  [H1 continued...]                                           │
│                                     [Secondary product]      │
│  [Body subtext paragraph]                                    │
│                                                              │
│  [CTA Button]  [Price Badge]                                 │
├──────────────────────────────────────────────────────────────┤
│  ~~~~~~~~~~~~~ Wave Divider ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~│
├──────────────────────────────────────────────────────────────┤
│  [Stat] [Stat] [Stat]                                        │
└──────────────────────────────────────────────────────────────┘
```

### Specs
| Property | Value |
|----------|-------|
| Min height | `min-h-[calc(100vh-72px)]` |
| Background | `bg-cream-100` |
| Text column max-width | `max-w-[540px]` |
| Image area | Overflow-visible to allow product to "break out" of bounds |
| Stats section bg | `bg-cream-200` |

### Typography
- Overline: `font-sans text-xs font-medium uppercase tracking-[0.12em] text-coffee-500`
- Headline: `font-display text-6xl lg:text-7xl font-bold text-coffee-900 leading-[1.05]`
- Body: `font-sans text-lg text-coffee-600 leading-relaxed max-w-md`

### Code Pattern
```tsx
// app/components/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="relative w-full bg-cream-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-0">

          {/* Text column */}
          <div className="flex flex-col gap-6 py-20 lg:py-0">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-coffee-500">
              Premium Artisan Coffee
            </p>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-coffee-900 lg:text-7xl">
              Enjoy Your<br />Morning Coffee
            </h1>
            <p className="max-w-md font-sans text-lg leading-relaxed text-coffee-600">
              Boost your productivity and build your mood with a glass of coffee
              in the morning, 100% natural from garden.
            </p>
            <div className="flex items-center gap-6">
              <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
                Order Now
              </Button>
              {/* Circular price badge */}
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-gold-500 shadow-md">
                <span className="font-sans text-[10px] font-medium text-coffee-800">Start At</span>
                <span className="font-display text-lg font-bold text-coffee-900">$7.99</span>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="relative flex items-center justify-center">
            <Image src="/hero-product.png" alt="Signature coffee cups" width={600} height={600} priority className="relative z-10 drop-shadow-hero" />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="w-full overflow-hidden leading-[0] text-cream-200">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="h-16 w-full lg:h-20">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
```

---

## 5. Product Card

Displays a single coffee product in the menu/product grid.

### Anatomy
```
┌─────────────────────────────┐
│  [Category Badge]           │
│                             │
│     [Product Image]         │
│                             │
│  [Product Name]             │
│  [Description line]         │
│                             │
│  [$Price]   [Add to Cart]   │
└─────────────────────────────┘
```

### Specs
| Property | Value |
|----------|-------|
| Background | `bg-white` |
| Border radius | `rounded-2xl` |
| Padding | `p-6` |
| Shadow (default) | `shadow-md` |
| Shadow (hover) | `shadow-lg` |
| Hover transform | `translateY(-4px)` |
| Image size | 200×200px, `object-contain` |
| Image bg | `bg-cream-100 rounded-xl` |
| Transition | `duration-slow ease-smooth` |

### TypeScript Interface
```tsx
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}
```

### Code Pattern
```tsx
// app/components/ProductCard.tsx
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl bg-white p-6
      shadow-md transition-all duration-slow ease-smooth
      hover:-translate-y-1 hover:shadow-lg">

      {/* Image */}
      <div className="relative flex h-48 items-center justify-center rounded-xl bg-cream-100 overflow-hidden">
        {product.isBestSeller && (
          <Badge variant="hot" size="sm" className="absolute top-3 left-3 z-10">
            Best Seller
          </Badge>
        )}
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain transition-transform duration-slow group-hover:scale-105"
        />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1">
        <Badge variant="category" size="sm" className="self-start">
          {product.category}
        </Badge>
        <h3 className="font-display text-xl font-bold text-coffee-900">
          {product.name}
        </h3>
        <p className="font-sans text-sm text-coffee-500 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Price + CTA */}
      <div className="mt-auto flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-coffee-900">
          ${product.price.toFixed(2)}
        </span>
        <Button variant="primary" size="sm" iconRight={<Plus size={16} />}>
          Add
        </Button>
      </div>
    </article>
  );
}
```

---

## 6. Stat Block

Displays a large metric with a label. Used in the hero bottom bar and throughout marketing sections. Matches the "1K+ Reviews", "3k+ Best Sell", "150+ Menu" pattern from the reference.

### Specs
| Property | Value |
|----------|-------|
| Number font | `font-display text-5xl lg:text-6xl font-bold text-coffee-900` |
| Label font | `font-sans text-sm font-medium text-coffee-500` |
| Divider | `border-r border-coffee-200` between stats, removed on last |
| Section bg | `bg-cream-200` |
| Section padding | `py-10 px-6` |

### Code Pattern
```tsx
// app/components/StatBlock.tsx
interface Stat {
  value: string;   // "1K+", "3k+", "150+"
  label: string;   // "Reviews", "Best Sell", "Menu"
}

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <section className="w-full bg-cream-200">
      <div className="mx-auto flex max-w-7xl divide-x divide-coffee-200 px-6 py-10 lg:px-10">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-1 flex-col items-start gap-1 px-6 first:pl-0 last:pr-0">
            <span className="font-display text-5xl font-bold text-coffee-900 leading-none">
              {stat.value}
            </span>
            <span className="font-sans text-sm font-medium text-coffee-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Usage
<StatRow stats={[
  { value: "1K+",  label: "Reviews" },
  { value: "3k+",  label: "Best Sell" },
  { value: "150+", label: "Menu" },
]} />
```

---

## 7. Menu Item

Horizontal list item for the full menu page. Simpler than product card — optimised for scanning.

### Anatomy
```
[Image 80px] | [Name + Description]                | [$Price] [Add]
```

### Code Pattern
```tsx
// app/components/MenuItem.tsx
export default function MenuItem({ product }: { product: Product }) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-cream-300 bg-white p-4
      transition-shadow duration-fast hover:shadow-sm">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-cream-100">
        <Image src={product.image} alt={product.name} width={80} height={80}
          className="h-full w-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-bold text-coffee-900 truncate">
          {product.name}
        </h3>
        <p className="font-sans text-sm text-coffee-500 line-clamp-1">
          {product.description}
        </p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-3">
        <span className="font-display text-xl font-bold text-coffee-900">
          ${product.price.toFixed(2)}
        </span>
        <Button variant="primary" size="sm">Add</Button>
      </div>
    </li>
  );
}
```

---

## 8. Review Card

Displays a customer testimonial.

### Anatomy
```
┌──────────────────────────────────────┐
│  [★★★★★]  [Date]                     │
│  "Review quote text here..."         │
│                                      │
│  [Avatar] [Name] · [Verified badge]  │
└──────────────────────────────────────┘
```

### Specs
| Property | Value |
|----------|-------|
| Background | `bg-white` |
| Border | `border border-cream-300` |
| Border radius | `rounded-2xl` |
| Padding | `p-6` |
| Quote font | `font-sans text-base italic text-coffee-600 leading-relaxed` |
| Reviewer name | `font-sans text-sm font-semibold text-coffee-900` |
| Stars | `text-gold-400` filled, `text-cream-300` empty |

### Code Pattern
```tsx
// app/components/ReviewCard.tsx
interface Review {
  rating: number;      // 1-5
  quote: string;
  reviewer: string;
  date: string;
  verified?: boolean;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-cream-300 bg-white p-6
      shadow-sm transition-shadow duration-slow hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < review.rating ? "text-gold-400 fill-gold-400" : "text-cream-300"}
            />
          ))}
        </div>
        <time className="font-sans text-xs text-coffee-400">{review.date}</time>
      </div>
      <blockquote className="font-sans text-base italic leading-relaxed text-coffee-600">
        "{review.quote}"
      </blockquote>
      <footer className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-coffee-200 flex items-center justify-center">
          <span className="font-sans text-xs font-bold text-coffee-700">
            {review.reviewer[0]}
          </span>
        </div>
        <span className="font-sans text-sm font-semibold text-coffee-900">
          {review.reviewer}
        </span>
        {review.verified && (
          <Badge variant="rating" size="sm">Verified</Badge>
        )}
      </footer>
    </article>
  );
}
```

---

## 9. Section Header

Reusable two-part header: overline + display headline + optional subtext.

### Code Pattern
```tsx
// app/components/SectionHeader.tsx
interface SectionHeaderProps {
  overline?: string;
  headline: string;
  body?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  overline, headline, body, align = "center"
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {overline && (
        <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-coffee-500">
          {overline}
        </p>
      )}
      <h2 className="font-display text-4xl font-bold leading-tight text-coffee-900 lg:text-5xl">
        {headline}
      </h2>
      {body && (
        <p className="max-w-xl font-sans text-lg leading-relaxed text-coffee-600">
          {body}
        </p>
      )}
    </div>
  );
}
```

### Usage
```tsx
<SectionHeader
  overline="Our Products"
  headline="Explore the Menu"
  body="From single-origin pour-overs to our signature blend, there's a perfect cup waiting."
  align="center"
/>
```

---

## 10. Form Elements

### Text Input
```tsx
<div className="flex flex-col gap-1.5">
  <label className="font-sans text-sm font-medium text-coffee-700">
    Email Address
  </label>
  <input
    type="email"
    placeholder="you@example.com"
    className="h-11 w-full rounded-lg border border-cream-400 bg-white px-4
      font-sans text-sm text-coffee-900 placeholder:text-coffee-400
      transition-all duration-fast
      focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20
      hover:border-coffee-300"
  />
</div>
```

### Quantity Picker
```tsx
<div className="flex items-center gap-3 rounded-pill border border-cream-400 p-1">
  <button className="flex h-8 w-8 items-center justify-center rounded-full
    text-coffee-600 transition-colors hover:bg-cream-200 hover:text-coffee-900">
    <Minus size={14} />
  </button>
  <span className="font-sans text-sm font-semibold text-coffee-900 tabular-nums w-4 text-center">
    1
  </span>
  <button className="flex h-8 w-8 items-center justify-center rounded-full
    bg-coffee-800 text-cream-100 transition-colors hover:bg-coffee-700">
    <Plus size={14} />
  </button>
</div>
```

### Select / Dropdown
```tsx
<select className="h-11 w-full rounded-lg border border-cream-400 bg-white px-4 pr-10
  font-sans text-sm text-coffee-900 appearance-none cursor-pointer
  focus:border-coffee-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20
  bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[right_1rem_center]">
  <option value="">Select size</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
  <option value="lg">Large</option>
</select>
```

### Category Filter Chips
```tsx
{categories.map((cat) => (
  <button
    key={cat}
    className={`rounded-pill px-5 py-2 font-sans text-sm font-medium
      transition-all duration-fast
      ${active === cat
        ? "bg-coffee-800 text-cream-100 shadow-sm"
        : "bg-white border border-cream-300 text-coffee-600 hover:border-coffee-400 hover:text-coffee-900"
      }`}
    onClick={() => setActive(cat)}
  >
    {cat}
  </button>
))}
```

---

## 11. Footer

### Layout
```
┌──────────────────────────────────────────────────────┐
│  [Logo + tagline]   [Nav cols]   [Newsletter signup] │
├──────────────────────────────────────────────────────┤
│  © 2026 Crew & Co.    [Social Icons]   [Legal links] │
└──────────────────────────────────────────────────────┘
```

### Specs
| Property | Value |
|----------|-------|
| Background | `bg-coffee-900` |
| Text | `text-cream-300` |
| Link hover | `text-cream-100` |
| Border | `border-t border-coffee-800` (bottom bar) |
| Padding | `py-16 px-6 lg:px-10` |
| Grid | `grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_2fr]` |

### Code Pattern
```tsx
// app/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-coffee-900 text-cream-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[2fr_repeat(3,1fr)] lg:gap-16">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-2xl font-bold text-cream-100">
              Crew & Co.
            </span>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-cream-300/80">
              Artisan coffee crafted for the curious and the community.
            </p>
          </div>

          {/* Nav columns */}
          {[
            { heading: "Menu", links: ["Espresso", "Cold Brew", "Seasonal", "Pastries"] },
            { heading: "Visit", links: ["Locations", "Hours", "Catering", "Events"] },
            { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
          ].map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-cream-100">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-sans text-sm text-cream-300/70
                      transition-colors duration-fast hover:text-cream-100">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-coffee-800 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-cream-300/50">
            © 2026 Crew & Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#"
                className="font-sans text-xs text-cream-300/50 transition-colors hover:text-cream-100">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## Accessibility Checklist

Apply these rules to every component before shipping:

- [ ] All interactive elements reachable and operable via keyboard
- [ ] `:focus-visible` ring visible (2px solid `gold-500`, offset 3px)
- [ ] All images have descriptive `alt` text (or `alt=""` for decorative)
- [ ] Color is never the sole conveyor of meaning
- [ ] Click/tap targets ≥ 44×44px (WCAG 2.5.5)
- [ ] `aria-label` on icon-only buttons
- [ ] `aria-current="page"` on active nav links
- [ ] `role="status"` on loading spinner / toast messages
- [ ] All form inputs have associated `<label>` elements
- [ ] Error states include text description, not just color

---

## Quick Reference: Common Tailwind Patterns

```tsx
/* Page background */
className="bg-[var(--bg-page)] min-h-screen"

/* Card surface */
className="bg-white rounded-2xl shadow-md p-6"

/* Section container */
className="mx-auto max-w-7xl px-6 py-20 lg:px-10"

/* Display headline */
className="font-display text-5xl font-bold text-coffee-900 leading-tight"

/* Body text */
className="font-sans text-base text-coffee-600 leading-relaxed"

/* Primary CTA */
className="rounded-pill bg-coffee-800 px-7 py-3 text-sm font-semibold text-cream-100 hover:bg-coffee-700"

/* Muted label */
className="font-sans text-xs font-medium uppercase tracking-widest text-coffee-500"

/* Hover lift */
className="transition-all duration-slow ease-smooth hover:-translate-y-1 hover:shadow-lg"
```
