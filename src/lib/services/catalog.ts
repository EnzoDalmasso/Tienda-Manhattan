/**
 * Capa de acceso a datos del catálogo.
 *
 * Hoy lee de datos estáticos en memoria. Todas las funciones son async a propósito:
 * para conectar Supabase sólo hay que reemplazar el cuerpo de cada función
 * (p. ej. `supabase.from("products").select("*")`) sin tocar los componentes.
 */
import { PRODUCTS } from "@/lib/data/products";
import { CATEGORIES } from "@/lib/data/store";
import type { Product, ProductFilters } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return PRODUCTS.find((p) => p.slug === slug);
}

export async function getProductsByTag(tag: Product["tags"][number], limit = 8) {
  return PRODUCTS.filter((p) => p.tags.includes(tag)).slice(0, limit);
}

export async function getNewArrivals(limit = 8) {
  return [...PRODUCTS].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const same = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category && p.brand === product.brand);
  return [...same, ...others].slice(0, limit);
}

export async function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Filtrado + ordenamiento puro (usable en cliente o servidor). */
export function filterProducts(products: Product[], f: ProductFilters): Product[] {
  const q = f.q?.trim().toLowerCase();
  let list = products.filter((p) => {
    if (q && !`${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(q)) return false;
    if (f.categories?.length && !f.categories.includes(p.category)) return false;
    if (f.brands?.length && !f.brands.includes(p.brand)) return false;
    if (f.sizes?.length && !p.sizes.some((s) => f.sizes!.includes(s))) return false;
    if (f.colors?.length && !p.colors.some((c) => f.colors!.includes(c.name))) return false;
    if (f.minPrice != null && p.price < f.minPrice) return false;
    if (f.maxPrice != null && p.price > f.maxPrice) return false;
    if (f.onSale && !p.compareAtPrice) return false;
    return true;
  });

  switch (f.sort) {
    case "precio-asc":
      list = [...list].sort((a, b) => a.price - b.price);
      break;
    case "precio-desc":
      list = [...list].sort((a, b) => b.price - a.price);
      break;
    case "novedades":
      list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case "mas-vendidos":
      list = [...list].sort((a, b) => b.reviews - a.reviews);
      break;
    default:
      list = [...list].sort((a, b) => Number(b.tags.includes("destacado")) - Number(a.tags.includes("destacado")));
  }
  return list;
}
