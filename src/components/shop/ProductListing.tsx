"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CategorySlug } from "@/lib/catalog";
import { PRODUCTS } from "@/lib/catalog";
import { ProductCard, ProductRow, ProductSkeleton } from "./ProductCard";
import {
  ActiveChips,
  DEFAULT_FILTERS,
  FilterSidebar,
  MobileFilters,
  SortBar,
  type ShopFilters,
} from "./Filters";

const PAGE_SIZE = 12;

export function ProductListing({ fixedCategory }: { fixedCategory?: CategorySlug }) {
  const [filters, setState] = useState<ShopFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const setFilters = (patch: Partial<ShopFilters>) => {
    setState((prev) => ({ ...prev, ...patch }));
    if (!("view" in patch) ) setPage(1);
  };

  // Simulated catalogue fetch — swap for the POS feed later.
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 520);
    return () => clearTimeout(t);
  }, [filters.categories, filters.brands, filters.maxPrice, filters.inStockOnly, filters.bulkOnly, fixedCategory]);

  const results = useMemo(() => {
    let list = PRODUCTS.filter((p) => (fixedCategory ? p.category === fixedCategory : true));
    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    list = list.filter((p) => p.price <= filters.maxPrice);
    if (filters.inStockOnly) list = list.filter((p) => p.inStock);
    if (filters.bulkOnly) list = list.filter((p) => p.bulkOnly);

    const sorted = [...list];
    if (filters.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (filters.sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [filters, fixedCategory]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const visible = results.slice(0, page * PAGE_SIZE);
  const list = filters.view === "list";

  return (
    <div className="mx-auto grid max-w-[1400px] gap-8 px-5 pb-24 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
      <FilterSidebar filters={filters} setFilters={setFilters} lockCategory={!!fixedCategory} />

      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <MobileFilters filters={filters} setFilters={setFilters} lockCategory={!!fixedCategory} />
          <div className="min-w-0 flex-1">
            <SortBar count={results.length} filters={filters} setFilters={setFilters} />
          </div>
        </div>

        <div className="mb-6">
          <ActiveChips filters={filters} setFilters={setFilters} />
        </div>

        {loading ? (
          <div
            className={
              list ? "space-y-3" : "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
            }
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} list={list} />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="border-border rounded-2xl border border-dashed py-24 text-center">
            <p className="font-display text-xl font-extrabold">Nothing matches yet</p>
            <p className="text-muted-foreground mx-auto mt-2 max-w-sm text-sm">
              Loosen a filter or widen the price ceiling — we hold over 1,000 lines on the floor.
            </p>
            <button
              onClick={() => setState(DEFAULT_FILTERS)}
              className="surface-emerald mt-6 rounded-full px-6 py-3 text-[12px] font-bold"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={list ? "space-y-3" : "grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p) =>
                list ? <ProductRow key={p.id} product={p} /> : <ProductCard key={p.id} product={p} />,
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && page < pages && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="border-border hover:border-emerald hover:text-emerald rounded-full border px-8 py-3.5 text-[12px] font-bold tracking-wide transition-colors"
            >
              Load more lines
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
