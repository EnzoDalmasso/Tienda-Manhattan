"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse gap-3 lg:flex-row lg:gap-4">
      {/* Miniaturas */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto lg:w-20 lg:flex-col lg:overflow-visible">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            aria-label={`Ver imagen ${i + 1}`}
            className={cn(
              "relative aspect-[3/4] w-16 shrink-0 cursor-pointer overflow-hidden bg-secondary transition-opacity lg:w-full",
              index === i ? "opacity-100 ring-1 ring-ink ring-offset-2" : "opacity-55 hover:opacity-100",
            )}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Imagen principal con zoom */}
      <div
        className="group relative aspect-[3/4] flex-1 cursor-zoom-in overflow-hidden bg-secondary"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
        onClick={() => setLightbox(true)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={images[index]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${name} — imagen ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-200 ease-out"
              style={
                zoom
                  ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : { transform: "scale(1)" }
              }
            />
          </motion.div>
        </AnimatePresence>

        <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 px-3 py-2 text-[10px] uppercase tracking-[0.2em] opacity-100 backdrop-blur transition-opacity group-hover:opacity-0">
          <Expand className="size-3.5" /> <span className="hidden sm:inline">Pasá el mouse para hacer zoom</span>
          <span className="sm:hidden">Tocá para ampliar</span>
        </span>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 lg:hidden"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90 lg:hidden"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      <Dialog open={lightbox} onOpenChange={setLightbox}>
        <DialogContent className="h-[92dvh] max-w-[min(92vw,1100px)] bg-ink p-0 sm:p-0">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <DialogDescription className="sr-only">Imagen ampliada</DialogDescription>
          <div className="relative h-full w-full">
            <Image src={images[index]} alt={name} fill sizes="92vw" className="object-contain" />
            <button
              onClick={() => go(-1)}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Siguiente"
              className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/90"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
