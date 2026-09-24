"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { IMG } from "@/lib/data/images";

/** Fin de la promo: siempre el próximo domingo a las 23:59 (demo evergreen). */
function nextSunday() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7));
  d.setHours(23, 59, 59, 0);
  return d.getTime();
}

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = nextSunday();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  if (left == null) return null;
  const s = Math.floor(left / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function PromoBanner() {
  const t = useCountdown();
  const units = [
    { label: "Días", v: t?.d },
    { label: "Horas", v: t?.h },
    { label: "Min", v: t?.m },
    { label: "Seg", v: t?.s },
  ];

  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[380px] sm:min-h-[480px] lg:min-h-[640px]">
          <Image src={IMG.redFlowingDress} alt="Sale de temporada" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/30" />
        </div>
        <div className="relative flex items-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
          <Reveal className="max-w-lg">
            <p className="eyebrow mb-5 text-gold-light">Sale de temporada</p>
            <h2 className="heading-display text-5xl sm:text-6xl xl:text-7xl">
              Hasta <span className="italic text-gold-light">30% OFF</span> en prendas seleccionadas
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/70">
              Vestidos, tejidos y camperas con descuentos exclusivos. Además, 10% extra pagando por transferencia.
              Stock limitado por sucursal.
            </p>

            <div className="mt-8 flex gap-3 sm:gap-4" aria-live="polite">
              {units.map((u) => (
                <div key={u.label} className="flex w-16 flex-col items-center border border-white/15 py-3 sm:w-20">
                  <span className="font-serif text-3xl tabular-nums sm:text-4xl">
                    {u.v == null ? "--" : String(u.v).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/50">{u.label}</span>
                </div>
              ))}
            </div>

            <Button asChild variant="gold" size="lg" className="mt-10">
              <Link href="/catalogo?oferta=1">
                Comprar sale <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
