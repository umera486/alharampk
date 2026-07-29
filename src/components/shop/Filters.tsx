"use client";

import { LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, BRANDS, type CategorySlug } from "@/lib/catalog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export type ShopFilters = {
  categories: CategorySlug[];
  brands: string[];
  maxPrice: number;
  inStockOnly: boolean;
  bulkOnly: boolean;
  sort: string;
  view: "grid" | "list";
};

export const DEFAULT_FILTERS: ShopFilters = {
  categories: [],
  brands: [],
  maxPrice: 30,
  inStockOnly: false,
  bulkOnly: false,
  sort: "featured",
  view: "grid",
};

export const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "name", label: "A–Z" },
];

type SetFilters = (patch: Partial<ShopFilters>) => void;

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-border border-t py-5 first:border-t-0 first:pt-0">
      <p className="eyebrow">{title}</p>
      <div className="mt-3.5 space-y-2.5">{children}</div>
    </div>
  );
}

function Check({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-2.5 text-[13px]">
      <span
        className={`grid size-4 shrink-0 place-items-center rounded-[5px] border transition-all duration-300 ${
          checked ? "surface-emerald border-transparent" : "border-border group-hover:border-emerald"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 10 8" className="size-2.5 fill-none stroke-current stroke-2">
            <path d="M1 4l2.5 2.5L9 1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      <span className="min-w-0 truncate">{label}</span>
    </label>
  );
}

export function FilterPanel({
  filters,
  setFilters,
  lockCategory,
}: {
  filters: ShopFilters;
  setFilters: SetFilters;
  lockCategory?: boolean;
}) {
  const toggle = <T,>(list: T[], value: T) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <div className="text-foreground">
      {!lockCategory && (
        <Group title="Department">
          {CATEGORIES.map((c) => (
            <Check
              key={c.slug}
              label={c.name}
              checked={filters.categories.includes(c.slug)}
              onChange={() => setFilters({ categories: toggle(filters.categories, c.slug) })}
            />
          ))}
        </Group>
      )}

      <Group title="Brand">
        {BRANDS.map((b) => (
          <Check
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => setFilters({ brands: toggle(filters.brands, b) })}
          />
        ))}
      </Group>

      <Group title={`Max price · £${filters.maxPrice}`}>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={filters.maxPrice}
          onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
          className="accent-emerald w-full"
          aria-label="Maximum price"
        />
      </Group>

      <Group title="Availability">
        <Check
          label="In stock only"
          checked={filters.inStockOnly}
          onChange={() => setFilters({ inStockOnly: !filters.inStockOnly })}
        />
        <Check
          label="B2B bulk lines only"
          checked={filters.bulkOnly}
          onChange={() => setFilters({ bulkOnly: !filters.bulkOnly })}
        />
      </Group>
    </div>
  );
}

export function FilterSidebar(props: {
  filters: ShopFilters;
  setFilters: SetFilters;
  lockCategory?: boolean;
}) {
  return (
    <aside className="bg-card border-border sticky top-28 hidden h-fit rounded-2xl border p-6 lg:block">
      <FilterPanel {...props} />
    </aside>
  );
}

export function MobileFilters(props: {
  filters: ShopFilters;
  setFilters: SetFilters;
  lockCategory?: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger className="border-border bg-card inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-bold lg:hidden">
        <SlidersHorizontal className="size-3.5" /> Filters
      </SheetTrigger>
      <SheetContent side="left" className="w-[86vw] overflow-y-auto p-6 sm:max-w-sm">
        <p className="font-display mb-5 text-xl font-extrabold">Refine</p>
        <FilterPanel {...props} />
      </SheetContent>
    </Sheet>
  );
}

export function SortBar({
  count,
  filters,
  setFilters,
}: {
  count: number;
  filters: ShopFilters;
  setFilters: SetFilters;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
      <p className="text-muted-foreground min-w-0 truncate text-[12px] font-semibold">
        {count} line{count === 1 ? "" : "s"}
      </p>
      <div className="flex shrink-0 items-center gap-2">
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ sort: e.target.value })}
          aria-label="Sort products"
          className="border-border bg-card rounded-full border px-3.5 py-2 text-[12px] font-semibold outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="border-border bg-card flex shrink-0 rounded-full border p-1">
          {(["grid", "list"] as const).map((v) => {
            const Icon = v === "grid" ? LayoutGrid : Rows3;
            const active = filters.view === v;
            return (
              <button
                key={v}
                onClick={() => setFilters({ view: v })}
                aria-label={`${v} view`}
                aria-pressed={active}
                className={`grid size-8 place-items-center rounded-full transition-colors ${
                  active ? "surface-emerald" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-3.5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ActiveChips({
  filters,
  setFilters,
}: {
  filters: ShopFilters;
  setFilters: SetFilters;
}) {
  const chips: Array<{ label: string; clear: () => void }> = [
    ...filters.categories.map((c) => ({
      label: CATEGORIES.find((x) => x.slug === c)?.name ?? c,
      clear: () => setFilters({ categories: filters.categories.filter((x) => x !== c) }),
    })),
    ...filters.brands.map((b) => ({
      label: b,
      clear: () => setFilters({ brands: filters.brands.filter((x) => x !== b) }),
    })),
  ];
  if (filters.inStockOnly)
    chips.push({ label: "In stock", clear: () => setFilters({ inStockOnly: false }) });
  if (filters.bulkOnly) chips.push({ label: "Bulk", clear: () => setFilters({ bulkOnly: false }) });

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <button
          key={c.label}
          onClick={c.clear}
          className="border-emerald/40 text-emerald inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold"
        >
          {c.label}
          <X className="size-3" />
        </button>
      ))}
    </div>
  );
}
