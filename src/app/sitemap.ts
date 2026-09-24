import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/services/catalog";
import { CATEGORIES, SITE } from "@/lib/data/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/catalogo`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/sucursales`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...CATEGORIES.map((c) => ({
      url: `${SITE.url}/catalogo?categoria=${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${SITE.url}/producto/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
