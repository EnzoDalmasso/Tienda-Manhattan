"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/shared/icons";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { CATEGORIES, SITE } from "@/lib/data/store";
import { whatsappLink } from "@/lib/utils";
import { NAV } from "./nav";

export function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetTitle className="sr-only">Menú</SheetTitle>
        <SheetDescription className="sr-only">Navegación principal de la tienda</SheetDescription>
        <div className="flex h-[72px] items-center border-b px-6">
          <Logo className="items-start" />
        </div>

        <nav className="flex flex-col px-6 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-center justify-between border-b border-border/60 py-4 font-serif text-2xl"
            >
              {item.label}
              <ArrowRight className="size-4 text-muted-foreground" strokeWidth={1.4} />
            </Link>
          ))}
        </nav>

        <div className="px-6 py-4">
          <p className="eyebrow mb-4">Categorías</p>
          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/catalogo?categoria=${c.slug}`}
                onClick={close}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <Image src={c.image} alt={c.name} fill sizes="45vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-sm text-white">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-3 border-t bg-secondary/60 px-6 py-6 text-sm">
          <Link href="/favoritos" onClick={close} className="flex items-center gap-3">
            <Heart className="size-4" strokeWidth={1.5} /> Mis favoritos
          </Link>
          <Link href="/sucursales" onClick={close} className="flex items-center gap-3">
            <MapPin className="size-4" strokeWidth={1.5} /> Nuestras sucursales
          </Link>
          <a href={whatsappLink(SITE.whatsapp)} target="_blank" rel="noopener" className="flex items-center gap-3">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
          <a href={SITE.instagram} target="_blank" rel="noopener" className="flex items-center gap-3">
            <InstagramIcon className="size-4" /> {SITE.instagramHandle}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
