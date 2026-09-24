import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/data/store";
import { Reveal, SectionHeading } from "@/components/shared/reveal";
import { PRODUCTS } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const LAYOUT = [
  "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1 lg:col-span-1",
  "col-span-1 row-span-1",
];

export function Categories() {
  const featured = ["vestidos", "sacos-abrigos", "blusas-camisas", "denim", "carteras-accesorios"]
    .map((slug) => CATEGORIES.find((c) => c.slug === slug)!)
    .filter(Boolean);

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Explorá"
        title={
          <>
            Comprá por <em className="text-gold">categoría</em>
          </>
        }
        description="Desde la sastrería impecable hasta el denim perfecto: todo lo que necesitás para armar tu guardarropa."
      />

      <div className="grid auto-rows-[200px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[300px]">
        {featured.map((c, i) => {
          const count = PRODUCTS.filter((p) => p.category === c.slug).length;
          return (
            <Reveal key={c.slug} delay={i * 0.08} className={cn(LAYOUT[i], "h-full")}>
              <Link href={`/catalogo?categoria=${c.slug}`} className="group relative block h-full overflow-hidden bg-secondary">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white sm:p-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">{count} productos</p>
                    <h3 className={cn("font-serif leading-none", i === 0 ? "mt-2 text-4xl sm:text-5xl" : "mt-1.5 text-2xl sm:text-3xl")}>
                      {c.name}
                    </h3>
                    {i === 0 && <p className="mt-2 hidden text-sm text-white/75 sm:block">{c.description}</p>}
                  </div>
                  <span className="grid size-10 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
