import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/store";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/checkout", "/carrito"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
