"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductShowcase({ tabs }: { tabs: { id: string; label: string; products: Product[]; href: string }[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="bg-ivory py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col items-center text-center sm:mb-14">
          <p className="eyebrow mb-3">Selección Manhattan</p>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl">
            Las prendas <em className="text-gold">del momento</em>
          </h2>
          <div role="tablist" className="mt-8 flex gap-1 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative cursor-pointer px-4 pb-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors sm:px-6",
                  active === t.id ? "text-ink" : "text-muted-foreground hover:text-ink",
                )}
              >
                {t.label}
                {active === t.id && (
                  <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-ink" />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4"
          >
            {current.products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-14 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href={current.href}>
              Ver todo <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
