import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Emblem } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <Emblem className="h-4 text-gold" />
      <p className="heading-display mt-6 text-8xl">404</p>
      <h1 className="mt-4 font-serif text-3xl">Esta página pasó de moda</h1>
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">
        No encontramos lo que buscabas, pero tenemos mucho más para mostrarte.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/catalogo">Ver colección</Link>
      </Button>
    </div>
  );
}
