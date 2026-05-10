export type Category =
  | "Espresso"
  | "Special Drinks"
  | "Pastries"
  | "Sandwiches"
  | "Full Drinks";

export type Badge = "Popular" | "House Favorite" | "New" | "Seasonal" | "";

export interface MenuItem {
  id: number;
  category: Category;
  name: string;
  description: string;
  price: number;
  options: string;
  badge: Badge;
  image: string;
}

export const CATEGORIES: Category[] = [
  "Espresso",
  "Special Drinks",
  "Pastries",
  "Sandwiches",
  "Full Drinks",
];

export const CATEGORY_SUBTITLES: Record<Category, string> = {
  Espresso: "Pure & Precise",
  "Special Drinks": "Crafted with Character",
  Pastries: "Baked Fresh Daily",
  Sandwiches: "Made to Order",
  "Full Drinks": "Beyond the Bean",
};

const PEXELS = (id: number, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const menuItems: MenuItem[] = [
  // ── Espresso ──────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "Espresso",
    name: "Espresso",
    description:
      "A single or double shot of our signature house blend — bold, bright, and smooth with a caramel crema.",
    price: 3.5,
    options: "Single / Double",
    badge: "",
    image: PEXELS(302899),
  },
  {
    id: 2,
    category: "Espresso",
    name: "Americano",
    description:
      "Two ristretto shots pulled long with hot water. Full-bodied, clean, and endlessly drinkable.",
    price: 4.25,
    options: "Small / Medium / Large",
    badge: "Popular",
    image: PEXELS(302899),
  },
  {
    id: 3,
    category: "Espresso",
    name: "Macchiato",
    description:
      "Double espresso 'stained' with a generous dollop of velvety steamed milk foam. Intensity with a soft finish.",
    price: 4.75,
    options: "Hot / Iced",
    badge: "House Favorite",
    image: PEXELS(312418),
  },
  {
    id: 4,
    category: "Espresso",
    name: "Cortado",
    description:
      "Equal parts espresso and warm whole milk — a perfectly balanced shot for those who like it strong but smooth.",
    price: 4.5,
    options: "Regular",
    badge: "",
    image: PEXELS(312418),
  },
  {
    id: 5,
    category: "Espresso",
    name: "Flat White",
    description:
      "Two ristretto shots topped with silky micro-foam poured in a thin, even layer. Stronger than a latte, smoother than a cap.",
    price: 5.25,
    options: "Regular / Large",
    badge: "Popular",
    image: PEXELS(302899),
  },

  // ── Special Drinks ────────────────────────────────────────────────────────
  {
    id: 6,
    category: "Special Drinks",
    name: "The Crew Signature Latte",
    description:
      "House blend slow-drip cold brew stirred with brown butter caramel, topped with sweet cream and a pinch of flaky sea salt.",
    price: 6.75,
    options: "Hot / Iced",
    badge: "House Favorite",
    image: PEXELS(312418),
  },
  {
    id: 7,
    category: "Special Drinks",
    name: "Brown Sugar Oat Latte",
    description:
      "Espresso shaken over ice with brown sugar syrup, then streamed with cold oat milk. The perfect everyday indulgence.",
    price: 6.25,
    options: "Small / Medium / Large",
    badge: "Popular",
    image: PEXELS(28504478),
  },
  {
    id: 8,
    category: "Special Drinks",
    name: "Lavender Fog Latte",
    description:
      "Locally sourced lavender syrup and honey swirled into steamed oat milk with a double shot. Floral, calming, memorable.",
    price: 5.95,
    options: "Hot / Iced",
    badge: "New",
    image: PEXELS(28504478),
  },
  {
    id: 9,
    category: "Special Drinks",
    name: "Golden Turmeric Latte",
    description:
      "Turmeric, ginger, black pepper, and raw honey whisked into steamed milk. A warming, caffeine-free ritual.",
    price: 5.75,
    options: "Whole / Oat / Almond",
    badge: "",
    image: PEXELS(312418),
  },
  {
    id: 10,
    category: "Special Drinks",
    name: "Maple Pecan Cold Brew",
    description:
      "Our 12-hour cold brew concentrate over ice, sweetened with pure maple syrup and finished with toasted pecan cream.",
    price: 7.25,
    options: "Regular / Large",
    badge: "Popular",
    image: PEXELS(302899),
  },

  // ── Pastries ──────────────────────────────────────────────────────────────
  {
    id: 11,
    category: "Pastries",
    name: "Butter Croissant",
    description:
      "Three-day laminated dough — 27 layers of pure butter pastry with a shattering crust and honeyed crumb. Baked fresh each morning.",
    price: 4.5,
    options: "Plain / Almond",
    badge: "House Favorite",
    image: PEXELS(37300029),
  },
  {
    id: 12,
    category: "Pastries",
    name: "Morning Glory Muffin",
    description:
      "Packed with grated carrot, apple, raisin, toasted coconut, and orange zest. Dense, moist, and genuinely filling.",
    price: 4.25,
    options: "Regular",
    badge: "Popular",
    image: PEXELS(37218332),
  },
  {
    id: 13,
    category: "Pastries",
    name: "Cinnamon Roll",
    description:
      "Slow-risen brioche dough rolled with brown butter and cinnamon sugar, finished with a generous cream cheese glaze.",
    price: 5.5,
    options: "Classic / Vegan",
    badge: "",
    image: PEXELS(37300029),
  },
  {
    id: 14,
    category: "Pastries",
    name: "Banana Walnut Loaf",
    description:
      "Dark, moist banana bread with roughly chopped walnuts and a dark chocolate swirl. Served warm by request.",
    price: 4.75,
    options: "Slice / Whole Loaf",
    badge: "Popular",
    image: PEXELS(37218332),
  },
  {
    id: 15,
    category: "Pastries",
    name: "Chocolate Almond Tart",
    description:
      "Dark Valrhona ganache set in a buttery almond frangipane shell, dusted with cocoa. Best at room temperature.",
    price: 5.75,
    options: "Single Slice",
    badge: "",
    image: PEXELS(37218332),
  },

  // ── Sandwiches ────────────────────────────────────────────────────────────
  {
    id: 16,
    category: "Sandwiches",
    name: "Egg & Aged Cheddar",
    description:
      "Scrambled free-range egg, aged white cheddar, baby arugula, and whole-grain mustard on a toasted brioche bun.",
    price: 8.5,
    options: "Add Avocado +$1.50",
    badge: "House Favorite",
    image: PEXELS(29285138),
  },
  {
    id: 17,
    category: "Sandwiches",
    name: "Smoked Turkey Pesto",
    description:
      "Sliced smoked turkey, sun-dried tomato pesto, provolone, and baby spinach pressed on sourdough. Available warm.",
    price: 10.5,
    options: "Warm / Cold",
    badge: "Popular",
    image: PEXELS(6416558),
  },
  {
    id: 18,
    category: "Sandwiches",
    name: "The Veggie Club",
    description:
      "Roasted red pepper hummus, sliced avocado, cucumber, pickled red onion, and sprouts on toasted multigrain.",
    price: 9.75,
    options: "Multigrain / Sourdough",
    badge: "",
    image: PEXELS(6416558),
  },
  {
    id: 19,
    category: "Sandwiches",
    name: "Prosciutto & Brie",
    description:
      "Prosciutto di Parma, triple-cream brie, fig jam, and peppery rocket on a crusty French demi-baguette.",
    price: 11.5,
    options: "Half / Full",
    badge: "",
    image: PEXELS(29285138),
  },

  // ── Full Drinks ───────────────────────────────────────────────────────────
  {
    id: 20,
    category: "Full Drinks",
    name: "Matcha Green Tea Latte",
    description:
      "Ceremonial-grade Japanese matcha whisked into steamed milk with a touch of raw honey. Earthy, sweet, and vivid.",
    price: 6.25,
    options: "Hot / Iced",
    badge: "House Favorite",
    image: PEXELS(37119337),
  },
  {
    id: 21,
    category: "Full Drinks",
    name: "Classic Lemonade",
    description:
      "Fresh-squeezed lemons, pure cane sugar, and cold sparkling water over crushed ice. No shortcuts, no syrups.",
    price: 4.75,
    options: "Still / Sparkling",
    badge: "Popular",
    image: PEXELS(33107433),
  },
  {
    id: 22,
    category: "Full Drinks",
    name: "Fresh Mint Tea",
    description:
      "A generous handful of whole fresh mint leaves steeped to order in near-boiling water. Served in a glass pot.",
    price: 4.25,
    options: "Hot",
    badge: "",
    image: PEXELS(33107436),
  },
  {
    id: 23,
    category: "Full Drinks",
    name: "Strawberry Basil Lemonade",
    description:
      "Our house lemonade muddled with fresh strawberries and a sprig of basil. Bright, unexpected, and refreshing.",
    price: 5.75,
    options: "Regular / Large",
    badge: "Seasonal",
    image: PEXELS(33107433),
  },
];

export function getPopularItems(limit = 3): MenuItem[] {
  return menuItems.filter((item) => item.badge === "Popular").slice(0, limit);
}

export function getItemsByCategory(category: Category): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}
