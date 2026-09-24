"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { AnnouncementBar } from "./announcement-bar";
import { MobileMenu } from "./mobile-menu";
import { SearchDialog } from "./search-dialog";
import { NAV } from "./nav";
import { useCart, selectCount } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const hydrated = useHydrated();
  const count = useCart(selectCount);
  const openCart = useCart((s) => s.open);
  const wishCount = useWishlist((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  const iconBtn =
    "relative grid size-10 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/5";

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40">
        <AnnouncementBar />
        <header
          className={cn(
            "transition-all duration-500",
            transparent
              ? "bg-transparent text-white"
              : "border-b border-border/70 bg-background/90 text-ink shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-xl",
          )}
        >
          <div
            className={cn(
              "container-x grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500",
              scrolled ? "h-16" : "h-[72px] lg:h-20",
            )}
          >
            <div className="flex items-center gap-1">
              <button className={cn(iconBtn, "xl:hidden")} onClick={() => setMenuOpen(true)} aria-label="Abrir menú">
                <Menu className="size-[22px]" strokeWidth={1.4} />
              </button>
              <nav className="hidden items-center gap-7 xl:flex 2xl:gap-9" aria-label="Principal">
                {NAV.slice(0, 4).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="link-underline text-[11px] font-medium uppercase tracking-[0.2em]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Logo tone={transparent ? "light" : "dark"} />

            <div className="flex items-center justify-end gap-0.5 sm:gap-1">
              <nav className="mr-4 hidden items-center gap-7 xl:flex 2xl:gap-9">
                {NAV.slice(4).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "link-underline text-[11px] font-medium uppercase tracking-[0.2em]",
                      item.label === "Sale" && (transparent ? "text-gold-light" : "text-[#8c2a2a]"),
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <button className={iconBtn} onClick={() => setSearchOpen(true)} aria-label="Buscar">
                <Search className="size-5" strokeWidth={1.4} />
              </button>
              <Link href="/favoritos" className={cn(iconBtn, "hidden sm:grid")} aria-label="Favoritos">
                <Heart className="size-5" strokeWidth={1.4} />
                {hydrated && wishCount > 0 && <Counter value={wishCount} light={transparent} />}
              </Link>
              <button className={iconBtn} onClick={openCart} aria-label="Abrir carrito">
                <ShoppingBag className="size-5" strokeWidth={1.4} />
                {hydrated && count > 0 && <Counter value={count} light={transparent} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

function Counter({ value, light }: { value: number; light?: boolean }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full text-[9px] font-semibold",
          light ? "bg-white text-ink" : "bg-gold text-ink",
        )}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

/** Compensa el header fijo en todas las páginas excepto la home (donde el hero va detrás). */
export function HeaderSpacer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div aria-hidden className="h-[108px] lg:h-[116px]" />;
}
