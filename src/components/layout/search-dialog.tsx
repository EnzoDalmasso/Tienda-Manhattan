"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PRODUCTS } from "@/lib/data/products";
import { CATEGORIES } from "@/lib/data/store";
import { filterProducts } from "@/lib/services/catalog";
import { formatPrice } from "@/lib/utils";

const SUGGESTIONS = ["Trench", "Vestido", "Jean", "Blazer", "Cartera", "Lino"];

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => (q.trim().length > 1 ? filterProducts(PRODUCTS, { q }).slice(0, 6) : []), [q]);

  const close = () => {
    onOpenChange(false);
    setQ("");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(o) : close())}>
      <DialogContent className="top-0 max-w-none translate-y-0 p-0 data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4 sm:top-0 sm:p-0 md:top-24 md:max-w-2xl">
        <DialogTitle className="sr-only">Buscar productos</DialogTitle>
        <DialogDescription className="sr-only">Escribí para buscar en el catálogo</DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/catalogo?q=${encodeURIComponent(q)}`);
            close();
          }}
          className="flex items-center gap-3 border-b px-5 pr-14 sm:px-6 sm:pr-16"
        >
          <Search className="size-5 text-muted-foreground" strokeWidth={1.4} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className="h-16 flex-1 bg-transparent font-serif text-2xl outline-none placeholder:text-muted-foreground/60"
          />
        </form>

        <div className="max-h-[65dvh] overflow-y-auto p-5 sm:p-6">
          {q.trim().length < 2 ? (
            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-3">Búsquedas populares</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQ(s)}
                      className="cursor-pointer border border-border px-4 py-2 text-sm transition-colors hover:border-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-3">Categorías</p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {CATEGORIES.map((c) => (
                    <Link key={c.slug} href={`/catalogo?categoria=${c.slug}`} onClick={close} className="link-underline w-fit">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length ? (
            <div className="space-y-1">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/producto/${p.slug}`}
                  onClick={close}
                  className="flex items-center gap-4 p-2 transition-colors hover:bg-secondary"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-secondary">
                    <Image src={p.images[0]} alt={p.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.brand}</p>
                    <p className="truncate font-serif text-lg">{p.name}</p>
                    <p className="text-sm">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))}
              <Link
                href={`/catalogo?q=${encodeURIComponent(q)}`}
                onClick={close}
                className="mt-3 flex items-center justify-center gap-2 border-t pt-4 text-[11px] font-medium uppercase tracking-[0.2em]"
              >
                Ver todos los resultados <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <p className="py-10 text-center text-muted-foreground">No encontramos resultados para “{q}”.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
