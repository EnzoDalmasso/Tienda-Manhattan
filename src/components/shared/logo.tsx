import Link from "next/link";
import { cn } from "@/lib/utils";

/** Emblema "M" con alas, inspirado en el isologo de la marca. */
export function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 20" aria-hidden className={cn("h-3 w-auto", className)} fill="currentColor">
      <rect x="0" y="8.2" width="20" height="1.1" rx=".5" />
      <rect x="4" y="10.9" width="16" height="1.1" rx=".5" />
      <rect x="44" y="8.2" width="20" height="1.1" rx=".5" />
      <rect x="44" y="10.9" width="16" height="1.1" rx=".5" />
      <ellipse cx="32" cy="10" rx="10.5" ry="9" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M26.4 14.4V5.8h1.3l4.3 5.6 4.3-5.6h1.3v8.6h-1.6V8.6L32 13.4l-3.9-4.8v5.8z" />
    </svg>
  );
}

export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Manhattan — Inicio"
      className={cn(
        "group inline-flex flex-col items-center gap-1 leading-none",
        tone === "light" ? "text-white" : "text-ink",
        className,
      )}
    >
      <Emblem className="h-2.5 text-gold transition-transform duration-500 group-hover:scale-110 sm:h-3" />
      <span className="font-serif text-[22px] font-medium tracking-[0.22em] sm:text-[26px]">MANHATTAN</span>
    </Link>
  );
}
