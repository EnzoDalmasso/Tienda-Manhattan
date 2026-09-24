"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, selectCount, selectSubtotal } from "@/store/cart";
import { useHydrated } from "@/hooks/use-hydrated";
import { SITE } from "@/lib/data/store";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

export function CartDrawer() {
  const hydrated = useHydrated();
  const { isOpen, setOpen, close } = useCart();
  const items = useCart((s) => s.items);
  const count = useCart(selectCount);
  const subtotal = useCart(selectSubtotal);
  const missing = Math.max(0, SITE.freeShippingFrom - subtotal);
  const progress = Math.min(100, (subtotal / SITE.freeShippingFrom) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right">
        <div className="flex h-[72px] shrink-0 items-center border-b px-6">
          <SheetTitle className="font-serif text-2xl font-normal">
            Tu carrito {hydrated && count > 0 && <span className="text-muted-foreground">({count})</span>}
          </SheetTitle>
          <SheetDescription className="sr-only">Productos agregados al carrito</SheetDescription>
        </div>

        {!hydrated || items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="grid size-20 place-items-center rounded-full bg-secondary">
              <ShoppingBag className="size-8 text-gold" strokeWidth={1.2} />
            </div>
            <div>
              <p className="font-serif text-2xl">Tu carrito está vacío</p>
              <p className="mt-2 text-sm text-muted-foreground">Descubrí la nueva colección y encontrá tu próximo favorito.</p>
            </div>
            <Button asChild onClick={close}>
              <Link href="/catalogo">Ver colección</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="shrink-0 border-b bg-secondary/50 px-6 py-4">
              <p className="flex items-center gap-2 text-[13px]">
                <Truck className="size-4 text-gold" strokeWidth={1.5} />
                {missing > 0 ? (
                  <span>
                    Te faltan <strong className="font-medium">{formatPrice(missing)}</strong> para el envío gratis
                  </span>
                ) : (
                  <span className="font-medium">¡Tenés envío gratis!</span>
                )}
              </p>
              <div className="mt-2.5 h-[3px] w-full overflow-hidden bg-border">
                <motion.div
                  className="h-full bg-gold"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y overflow-y-auto px-6">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartLine key={item.key} item={item} onNavigate={close} />
                ))}
              </AnimatePresence>
            </ul>

            <div className="shrink-0 space-y-4 border-t px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm uppercase tracking-[0.16em]">Subtotal</span>
                <span className="text-xl font-medium">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Impuestos incluidos. Envío y descuentos se calculan en el checkout.
              </p>
              <div className="grid gap-2">
                <Button asChild size="lg" onClick={close}>
                  <Link href="/checkout">Finalizar compra</Link>
                </Button>
                <Button asChild variant="outline" onClick={close}>
                  <Link href="/carrito">Ver carrito</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function CartLine({ item, onNavigate, large }: { item: CartItem; onNavigate?: () => void; large?: boolean }) {
  const { remove, setQuantity } = useCart();
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, height: 0 }}
      transition={{ duration: 0.35 }}
      className="flex gap-4 py-5"
    >
      <Link
        href={`/producto/${item.slug}`}
        onClick={onNavigate}
        className={`relative shrink-0 overflow-hidden bg-secondary ${large ? "h-40 w-32" : "h-28 w-22"}`}
      >
        <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.brand}</p>
            <Link href={`/producto/${item.slug}`} onClick={onNavigate} className={`block truncate font-serif leading-tight ${large ? "text-2xl" : "text-lg"}`}>
              {item.name}
            </Link>
            <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-2.5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: item.color.hex }} />
              {item.color.name} · Talle {item.size}
            </p>
          </div>
          <button
            onClick={() => remove(item.key)}
            className="cursor-pointer p-1 text-muted-foreground transition-colors hover:text-ink"
            aria-label={`Eliminar ${item.name}`}
          >
            <Trash2 className="size-4" strokeWidth={1.4} />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex h-9 items-center border border-border">
            <button
              onClick={() => setQuantity(item.key, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="grid h-full w-9 cursor-pointer place-items-center disabled:opacity-30"
              aria-label="Restar uno"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
            <button
              onClick={() => setQuantity(item.key, item.quantity + 1)}
              disabled={item.quantity >= 10}
              className="grid h-full w-9 cursor-pointer place-items-center disabled:opacity-30"
              aria-label="Sumar uno"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <span className="font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </motion.li>
  );
}
