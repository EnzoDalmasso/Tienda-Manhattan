import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { Emblem } from "@/components/shared/logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/icons";
import { BRANCHES, CATEGORIES, SITE } from "@/lib/data/store";
import { whatsappLink } from "@/lib/utils";

const HELP = [
  { href: "/sucursales", label: "Sucursales y horarios" },
  { href: "/carrito", label: "Mi carrito" },
  { href: "/favoritos", label: "Mis favoritos" },
  { href: "/catalogo", label: "Guía de talles" },
  { href: "/catalogo", label: "Cambios y devoluciones" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:py-20">
        <div className="space-y-6">
          <div className="inline-flex flex-col items-center gap-1.5">
            <Emblem className="h-3 text-gold" />
            <span className="font-serif text-3xl tracking-[0.22em] text-white">MANHATTAN</span>
          </div>
          <p className="max-w-xs font-serif text-xl italic text-white/70">“{SITE.tagline}”</p>
          <p className="max-w-sm text-sm leading-relaxed text-white/50">
            Boutique de moda femenina en Cañada de Gómez. Seleccionamos marcas y prendas para que te sientas
            elegante todos los días.
          </p>
          <div className="flex gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-[18px]" />
            </a>
            <a
              href={whatsappLink(SITE.whatsapp)}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
            >
              <WhatsAppIcon className="size-[18px]" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="Email"
              className="grid size-10 place-items-center rounded-full border border-white/20 transition-colors hover:border-gold hover:text-gold"
            >
              <Mail className="size-[18px]" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <FooterCol title="Tienda">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link href={`/catalogo?categoria=${c.slug}`} className="link-underline">
                {c.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Ayuda">
          {HELP.map((h) => (
            <li key={h.label}>
              <Link href={h.href} className="link-underline">
                {h.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <div>
          <h3 className="eyebrow mb-6">Nuestros locales</h3>
          <div className="space-y-6">
            {BRANCHES.map((b) => (
              <div key={b.id} className="space-y-1.5 text-sm">
                <p className="font-serif text-lg text-white">{b.name}</p>
                <p className="flex items-start gap-2 text-white/60">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                  {b.address}, {b.city}
                </p>
                <p className="flex items-start gap-2 text-white/60">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                  {b.hours[0].days}: {b.hours[0].time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} Manhattan · Cañada de Gómez, Santa Fe. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Visa", "Mastercard", "Amex", "Mercado Pago", "Transferencia"].map((m) => (
              <span key={m} className="border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/55">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="eyebrow mb-6">{title}</h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}
