"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  productName,
  className,
  variant = "floating",
}: {
  productId: string;
  productName: string;
  className?: string;
  variant?: "floating" | "outline";
}) {
  const hydrated = useHydrated();
  const active = useWishlist((s) => s.ids.includes(productId)) && hydrated;
  const toggle = useWishlist((s) => s.toggle);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      aria-pressed={active}
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggle(productId);
        toast(added ? "Agregado a favoritos" : "Quitado de favoritos", { description: productName });
      }}
      className={cn(
        "grid cursor-pointer place-items-center transition-colors",
        variant === "floating"
          ? "size-9 rounded-full bg-white/95 shadow-sm hover:bg-white"
          : "size-13 border border-foreground/80 hover:bg-secondary",
        className,
      )}
    >
      <Heart
        className={cn("size-[18px] transition-colors", active ? "fill-[#8c2a2a] text-[#8c2a2a]" : "text-ink")}
        strokeWidth={1.5}
      />
    </motion.button>
  );
}
