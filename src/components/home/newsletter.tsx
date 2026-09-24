"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Emblem } from "@/components/shared/logo";
import { Reveal } from "@/components/shared/reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="grain relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-gold/10 blur-3xl" />
      <Reveal className="container-x relative flex flex-col items-center text-center">
        <Emblem className="mb-6 h-4 text-gold" />
        <h2 className="heading-display max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
          Sumate al <em className="text-gold-light">Club Manhattan</em>
        </h2>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65">
          Enterate primero de los nuevos ingresos, preventas exclusivas y recibí un{" "}
          <strong className="font-medium text-white">10% OFF</strong> en tu primera compra.
        </p>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 flex items-center gap-3 text-gold-light"
            >
              <span className="grid size-8 place-items-center rounded-full bg-gold text-ink">
                <Check className="size-4" />
              </span>
              ¡Listo! Te enviamos tu código de bienvenida.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0, y: -10 }}
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: conectar con proveedor de email marketing / tabla `subscribers` en Supabase
                setDone(true);
              }}
              className="mt-10 flex w-full max-w-md border-b border-white/30 focus-within:border-gold"
            >
              <label htmlFor="nl-email" className="sr-only">
                Email
              </label>
              <input
                id="nl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                className="flex cursor-pointer items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-white"
              >
                Suscribirme <ArrowRight className="size-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <p className="mt-4 text-xs text-white/35">Sin spam. Podés darte de baja cuando quieras.</p>
      </Reveal>
    </section>
  );
}
