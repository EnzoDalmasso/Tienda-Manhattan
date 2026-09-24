"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, CreditCard, MapPin, RefreshCcw, ShoppingBag, Star, Truck } from "lucide-react";
import type { Product, ProductColor, Size } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Price } from "@/components/shared/price";
import { WishlistButton } from "@/components/shared/wishlist-button";
import { WhatsAppIcon } from "@/components/shared/icons";
import { SizeGuide } from "./size-guide";
import { useCart } from "@/store/cart";
import { useBranch } from "@/store/branch";
import { useHydrated } from "@/hooks/use-hydrated";
import { BRANCHES, SITE } from "@/lib/data/store";
import { cn, discountPercent, formatPrice, totalStock, whatsappLink } from "@/lib/utils";

export function ProductInfo({ product }: { product: Product }) {
  const [color, setColor] = useState<ProductColor>(product.colors[0]);
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [shake, setShake] = useState(0);
  const add = useCart((s) => s.add);
  const openCart = useCart((s) => s.open);
  const hydrated = useHydrated();
  const { branchId, setBranch } = useBranch();
  const selectedBranch = hydrated ? branchId : BRANCHES[0].id;

  const off = discountPercent(product.price, product.compareAtPrice);
  const stockTotal = totalStock(product.stock);
  const soldOut = stockTotal === 0;
  const isDenim = product.sizes.some((s) => /^\d+$/.test(s));

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      setShake((n) => n + 1);
      return;
    }
    add(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.images[0],
        price: product.price,
        size,
        color,
      },
      qty,
    );
    toast.success("Agregado al carrito", { description: `${product.name} · ${color.name} · Talle ${size}` });
    openCart();
  };

  return (
    <div className="lg:sticky lg:top-[140px]">
      <div className="flex items-center gap-2">
        <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{product.brand}</p>
        {product.tags.includes("nuevo") && <Badge variant="outline">Nuevo</Badge>}
        {off > 0 && <Badge variant="sale">-{off}%</Badge>}
      </div>
      <h1 className="heading-display mt-3 text-4xl sm:text-5xl">{product.name}</h1>

      <a href="#opiniones" className="mt-4 flex items-center gap-2 text-sm">
        <span className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn("size-3.5", i < Math.round(product.rating) ? "fill-gold text-gold" : "text-border")}
            />
          ))}
        </span>
        <span className="text-muted-foreground">
          {product.rating.toFixed(1)} ({product.reviews} opiniones)
        </span>
      </a>

      <Price price={product.price} compareAt={product.compareAtPrice} size="lg" className="mt-6" />
      <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
        <p>
          <CreditCard className="mr-1.5 inline size-4 text-gold" strokeWidth={1.5} />
          {SITE.installments} cuotas sin interés de <strong className="font-medium text-ink">{formatPrice(Math.round(product.price / SITE.installments))}</strong>
        </p>
        <p>
          <span className="font-medium text-ink">{formatPrice(Math.round(product.price * (1 - SITE.transferDiscount)))}</span> pagando por transferencia
        </p>
      </div>

      <div className="my-8 h-px bg-border" />

      {/* Color */}
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em]">
          Color: <span className="text-muted-foreground normal-case tracking-normal">{color.name}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c)}
              aria-label={c.name}
              aria-pressed={color.name === c.name}
              className={cn(
                "size-9 cursor-pointer rounded-full ring-offset-[3px] transition-all",
                color.name === c.name ? "ring-1 ring-ink" : "ring-1 ring-black/10 hover:ring-black/40",
              )}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Talle */}
      <div className="mt-7">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.2em]">
            Talle{size && <span className="text-muted-foreground normal-case tracking-normal">: {size === "U" ? "Único" : size}</span>}
          </p>
          {!product.sizes.includes("U") && <SizeGuide type={isDenim ? "denim" : "ropa"} />}
        </div>
        <motion.div
          key={shake}
          animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="mt-3 flex flex-wrap gap-2"
        >
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSize(s);
                setSizeError(false);
              }}
              className={cn(
                "h-11 min-w-12 cursor-pointer border px-3 text-sm transition-colors",
                size === s ? "border-ink bg-ink text-white" : "border-border hover:border-ink",
                sizeError && "border-destructive",
              )}
            >
              {s === "U" ? "Único" : s}
            </button>
          ))}
        </motion.div>
        {sizeError && <p className="mt-2 text-xs text-destructive">Elegí un talle para continuar</p>}
      </div>

      {/* Stock por sucursal */}
      <div className="mt-7 border bg-white p-4">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
          <MapPin className="size-4 text-gold" strokeWidth={1.5} /> Disponibilidad por sucursal
        </p>
        <div className="mt-3 space-y-2">
          {BRANCHES.map((b) => {
            const units = product.stock[b.id] ?? 0;
            return (
              <button
                key={b.id}
                onClick={() => setBranch(b.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between border px-3 py-2.5 text-left text-sm transition-colors",
                  selectedBranch === b.id ? "border-ink" : "border-transparent bg-secondary/60 hover:border-border",
                )}
              >
                <span>
                  <span className="font-medium">{b.name}</span>
                  <span className="block text-xs text-muted-foreground">{b.address}</span>
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-xs",
                    units === 0 ? "text-muted-foreground" : units <= 3 ? "text-[#a46a1f]" : "text-[#3c6e47]",
                  )}
                >
                  <span className={cn("size-1.5 rounded-full", units === 0 ? "bg-muted-foreground" : units <= 3 ? "bg-[#a46a1f]" : "bg-[#3c6e47]")} />
                  {units === 0 ? "Sin stock" : units <= 3 ? `Últimas ${units}` : "Disponible"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-7 flex gap-2">
        <div className="flex h-13 items-center border border-border">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-full w-10 cursor-pointer text-lg" aria-label="Restar">
            −
          </button>
          <span className="w-8 text-center tabular-nums">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="h-full w-10 cursor-pointer text-lg" aria-label="Sumar">
            +
          </button>
        </div>
        <Button size="lg" className="flex-1" disabled={soldOut} onClick={handleAdd}>
          <ShoppingBag /> {soldOut ? "Sin stock" : "Agregar al carrito"}
        </Button>
        <WishlistButton productId={product.id} productName={product.name} variant="outline" />
      </div>
      <Button asChild variant="outline" className="mt-2 w-full">
        <a
          href={whatsappLink(
            BRANCHES.find((b) => b.id === selectedBranch)?.whatsapp ?? SITE.whatsapp,
            `Hola! Quiero consultar por: ${product.name}${size ? ` (talle ${size})` : ""} - ${color.name}`,
          )}
          target="_blank"
          rel="noopener"
        >
          <WhatsAppIcon /> Consultar por WhatsApp
        </a>
      </Button>

      <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <Truck className="size-4 text-gold" strokeWidth={1.5} /> Envío gratis desde {formatPrice(SITE.freeShippingFrom)}
        </li>
        <li className="flex items-center gap-2">
          <Check className="size-4 text-gold" strokeWidth={1.5} /> Retiro gratis en sucursal en 24 hs
        </li>
        <li className="flex items-center gap-2">
          <RefreshCcw className="size-4 text-gold" strokeWidth={1.5} /> Cambios sin costo hasta 30 días
        </li>
      </ul>

      <Accordion type="single" collapsible defaultValue="desc" className="mt-8 border-t">
        <AccordionItem value="desc">
          <AccordionTrigger>Descripción</AccordionTrigger>
          <AccordionContent>{product.description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="details">
          <AccordionTrigger>Detalles y cuidados</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-1 pl-4">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="envios">
          <AccordionTrigger>Envíos y retiro</AccordionTrigger>
          <AccordionContent>
            Envíos a todo el país en 2 a 5 días hábiles ({formatPrice(SITE.shippingCost)}, gratis desde{" "}
            {formatPrice(SITE.freeShippingFrom)}). Retiro sin cargo en cualquiera de nuestras sucursales de Cañada de
            Gómez dentro de las 24 hs hábiles.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
