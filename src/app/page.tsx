import { Hero } from "@/components/home/hero";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { Categories } from "@/components/home/categories";
import { ProductShowcase } from "@/components/home/product-showcase";
import { ProductRail } from "@/components/home/product-rail";
import { PromoBanner } from "@/components/home/promo-banner";
import { Newsletter } from "@/components/home/newsletter";
import { Benefits, BranchesTeaser, Editorial, InstagramFeed, Testimonials } from "@/components/home/sections";
import { getNewArrivals, getProducts, getProductsByTag } from "@/lib/services/catalog";

export default async function HomePage() {
  const [featured, bestSellers, newArrivals, all] = await Promise.all([
    getProductsByTag("destacado"),
    getProductsByTag("mas-vendido"),
    getNewArrivals(8),
    getProducts(),
  ]);
  const onSale = all.filter((p) => p.compareAtPrice);

  return (
    <>
      <Hero />
      <BrandMarquee />
      <Benefits />
      <Categories />
      <ProductShowcase
        tabs={[
          { id: "destacados", label: "Destacados", products: featured, href: "/catalogo" },
          { id: "vendidos", label: "Más vendidos", products: bestSellers, href: "/catalogo?sort=mas-vendidos" },
          { id: "oferta", label: "En oferta", products: onSale, href: "/catalogo?oferta=1" },
        ]}
      />
      <ProductRail
        eyebrow="Recién llegados"
        title={
          <>
            Nuevos <em className="text-gold">ingresos</em>
          </>
        }
        description="Las últimas prendas que llegaron a nuestros locales. Stock limitado."
        products={newArrivals}
        href="/catalogo?sort=novedades"
      />
      <PromoBanner />
      <Editorial />
      <Testimonials />
      <BranchesTeaser />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
