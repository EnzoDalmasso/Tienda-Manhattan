"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMG } from "@/lib/data/images";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const words = ["Vestir", "bien", "nunca", "pasa", "de", "moda."];

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          className="absolute inset-0"
        >
          <Image
            src={IMG.heroTrench}
            alt="Nueva colección Manhattan: trench camel"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%]"
          />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

      <motion.div style={{ opacity }} className="container-x relative flex h-full flex-col justify-end pb-20 sm:pb-24 lg:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="eyebrow mb-5 text-gold-light"
        >
          Primavera · Verano 2026
        </motion.p>

        <h1 className="heading-display max-w-4xl text-[52px] text-white sm:text-7xl lg:text-8xl xl:text-[124px]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className={`mr-[0.22em] inline-block ${w === "moda." ? "italic text-gold-light" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 1, ease: EASE }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-[15px] leading-relaxed text-white/80">
            Nueva colección de Liarte, Ossira, Vesna y Drop Denim. Prendas seleccionadas para mujeres que eligen la
            elegancia todos los días.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="light" size="lg">
              <Link href="/catalogo?sort=novedades">
                Ver nueva colección <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href="/catalogo?oferta=1">Sale hasta 30% OFF</Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/60 lg:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
