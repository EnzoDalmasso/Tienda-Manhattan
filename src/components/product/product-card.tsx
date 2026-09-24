"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/shared/price";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { useCart } from "@/store/cart";
import { cn, discountPercent, totalStock } from "@/lib/utils";
import { SITE } from "@/lib/data/store";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);
  const off = discountPercent(product.price, product.compareAtPrice);
  const soldOut = totalStock(product.stock) === 0;

  const quickAdd = (size: Product["sizes"][number]) => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: product.images[0],
      price: product.price,
      size,
      color: product.colors[0],
    });
    toast.success("Agregado al carrito", { description: `${product.name} · Talle ${size}` });
    open();
  };

  return (
    <article className="group relative">
      <div className="relative">
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-all duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}

          <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5 sm:left-3 sm:top-3">
            {off > 0 && <Badge variant="sale">-{off}%</Badge>}
            {product.tags.includes("nuevo") && <Badge variant="light">Nuevo</Badge>}
            {product.tags.includes("mas-vendido") && !off && <Badge variant="gold">Top ventas</Badge>}
          </div>

          {soldOut && (
            <div className="absolute inset-0 grid place-items-center bg-white/40">
              <Badge>Sin stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <WishlistButton
        productId={product.id}
        productName={product.name}
        className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3"
      />

      {/* Compra rápida (desktop) */}
      {!soldOut && (
        <div className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-2 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 lg:block">
          <div className="bg-white/95 p-2.5 backdrop-blur">
            <p className="mb-2 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Compra rápida</p>
            <div className="flex flex-wrap justify-center gap-1">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => quickAdd(s)}
                  className="h-8 min-w-8 cursor-pointer border border-border px-2 text-xs transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>

      <Link href={`/producto/${product.slug}`} className="mt-3.5 block space-y-1 sm:mt-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{product.brand}</p>
        <h3 className="line-clamp-1 font-serif text-lg leading-tight sm:text-xl">{product.name}</h3>
        <Price price={product.price} compareAt={product.compareAtPrice} />
        <p className="hidden text-xs text-muted-foreground sm:block">
          {SITE.installments} cuotas sin interés de ${Math.round(product.price / SITE.installments).toLocaleString("es-AR")}
        </p>
        <div className="flex gap-1.5 pt-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className={cn("size-3 rounded-full ring-1 ring-black/10")}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </Link>
    </article>
  );
}
