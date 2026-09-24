import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Star } from "lucide-react";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductCard } from "@/components/product/product-card";
import { Reveal, SectionHeading } from "@/components/shared/reveal";
import { getCategory, getProductBySlug, getProducts, getRelatedProducts } from "@/lib/services/catalog";
import { SITE, TESTIMONIALS } from "@/lib/data/store";
import { totalStock } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.brand === "Manhattan" ? product.name : `${product.name} — ${product.brand}`,
    description: product.description,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: { title: product.name, description: product.description, images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, category] = await Promise.all([getRelatedProducts(product, 4), getCategory(product.category)]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/producto/${product.slug}`,
      priceCurrency: "ARS",
      price: product.price,
      availability: totalStock(product.stock) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 py-5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-ink">
            Inicio
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/catalogo" className="hover:text-ink">
            Catálogo
          </Link>
          {category && (
            <>
              <ChevronRight className="size-3" />
              <Link href={`/catalogo?categoria=${category.slug}`} className="hover:text-ink">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight className="size-3" />
          <span className="truncate text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-10 pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 xl:gap-24 [&>*]:min-w-0">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      <section id="opiniones" className="scroll-mt-32 border-t bg-ivory py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-3">Opiniones</p>
            <p className="font-serif text-7xl">{product.rating.toFixed(1)}</p>
            <div className="mt-2 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Basado en {product.reviews} opiniones</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.slice(0, 2).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="h-full bg-background p-6">
                  <div className="flex">
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <Star key={k} className="size-3 fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-3 font-serif text-lg leading-snug">“{t.text}”</blockquote>
                  <figcaption className="mt-4 text-xs text-muted-foreground">
                    {t.name} · Compra verificada
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x py-20 sm:py-24">
          <SectionHeading
            eyebrow="Completá tu look"
            title={
              <>
                También te puede <em className="text-gold">gustar</em>
              </>
            }
          />
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
