import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Toaster } from "sonner";
import { Header, HeaderSpacer } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SITE } from "@/lib/data/store";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Manhattan — Moda femenina en Cañada de Gómez",
    template: "%s · Manhattan",
  },
  description: SITE.description,
  keywords: ["Manhattan", "Cañada de Gómez", "moda femenina", "boutique", "Liarte", "Ossira", "Vesna", "Drop Denim", "ropa de mujer"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Manhattan",
    title: "Manhattan — Vestir bien nunca pasa de moda",
    description: SITE.description,
    images: [{ url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&h=630&q=80", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#141312",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "Manhattan",
  url: SITE.url,
  slogan: SITE.tagline,
  sameAs: [SITE.instagram],
  address: { "@type": "PostalAddress", addressLocality: "Cañada de Gómez", addressRegion: "Santa Fe", addressCountry: "AR" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <HeaderSpacer />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast: "!rounded-none !border-border !bg-white !font-sans !shadow-xl",
              title: "!text-[13px] !font-medium",
              description: "!text-muted-foreground",
            },
          }}
        />
      </body>
    </html>
  );
}
