"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Lock, ShoppingBag, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartLine } from "@/components/layout/cart-drawer";
import { ProductCard } from "@/components/product/product-card";
import { useCart, selectSubtotal } from "@/store/cart";
import { useHydrated } from "@/hooks/use-hydrated";
import { PRODUCTS } from "@/lib/data/products";
import { SITE } from "@/lib/data/store";
import { formatPrice } from "@/lib/utils";

export function CartPageView() {
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = useCart(selectSubtotal);
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const shipping = subtotal >= SITE.freeShippingFrom ? 0 : SITE.shippingCost;

  const suggestions = PRODUCTS.filter((p) => p.tags.includes("mas-vendido") && !items.some((i) => i.productId === p.id)).slice(0, 4);

  if (!hydrated) return <div className="min-h-[60vh]" />;

  return (
    <div className="container-x pb-24">
      <div className="border-b py-10 sm:py-14">
        <p className="eyebrow mb-3">Tu compra</p>
        <h1 className="heading-display text-5xl sm:text-6xl">Carrito</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-5 py-24 text-center">
          <div className="grid size-20 place-items-center rounded-full bg-secondary">
            <ShoppingBag className="size-8 text-gold" strokeWidth={1.2} />
          </div>
          <p className="font-serif text-3xl">Tu carrito está vacío</p>
          <p className="max-w-sm text-sm text-muted-foreground">Te invitamos a recorrer la colección y descubrir tus nuevos favoritos.</p>
          <Button asChild size="lg">
            <Link href="/catalogo">Ir a la tienda</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-12 pt-6 lg:grid-cols-[1fr_400px] lg:gap-16 [&>*]:min-w-0">
          <div>
            <ul className="divide-y">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartLine key={item.key} item={item} large />
                ))}
              </AnimatePresence>
            </ul>
            <div className="flex items-center justify-between border-t pt-6">
              <Link href="/catalogo" className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]">
                <ArrowLeft className="size-4" /> Seguir comprando
              </Link>
              <button onClick={clear} className="cursor-pointer text-xs text-muted-foreground underline underline-offset-4 hover:text-ink">
                Vaciar carrito
              </button>
            </div>
          </div>

          <aside className="h-fit bg-ivory p-6 sm:p-8 lg:sticky lg:top-[140px]">
            <h2 className="font-serif text-3xl">Resumen</h2>
            <form
              className="mt-6 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setCouponMsg(coupon ? "El código ingresado no es válido o está vencido." : null);
              }}
            >
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Código de descuento" className="pl-9" />
              </div>
              <Button type="submit" variant="outline">
                Aplicar
              </Button>
            </form>
            {couponMsg && <p className="mt-2 text-xs text-muted-foreground">{couponMsg}</p>}

            <dl className="mt-6 space-y-3 border-t pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Envío estimado</dt>
                <dd>{shipping === 0 ? <span className="text-[#3c6e47]">Gratis</span> : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <dt>Retiro en sucursal</dt>
                <dd>Gratis</dd>
              </div>
              <div className="flex items-baseline justify-between border-t pt-4">
                <dt className="uppercase tracking-[0.16em]">Total</dt>
                <dd className="text-2xl font-medium tabular-nums">{formatPrice(subtotal + shipping)}</dd>
              </div>
              <p className="text-xs text-muted-foreground">
                o {SITE.installments} cuotas sin interés de {formatPrice(Math.round((subtotal + shipping) / SITE.installments))}
              </p>
            </dl>

            <Button asChild size="lg" className="mt-6 w-full">
              <Link href="/checkout">
                Iniciar compra <ArrowRight />
              </Link>
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" /> Pago 100% seguro
            </p>
          </aside>
        </div>
      )}

      {suggestions.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow mb-3">Sugeridos para vos</p>
          <h2 className="heading-display mb-10 text-4xl">Los más elegidos</h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
