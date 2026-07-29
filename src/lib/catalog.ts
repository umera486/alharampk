export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategorySlug;
  price: number;
  bulkPrice: number;
  unit: string;
  caseSize: string;
  rating: number;
  inStock: boolean;
  bulkOnly?: boolean;
  badge?: "New" | "Deal" | "Bestseller" | "Bulk";
  discount?: number;
  /** Drop your own asset URL here. */
  image: string;
};

export const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80",
  spices:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80",
  wholesale:
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1920&q=80",
  freshProduce:
    "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80",
} as const;

export type CategorySlug =
  | "fresh-produce"
  | "butchery"
  | "dairy-chill"
  | "bakery"
  | "pantry-staples"
  | "bulk-grains"
  | "beverages"
  | "household";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  lines: number;
  image: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "fresh-produce",
    name: "Fresh Produce",
    blurb: "Farm crates in by 5am, on the floor by 7.",
    lines: 184,
    image: IMAGES.freshProduce,
  },
  {
    slug: "butchery",
    name: "Butchery",
    blurb: "Halal-certified, cut to order, cold-chain sealed.",
    lines: 96,
    image: "https://images.unsplash.com/photo-1607623650997-625d2774f61e?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "dairy-chill",
    name: "Dairy & Chill",
    blurb: "Milk, cheese and yoghurt held at a strict 3°C.",
    lines: 121,
    image: "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "bakery",
    name: "Bakery",
    blurb: "Baked on-site every four hours, all day.",
    lines: 74,
    image: "https://images.unsplash.com/photo-1517433670267-08bbd425865f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "pantry-staples",
    name: "Pantry Staples",
    blurb: "Oils, spices, tinned and dry goods at trade rates.",
    lines: 268,
    image: IMAGES.spices,
  },
  {
    slug: "bulk-grains",
    name: "Bulk Grains",
    blurb: "Rice, flour and pulses by the sack or pallet.",
    lines: 92,
    image: IMAGES.wholesale,
  },
  {
    slug: "beverages",
    name: "Beverages",
    blurb: "Cases, crates and chilled singles.",
    lines: 143,
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "household",
    name: "Household",
    blurb: "Cleaning, paper and packaging for trade kitchens.",
    lines: 122,
    image: "https://images.unsplash.com/photo-1585421514738-0176e5dc2214?auto=format&fit=crop&w=800&q=80",
  },
];

export const CATEGORY_BY_SLUG = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;

export const BRANDS = [
  "Al-Haram Select",
  "Golden Valley",
  "Nadir Farms",
  "Crescent Mills",
  "Marina Foods",
  "Sahara Dairy",
] as const;

const CATEGORY_IMAGE: Record<CategorySlug, string> = {
  "fresh-produce": IMAGES.freshProduce,
  butchery: "https://images.unsplash.com/photo-1607623650997-625d2774f61e?auto=format&fit=crop&w=800&q=80",
  "dairy-chill": "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=800&q=80",
  bakery: "https://images.unsplash.com/photo-1517433670267-08bbd425865f?auto=format&fit=crop&w=800&q=80",
  "pantry-staples": IMAGES.spices,
  "bulk-grains": IMAGES.wholesale,
  beverages: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=80",
  household: "https://images.unsplash.com/photo-1585421514738-0176e5dc2214?auto=format&fit=crop&w=800&q=80",
};

const RAW: Array<
  [string, CategorySlug, (typeof BRANDS)[number], number, string, string, number, boolean]
> = [
  ["Vine Tomatoes", "fresh-produce", "Nadir Farms", 2.4, "per kg", "6 kg crate", 4.7, true],
  ["Baby Spinach", "fresh-produce", "Nadir Farms", 1.9, "200 g", "12 × 200 g", 4.5, true],
  ["Red Onions", "fresh-produce", "Golden Valley", 1.2, "per kg", "20 kg sack", 4.6, true],
  ["Hass Avocado", "fresh-produce", "Marina Foods", 1.1, "each", "24 count", 4.8, true],
  ["Coriander Bunch", "fresh-produce", "Nadir Farms", 0.6, "bunch", "30 bunches", 4.4, true],
  ["Green Chillies", "fresh-produce", "Nadir Farms", 3.2, "per kg", "5 kg box", 4.3, false],
  ["Lamb Shoulder", "butchery", "Al-Haram Select", 9.8, "per kg", "10 kg case", 4.9, true],
  ["Chicken Thigh Fillet", "butchery", "Al-Haram Select", 6.4, "per kg", "12 kg case", 4.8, true],
  ["Beef Mince 20%", "butchery", "Al-Haram Select", 7.2, "per kg", "10 kg case", 4.6, true],
  ["Whole Chicken", "butchery", "Al-Haram Select", 5.1, "each", "8 count", 4.7, true],
  ["Mutton Ribs", "butchery", "Al-Haram Select", 11.4, "per kg", "10 kg case", 4.5, false],
  ["Full Cream Milk", "dairy-chill", "Sahara Dairy", 1.25, "2 L", "6 × 2 L", 4.8, true],
  ["Greek Yoghurt", "dairy-chill", "Sahara Dairy", 2.3, "1 kg", "6 × 1 kg", 4.7, true],
  ["Block Mozzarella", "dairy-chill", "Marina Foods", 6.9, "2.5 kg", "4 × 2.5 kg", 4.6, true],
  ["Salted Butter", "dairy-chill", "Sahara Dairy", 3.4, "500 g", "20 × 500 g", 4.5, true],
  ["Paneer", "dairy-chill", "Sahara Dairy", 4.2, "1 kg", "8 × 1 kg", 4.4, true],
  ["Sourdough Loaf", "bakery", "Al-Haram Select", 3.1, "800 g", "12 loaves", 4.9, true],
  ["Naan Family Pack", "bakery", "Al-Haram Select", 1.8, "5 pack", "20 packs", 4.8, true],
  ["Butter Croissant", "bakery", "Golden Valley", 0.9, "each", "48 count", 4.6, true],
  ["Seeded Burger Buns", "bakery", "Golden Valley", 2.2, "8 pack", "24 packs", 4.4, true],
  ["Extra Virgin Olive Oil", "pantry-staples", "Marina Foods", 12.5, "3 L", "4 × 3 L", 4.8, true],
  ["Sunflower Oil", "pantry-staples", "Golden Valley", 8.9, "5 L", "4 × 5 L", 4.5, true],
  ["Chopped Tomatoes", "pantry-staples", "Marina Foods", 0.75, "400 g", "24 tins", 4.6, true],
  ["Chickpeas Tinned", "pantry-staples", "Marina Foods", 0.7, "400 g", "24 tins", 4.5, true],
  ["Garam Masala", "pantry-staples", "Crescent Mills", 3.6, "500 g", "12 × 500 g", 4.7, true],
  ["Turmeric Powder", "pantry-staples", "Crescent Mills", 2.9, "500 g", "12 × 500 g", 4.6, true],
  ["Tomato Paste", "pantry-staples", "Marina Foods", 4.4, "2.2 kg", "6 tins", 4.3, true],
  ["Basmati Rice", "bulk-grains", "Crescent Mills", 24.9, "20 kg", "1 sack", 4.9, true],
  ["Chapati Flour", "bulk-grains", "Crescent Mills", 16.4, "25 kg", "1 sack", 4.8, true],
  ["Red Lentils", "bulk-grains", "Crescent Mills", 18.2, "20 kg", "1 sack", 4.6, true],
  ["Chickpeas Dry", "bulk-grains", "Crescent Mills", 21.5, "20 kg", "1 sack", 4.5, true],
  ["Semolina", "bulk-grains", "Crescent Mills", 14.8, "20 kg", "1 sack", 4.3, false],
  ["Still Water Case", "beverages", "Marina Foods", 4.2, "24 × 500 ml", "1 case", 4.6, true],
  ["Cola Cans", "beverages", "Marina Foods", 9.4, "24 × 330 ml", "1 case", 4.5, true],
  ["Mango Nectar", "beverages", "Golden Valley", 7.8, "12 × 1 L", "1 case", 4.7, true],
  ["Assam Tea Leaf", "beverages", "Crescent Mills", 11.2, "2 kg", "6 × 2 kg", 4.8, true],
  ["Arabica Coffee Beans", "beverages", "Marina Foods", 18.9, "1 kg", "8 × 1 kg", 4.7, true],
  ["Blue Roll Wipes", "household", "Al-Haram Select", 13.5, "6 rolls", "1 case", 4.4, true],
  ["Catering Foil", "household", "Al-Haram Select", 9.2, "45 cm × 75 m", "6 rolls", 4.5, true],
  ["Degreaser Concentrate", "household", "Golden Valley", 15.6, "5 L", "4 × 5 L", 4.6, true],
  ["Bin Liners Heavy", "household", "Golden Valley", 11.9, "200 count", "1 case", 4.3, true],
  ["Takeaway Containers", "household", "Al-Haram Select", 22.4, "500 count", "1 case", 4.5, true],
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const PRODUCTS: Product[] = RAW.map(
  ([name, category, brand, price, unit, caseSize, rating, inStock], i) => {
    const discount = i % 7 === 0 ? 15 : i % 5 === 0 ? 10 : undefined;
    return {
      id: slugify(name),
      name,
      brand,
      category,
      price,
      bulkPrice: Number((price * 0.82).toFixed(2)),
      unit,
      caseSize,
      rating,
      inStock,
      bulkOnly: price > 20,
      badge: discount ? "Deal" : i % 6 === 0 ? "Bestseller" : i % 11 === 0 ? "New" : undefined,
      discount,
      image: CATEGORY_IMAGE[category],
    };
  },
);

export const DEALS = PRODUCTS.filter((p) => p.discount).slice(0, 10);

export function formatPrice(value: number) {
  return `£${value.toFixed(2)}`;
}
