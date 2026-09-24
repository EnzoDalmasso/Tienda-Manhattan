import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, CreditCard, MapPin, RefreshCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/shared/reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/icons";
import { BRANCHES, INSTAGRAM_POSTS, SITE, TESTIMONIALS } from "@/lib/data/store";
import { IMG } from "@/lib/data/images";
import { formatPrice, whatsappLink } from "@/lib/utils";

/* ------------------------------ Editorial ------------------------------ */

export function Editorial() {
  return (
    <section className="container-x grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
      <Reveal className="relative">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={IMG.blazerStreet} alt="Lookbook Manhattan" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
        </div>
        <div className="absolute -bottom-8 -right-2 hidden aspect-[3/4] w-[42%] overflow-hidden border-[10px] border-background shadow-2xl sm:block lg:-right-12">
          <Image src={IMG.embroideredBlouse} alt="" fill sizes="20vw" className="object-cover" />
        </div>
      </Reveal>
      <Reveal delay={0.15} className="lg:pl-6">
        <p className="eyebrow mb-4">Lookbook · La esencia Manhattan</p>
        <h2 className="heading-display text-5xl sm:text-6xl xl:text-7xl">
          Elegancia que se <em className="text-gold">vive</em> todos los días
        </h2>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
          Hace más de tres años abrimos nuestras puertas en Cañada de Gómez con una idea simple: que cada mujer encuentre
          prendas de calidad, con asesoramiento cercano y un estilo que trascienda las tendencias.
        </p>
        <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-y py-6">
          {[
            ["+3", "años vistiendo mujeres"],
            ["5", "marcas seleccionadas"],
            ["2", "sucursales"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="font-serif text-4xl text-gold">{n}</dt>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground">{l}</dd>
            </div>
          ))}
        </dl>
        <Button asChild variant="outline" size="lg" className="mt-10">
          <Link href="/catalogo">
            Descubrir colección <ArrowRight />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Beneficios ------------------------------ */

const BENEFITS = [
  { icon: Truck, title: "Envío gratis", text: `En compras desde ${formatPrice(SITE.freeShippingFrom)} a todo el país` },
  { icon: CreditCard, title: `${SITE.installments} cuotas sin interés`, text: "Con todas las tarjetas bancarias" },
  { icon: RefreshCcw, title: "Cambios sin costo", text: "Hasta 30 días en cualquiera de nuestros locales" },
  { icon: ShieldCheck, title: "Compra segura", text: "Pagos protegidos con Mercado Pago" },
];

export function Benefits() {
  return (
    <section className="border-y bg-background">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <Reveal
            key={b.title}
            delay={i * 0.08}
            className="flex flex-col items-center gap-3 border-border px-3 py-10 text-center odd:border-r lg:border-r lg:last:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
          >
            <b.icon className="size-7 text-gold" strokeWidth={1.2} />
            <h3 className="font-serif text-xl">{b.title}</h3>
            <p className="max-w-[220px] text-xs leading-relaxed text-muted-foreground sm:text-sm">{b.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Opiniones ------------------------------ */

export function Testimonials() {
  return (
    <section className="bg-sand/50 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          align="center"
          eyebrow="Opiniones"
          title={
            <>
              Lo que dicen <em className="text-gold">nuestras clientas</em>
            </>
          }
        />
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="w-[82%] shrink-0 snap-center sm:w-auto">
              <figure className="flex h-full flex-col bg-background p-7 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:p-8">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="size-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug">“{t.text}”</blockquote>
                <figcaption className="mt-6 border-t pt-4 text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-muted-foreground"> · {t.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          <span className="font-serif text-2xl text-ink">4.9</span> / 5 · Basado en más de 600 opiniones verificadas
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ Sucursales ------------------------------ */

export function BranchesTeaser() {
  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        eyebrow="Visitanos"
        title={
          <>
            Dos locales, <em className="text-gold">una misma experiencia</em>
          </>
        }
        description="Te esperamos en Cañada de Gómez para asesorarte personalmente. Retirá tus compras online sin costo."
        action={
          <Link href="/sucursales" className="link-underline text-[11px] font-medium uppercase tracking-[0.2em]">
            Ver sucursales
          </Link>
        }
      />
      <div className="grid gap-6 md:grid-cols-2">
        {BRANCHES.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.1}>
            <article className="group relative overflow-hidden">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image src={b.image} alt={b.name} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <h3 className="font-serif text-3xl sm:text-4xl">{b.name}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="size-4 text-gold-light" strokeWidth={1.5} /> {b.address}, {b.city}
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-white/80">
                  <Clock className="size-4 text-gold-light" strokeWidth={1.5} /> {b.hours[0].time}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button asChild variant="light" size="sm">
                    <a href={whatsappLink(b.whatsapp, `Hola ${b.name}! Quería hacer una consulta.`)} target="_blank" rel="noopener">
                      <WhatsAppIcon /> WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline-light" size="sm">
                    <Link href={`/sucursales#${b.id}`}>Cómo llegar</Link>
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Instagram ------------------------------ */

export function InstagramFeed() {
  return (
    <section className="pb-20 pt-4 sm:pb-28">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col items-center text-center">
          <InstagramIcon className="mb-4 size-7 text-gold" />
          <p className="eyebrow mb-3">Seguinos en Instagram</p>
          <a href={SITE.instagram} target="_blank" rel="noopener" className="heading-display text-4xl hover:text-gold sm:text-5xl">
            {SITE.instagramHandle}
          </a>
        </Reveal>
      </div>
      <div className="grid grid-cols-3 gap-1 sm:gap-2 lg:grid-cols-6">
        {INSTAGRAM_POSTS.map((src, i) => (
          <a
            key={i}
            href={SITE.instagram}
            target="_blank"
            rel="noopener"
            className="group relative aspect-square overflow-hidden bg-secondary"
            aria-label="Ver publicación en Instagram"
          >
            <Image src={src} alt="" fill sizes="(min-width:1024px) 17vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/45">
              <InstagramIcon className="size-7 scale-75 text-white opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
