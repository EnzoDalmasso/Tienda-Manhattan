"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/shared/icons";
import { SITE } from "@/lib/data/store";
import { whatsappLink } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappLink(SITE.whatsapp, "¡Hola Manhattan! Quisiera hacer una consulta 😊")}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 bg-white px-4 py-2 text-xs font-medium opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block">
        ¿Te ayudamos a elegir?
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)]">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.5s]" />
        <WhatsAppIcon className="relative size-7" />
      </span>
    </motion.a>
  );
}
