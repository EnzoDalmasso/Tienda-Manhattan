"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/hooks/use-hydrated";
import { PRODUCTS } from "@/lib/data/products";

export default function WishlistPage() {
  const hydrated = useHydrated();
  const ids = useWishlist((s) => s.ids);
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="container-x pb-24">
      <div className="border-b py-10 sm:py-14">
        <p className="eyebrow mb-3">Tu selección</p>
        <h1 className="heading-display text-5xl sm:text-6xl">Favoritos</h1>
      </div>

      {!hydrated ? (
        <div className="min-h-[40vh]" />
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-24 text-center">
          <div className="grid size-20 place-items-center rounded-full bg-secondary">
            <Heart className="size-8 text-gold" strokeWidth={1.2} />
          </div>
          <p className="font-serif text-3xl">Todavía no guardaste favoritos</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tocá el corazón en cualquier prenda para guardarla y encontrarla fácilmente después.
          </p>
          <Button asChild size="lg">
            <Link href="/catalogo">Explorar colección</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 pt-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
