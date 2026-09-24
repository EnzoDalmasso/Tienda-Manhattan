import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/catalog-view";
import { getProducts } from "@/lib/services/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Vestidos, sastrería, denim, tejidos y accesorios. Filtrá por categoría, talle, color y precio.",
  alternates: { canonical: "/catalogo" },
};

export default async function CatalogPage() {
  const products = await getProducts();
  return (
    <Suspense>
      <CatalogView products={products} />
    </Suspense>
  );
}
