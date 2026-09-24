"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import type { Product, SortOption } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { filterProducts } from "@/lib/services/catalog";
import { BRANDS, CATEGORIES } from "@/lib/data/store";
import { COLORS } from "@/lib/data/products";
import { cn, formatPrice } from "@/lib/utils";

const SORTS: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Destacados" },
  { value: "novedades", label: "Novedades" },
  { value: "mas-vendidos", label: "Más vendidos" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "36", "38", "40", "42", "44", "46", "U"];

const PRICE_RANGES = [
  { id: "0-60000", label: `Hasta ${formatPrice(60000)}`, min: 0, max: 60000 },
  { id: "60000-100000", label: `${formatPrice(60000)} – ${formatPrice(100000)}`, min: 60000, max: 100000 },
  { id: "100000-150000", label: `${formatPrice(100000)} – ${formatPrice(150000)}`, min: 100000, max: 150000 },
  { id: "150000-", label: `Más de ${formatPrice(150000)}`, min: 150000, max: undefined },
];

type ListKey = "categoria" | "talle" | "color" | "marca";

export function CatalogView({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [q, setQ] = useState(params.get("q") ?? "");

  const list = (k: ListKey) => params.get(k)?.split(",").filter(Boolean) ?? [];
  const categories = list("categoria");
  const sizes = list("talle");
  const colors = list("color");
  const brands = list("marca");
  const price = params.get("precio") ?? "";
  const onSale = params.get("oferta") === "1";
  const sort = (params.get("sort") as SortOption) ?? "relevancia";
  const range = PRICE_RANGES.find((r) => r.id === price);

  const update = (mutate: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params.toString());
    mutate(next);
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  };

  const toggle = (key: ListKey, value: string) =>
    update((p) => {
      const cur = p.get(key)?.split(",").filter(Boolean) ?? [];
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      if (next.length) p.set(key, next.join(","));
      else p.delete(key);
    });

  // Búsqueda con debounce sincronizada a la URL
  useEffect(() => {
    const t = setTimeout(() => {
      if ((params.get("q") ?? "") === q) return;
      update((p) => (q ? p.set("q", q) : p.delete("q")));
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const results = useMemo(
    () =>
      filterProducts(products, {
        q: params.get("q") ?? undefined,
        categories,
        sizes,
        colors,
        brands,
        minPrice: range?.min,
        maxPrice: range?.max,
        onSale,
        sort,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [products, params],
  );

  const activeChips = [
    ...categories.map((v) => ({ key: "categoria" as const, v, label: CATEGORIES.find((c) => c.slug === v)?.name ?? v })),
    ...brands.map((v) => ({ key: "marca" as const, v, label: v })),
    ...sizes.map((v) => ({ key: "talle" as const, v, label: `Talle ${v}` })),
    ...colors.map((v) => ({ key: "color" as const, v, label: v })),
  ];
  const activeCount = activeChips.length + (range ? 1 : 0) + (onSale ? 1 : 0);

  const title =
    categories.length === 1
      ? CATEGORIES.find((c) => c.slug === categories[0])?.name
      : onSale
        ? "Sale"
        : sort === "novedades"
          ? "Nuevos ingresos"
          : "Toda la colección";

  const filtersPanel = (
    <Accordion type="multiple" defaultValue={["cat", "precio", "talle", "color"]} className="w-full">
      <AccordionItem value="cat">
        <AccordionTrigger>Categorías</AccordionTrigger>
        <AccordionContent className="space-y-2.5">
          {CATEGORIES.map((c) => (
            <Check key={c.slug} checked={categories.includes(c.slug)} onChange={() => toggle("categoria", c.slug)}>
              {c.name}
              <span className="ml-auto text-xs text-muted-foreground">
                {products.filter((p) => p.category === c.slug).length}
              </span>
            </Check>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="precio">
        <AccordionTrigger>Precio</AccordionTrigger>
        <AccordionContent className="space-y-2.5">
          {PRICE_RANGES.map((r) => (
            <Check
              key={r.id}
              radio
              checked={price === r.id}
              onChange={() => update((p) => (price === r.id ? p.delete("precio") : p.set("precio", r.id)))}
            >
              {r.label}
            </Check>
          ))}
          <Check checked={onSale} onChange={() => update((p) => (onSale ? p.delete("oferta") : p.set("oferta", "1")))}>
            Solo productos en oferta
          </Check>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="talle">
        <AccordionTrigger>Talles</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-4 gap-1.5">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => toggle("talle", s)}
                className={cn(
                  "h-10 cursor-pointer border text-xs transition-colors",
                  sizes.includes(s) ? "border-ink bg-ink text-white" : "border-border text-foreground hover:border-ink",
                )}
              >
                {s === "U" ? "Único" : s}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="color">
        <AccordionTrigger>Colores</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-2.5">
            {COLORS.map((c) => (
              <button
                key={c.name}
                title={c.name}
                aria-label={c.name}
                aria-pressed={colors.includes(c.name)}
                onClick={() => toggle("color", c.name)}
                className={cn(
                  "size-8 cursor-pointer rounded-full ring-1 ring-black/10 ring-offset-2 transition-all",
                  colors.includes(c.name) && "ring-2 ring-ink",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="marca">
        <AccordionTrigger>Marcas</AccordionTrigger>
        <AccordionContent className="space-y-2.5">
          {BRANDS.map((b) => (
            <Check key={b.slug} checked={brands.includes(b.name)} onChange={() => toggle("marca", b.name)}>
              {b.name}
            </Check>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="container-x pb-24">
      {/* Encabezado */}
      <div className="border-b py-10 sm:py-14">
        <p className="eyebrow mb-3">Catálogo</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="heading-display text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar productos, marcas..."
              aria-label="Buscar productos"
              className="h-12 w-full border-b border-input bg-transparent pl-7 pr-8 text-base outline-none transition-colors focus:border-ink md:text-sm"
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer p-1" aria-label="Limpiar búsqueda">
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Barra de herramientas */}
      <div className="sticky top-[100px] z-20 -mx-4 flex items-center justify-between gap-3 border-b bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:top-[100px] lg:mx-0 lg:px-0">
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex cursor-pointer items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] lg:hidden"
        >
          <SlidersHorizontal className="size-4" strokeWidth={1.5} /> Filtros {activeCount > 0 && `(${activeCount})`}
        </button>
        <p className="hidden text-sm text-muted-foreground lg:block">
          {results.length} {results.length === 1 ? "producto" : "productos"}
        </p>
        <label className="relative flex items-center gap-2 text-[11px] uppercase tracking-[0.18em]">
          <span className="hidden text-muted-foreground sm:inline">Ordenar por</span>
          <select
            value={sort}
            onChange={(e) => update((p) => p.set("sort", e.target.value))}
            className="cursor-pointer appearance-none bg-transparent pr-6 font-medium uppercase tracking-[0.18em] outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 size-3.5" />
        </label>
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-5">
          {activeChips.map((c) => (
            <button
              key={`${c.key}-${c.v}`}
              onClick={() => toggle(c.key, c.v)}
              className="flex cursor-pointer items-center gap-1.5 bg-secondary px-3 py-1.5 text-xs transition-colors hover:bg-sand"
            >
              {c.label} <X className="size-3" />
            </button>
          ))}
          {range && (
            <button onClick={() => update((p) => p.delete("precio"))} className="flex cursor-pointer items-center gap-1.5 bg-secondary px-3 py-1.5 text-xs hover:bg-sand">
              {range.label} <X className="size-3" />
            </button>
          )}
          {onSale && (
            <button onClick={() => update((p) => p.delete("oferta"))} className="flex cursor-pointer items-center gap-1.5 bg-secondary px-3 py-1.5 text-xs hover:bg-sand">
              En oferta <X className="size-3" />
            </button>
          )}
          <button
            onClick={() => {
              setQ("");
              router.replace(pathname, { scroll: false });
            }}
            className="cursor-pointer px-2 text-xs underline underline-offset-4"
          >
            Limpiar todo
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[250px_1fr] xl:grid-cols-[270px_1fr] [&>*]:min-w-0">
        <aside className="sticky top-[170px] hidden max-h-[calc(100dvh-190px)] self-start overflow-y-auto pr-2 lg:block">
          {filtersPanel}
        </aside>

        <div>
          {results.length ? (
            <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.3) }}
                  >
                    <ProductCard product={p} priority={i < 3} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="font-serif text-3xl">No encontramos productos</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Probá quitando algunos filtros o buscando con otras palabras.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setQ("");
                  router.replace(pathname, { scroll: false });
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="left">
          <div className="flex h-[72px] shrink-0 items-center border-b px-6">
            <SheetTitle className="font-serif text-2xl font-normal">Filtros</SheetTitle>
            <SheetDescription className="sr-only">Filtrá el catálogo</SheetDescription>
          </div>
          <div className="flex-1 overflow-y-auto px-6">{filtersPanel}</div>
          <div className="grid shrink-0 grid-cols-2 gap-2 border-t p-4">
            <Button
              variant="outline"
              onClick={() => {
                setQ("");
                router.replace(pathname, { scroll: false });
              }}
            >
              Limpiar
            </Button>
            <Button onClick={() => setFiltersOpen(false)}>Ver {results.length}</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Check({
  checked,
  onChange,
  children,
  radio,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  radio?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          "grid size-4 shrink-0 place-items-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
          radio && "rounded-full",
          checked ? "border-ink bg-ink" : "border-input bg-white",
        )}
      >
        {checked && <span className={cn("bg-white", radio ? "size-1.5 rounded-full" : "size-1.5")} />}
      </span>
      {children}
    </label>
  );
}
