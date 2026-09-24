"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SITE, BRANCHES } from "@/lib/data/store";
import { formatPrice } from "@/lib/utils";
import { useBranch } from "@/store/branch";
import { useHydrated } from "@/hooks/use-hydrated";

const MESSAGES = [
  `Envío gratis en compras desde ${formatPrice(SITE.freeShippingFrom)}`,
  `${SITE.installments} cuotas sin interés con todas las tarjetas`,
  `${SITE.transferDiscount * 100}% OFF pagando por transferencia`,
  "Retiro gratis en nuestras 2 sucursales",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const hydrated = useHydrated();
  const { branchId, setBranch } = useBranch();

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-9 overflow-hidden bg-ink text-[11px] tracking-[0.14em] text-white/90">
      <div className="container-x flex h-full items-center justify-center lg:justify-between">
        <p className="hidden items-center gap-2 text-white/60 lg:flex">
          <span className="text-gold">✦</span> {SITE.tagline}
        </p>
        <div className="relative h-full w-full max-w-md lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 flex items-center justify-center text-center uppercase"
            >
              {MESSAGES[i]}
            </motion.p>
          </AnimatePresence>
        </div>
        <label className="hidden items-center gap-1.5 text-white/70 lg:flex">
          <MapPin className="size-3.5 text-gold" strokeWidth={1.5} />
          <span className="sr-only">Sucursal</span>
          <select
            value={hydrated ? branchId : BRANCHES[0].id}
            onChange={(e) => setBranch(e.target.value)}
            className="cursor-pointer bg-transparent uppercase outline-none [&>option]:text-ink"
          >
            {BRANCHES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
