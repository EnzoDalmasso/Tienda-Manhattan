import { BRANDS } from "@/lib/data/store";

export function BrandMarquee() {
  const items = [...BRANDS, ...BRANDS, ...BRANDS];
  return (
    <section aria-label="Marcas" className="overflow-hidden border-b bg-ivory py-6 sm:py-8">
      <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused]">
        {[...items, ...items].map((b, i) => (
          <div key={i} className="flex items-center">
            <span className="px-8 font-serif text-3xl uppercase tracking-[0.25em] text-ink/80 sm:px-12 sm:text-4xl">
              {b.name}
            </span>
            <span className="text-gold">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
