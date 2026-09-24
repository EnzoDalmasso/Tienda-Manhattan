"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeading } from "@/components/shared/reveal";

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  href,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  products: Product[];
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={
            <div className="flex items-center gap-4">
              {href && (
                <Link href={href} className="link-underline text-[11px] font-medium uppercase tracking-[0.2em]">
                  Ver todo
                </Link>
              )}
              <div className="hidden gap-2 md:flex">
                <button
                  onClick={() => scroll(-1)}
                  aria-label="Anterior"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-border transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <ArrowLeft className="size-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => scroll(1)}
                  aria-label="Siguiente"
                  className="grid size-11 cursor-pointer place-items-center rounded-full border border-border transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          }
        />
      </div>
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto scroll-smooth px-4 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:scroll-px-10 lg:px-10 xl:px-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[62%] shrink-0 snap-start sm:w-[38%] md:w-[30%] lg:w-[23%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
