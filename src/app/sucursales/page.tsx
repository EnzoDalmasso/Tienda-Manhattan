import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppIcon } from "@/components/shared/icons";
import { BRANCHES } from "@/lib/data/store";
import { IMG } from "@/lib/data/images";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sucursales",
  description: "Visitá nuestras dos sucursales en Cañada de Gómez. Direcciones, horarios, mapa y WhatsApp.",
  alternates: { canonical: "/sucursales" },
};

export default function BranchesPage() {
  return (
    <>
      <section className="relative h-[42vh] min-h-[320px] overflow-hidden bg-ink">
        <Image src={IMG.storeRack} alt="Interior de Manhattan" fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <div className="container-x relative flex h-full flex-col justify-end pb-12 text-white">
          <p className="eyebrow mb-3 text-gold-light">Cañada de Gómez · Santa Fe</p>
          <h1 className="heading-display text-5xl sm:text-7xl">Nuestras sucursales</h1>
        </div>
      </section>

      <div className="container-x space-y-20 py-20 sm:space-y-28 sm:py-28">
        {BRANCHES.map((b, i) => (
          <section key={b.id} id={b.id} className="scroll-mt-36 grid gap-8 lg:grid-cols-2 lg:gap-14">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={b.image} alt={b.name} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex flex-col">
              <p className="eyebrow mb-3">Sucursal {String(i + 1).padStart(2, "0")}</p>
              <h2 className="heading-display text-5xl">{b.name}</h2>
              <ul className="mt-8 space-y-5 text-[15px]">
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.4} />
                  <span>
                    {b.address}
                    <span className="block text-sm text-muted-foreground">{b.city}</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.4} />
                  <span className="space-y-1">
                    {b.hours.map((h) => (
                      <span key={h.days} className="block">
                        <span className="font-medium">{h.days}:</span> <span className="text-muted-foreground">{h.time}</span>
                      </span>
                    ))}
                    <span className="block text-sm text-muted-foreground">Domingos cerrado</span>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Phone className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.4} />
                  <span>{b.phone}</span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={whatsappLink(b.whatsapp, `Hola ${b.name}! Quería hacer una consulta.`)} target="_blank" rel="noopener">
                    <WhatsAppIcon /> Escribinos
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`} target="_blank" rel="noopener">
                    Abrir en Google Maps
                  </a>
                </Button>
              </div>
              <div className="mt-8 aspect-[16/9] w-full overflow-hidden border bg-secondary">
                <iframe
                  title={`Mapa ${b.name}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(b.mapQuery)}&z=16&output=embed`}
                  className="h-full w-full grayscale-[0.6]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </section>
        ))}
      </div>
    </>
  );
}
