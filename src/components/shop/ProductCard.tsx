"use client";

import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Star, Plus } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { CATEGORY_BY_SLUG, formatPrice } from "@/lib/catalog";

function Badge({ product }: { product: Product }) {
  if (!product.badge) return null;
  const tone =
    product.badge === "Deal"
      ? "surface-emerald"
      : product.badge === "New"
        ? "bg-foreground text-background"
        : "bg-gold text-gold-foreground";
  return (
    <span
      className={`${tone} absolute top-3 left-3 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] uppercase`}
    >
      {product.badge}
    </span>
  );
}

function Price({ product }: { product: Product }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-lg font-extrabold tracking-tight">
        {formatPrice(product.price)}
      </span>
      <span className="text-muted-foreground text-[11px]">{product.unit}</span>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group glass-card lift relative flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-foreground/10">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Badge product={product} />
        {!product.inStock && (
          <span className="glass-panel text-foreground absolute inset-x-0 bottom-0 py-1.5 text-center text-[10px] font-bold tracking-[0.2em] uppercase">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow !text-[9px]">{product.brand}</p>
        <h3 className="mt-1.5 text-[15px] leading-snug font-bold">{product.name}</h3>
        <p className="text-muted-foreground mt-1 text-[11px]">
          {CATEGORY_BY_SLUG[product.category].name} · {product.caseSize}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0">
            <Price product={product} />
            <p className="text-emerald mt-0.5 text-[11px] font-semibold">
              Trade {formatPrice(product.bulkPrice)}
            </p>
          </div>
          <button
            aria-label={`Add ${product.name} to basket`}
            disabled={!product.inStock}
            className="surface-emerald grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 hover:scale-110 disabled:opacity-40"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductRow({ product }: { product: Product }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group glass-card grid grid-cols-[92px_minmax(0,1fr)] items-center gap-4 overflow-hidden rounded-2xl p-3 sm:grid-cols-[132px_minmax(0,1fr)_auto] sm:gap-6 sm:p-4"
    >
      <div className="relative aspect-square shrink-0 overflow-hidden rounded-xl bg-foreground/10">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <p className="eyebrow !text-[9px]">
          {product.brand} · {CATEGORY_BY_SLUG[product.category].name}
        </p>
        <h3 className="mt-1 truncate text-[15px] font-bold sm:text-base">{product.name}</h3>
        <p className="text-muted-foreground mt-1 text-[11px]">
          {product.caseSize} · {product.inStock ? "In stock" : "Out of stock"}
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          <Star className="fill-gold text-gold size-3.5" />
          <span className="text-[11px] font-semibold">{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-2 sm:hidden">
          <Price product={product} />
        </div>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:flex-col sm:items-end">
        <div className="hidden sm:block">
          <Price product={product} />
          <p className="text-emerald text-right text-[11px] font-semibold">
            Trade {formatPrice(product.bulkPrice)}
          </p>
        </div>
        <button
          disabled={!product.inStock}
          className="surface-emerald w-full rounded-full px-5 py-2.5 text-[12px] font-bold tracking-wide transition-transform duration-500 hover:-translate-y-0.5 disabled:opacity-40 sm:w-auto"
        >
          Add to basket
        </button>
      </div>
    </motion.article>
  );
}

export function ProductSkeleton({ list = false }: { list?: boolean }) {
  if (list) {
    return (
      <div className="glass-card grid grid-cols-[92px_minmax(0,1fr)] gap-4 rounded-2xl p-3 sm:grid-cols-[132px_minmax(0,1fr)] sm:p-4">
        <div className="aspect-square animate-pulse rounded-xl bg-foreground/10" />
        <div className="min-w-0 space-y-2.5 py-2">
          <div className="h-2.5 w-24 animate-pulse rounded-full bg-foreground/15" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-foreground/15" />
          <div className="h-2.5 w-1/3 animate-pulse rounded-full bg-foreground/15" />
        </div>
      </div>
    );
  }
  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <div className="aspect-[4/3] animate-pulse bg-foreground/10" />
      <div className="space-y-2.5 p-4">
        <div className="h-2.5 w-20 animate-pulse rounded-full bg-foreground/15" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-foreground/15" />
        <div className="h-2.5 w-1/2 animate-pulse rounded-full bg-foreground/15" />
        <div className="mt-4 h-6 w-1/3 animate-pulse rounded-full bg-foreground/15" />
      </div>
    </div>
  );
}

export function CategoryPill({ slug, name }: { slug: string; name: string }) {
  return (
    <Link
      to="/category/$slug"
      params={{ slug }}
      className="glass-panel hover:gold-glow rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-400"
    >
      {name}
    </Link>
  );
}
