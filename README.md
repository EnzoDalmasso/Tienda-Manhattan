# Manhattan — Tienda online (demo)

E-commerce demo de **Manhattan**, boutique de moda femenina en Cañada de Gómez (Santa Fe).
*"Vestir bien nunca pasa de moda."*

## Stack

- **Next.js 15** (App Router, SSG) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + componentes estilo **shadcn/ui** (Radix)
- **Framer Motion** para animaciones · **Lucide** para íconos
- **Zustand** (carrito, favoritos y sucursal persistidos en `localStorage`)
- `next/image` (AVIF/WebP), `next/font`, metadata SEO, JSON-LD, `sitemap.xml` y `robots.txt`

## Correr localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run typecheck
```

## Deploy en Vercel

1. Subir el repo a GitHub.
2. En Vercel → *Add New Project* → importar el repo (se detecta Next.js automáticamente).
3. Variable de entorno: `NEXT_PUBLIC_SITE_URL` = URL final (para SEO y sitemap).

No requiere base de datos ni claves para la demo.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Hero, marcas, beneficios, categorías, destacados / más vendidos / ofertas, nuevos ingresos, sale con cuenta regresiva, lookbook, opiniones, sucursales, Instagram, newsletter |
| `/catalogo` | Grilla con filtros (categoría, precio, talle, color, marca, oferta), búsqueda y orden. Filtros sincronizados en la URL (links compartibles) |
| `/producto/[slug]` | Galería con zoom y lightbox, variantes de color/talle, guía de talles, **stock por sucursal**, WhatsApp, relacionados |
| `/carrito` | Edición de cantidades, cupón, resumen |
| `/checkout` | 3 pasos: datos → entrega (retiro en sucursal / envío) → pago (Mercado Pago, tarjeta, transferencia -10%, efectivo) |
| `/sucursales` | Dirección, horarios, mapa embebido y WhatsApp de cada local |
| `/favoritos` | Wishlist |

## Estructura

```
src/
  app/                  rutas (App Router)
  components/
    ui/                 primitivas estilo shadcn (button, sheet, dialog, accordion…)
    layout/             header, footer, drawer de carrito, búsqueda, WhatsApp
    home/ catalog/ product/ checkout/ shared/
  lib/
    types.ts            modelos de dominio (Product, Branch, CartItem…)
    data/               datos demo (productos, sucursales, imágenes)
    services/           capa de acceso a datos (catalog.ts, orders.ts)
  store/                estado cliente (zustand)
```

## Antes de publicar (datos a reemplazar)

- **Direcciones y horarios de las sucursales** en `src/lib/data/store.ts` → son de ejemplo.
- **WhatsApp**: se usa el de la bio de Instagram (`543471516409`) para ambos locales.
- **Fotos**: son de Unsplash (placeholder). Reemplazar por fotos propias en `src/lib/data/images.ts`.
- **Productos y precios**: ficticios, en `src/lib/data/products.ts`.

## Hoja de ruta hacia producción

La UI no lee datos directamente: todo pasa por `src/lib/services/*`, con funciones `async`.
Para conectar un backend real sólo se reemplaza el cuerpo de esas funciones.

1. **Supabase**: tablas `products`, `product_variants`, `branches`, `stock (variant_id, branch_id, qty)`,
   `orders`, `order_items`, `subscribers`. Imágenes en Supabase Storage.
2. **Pagos**: `createOrder` (`lib/services/orders.ts`) → pasar a Server Action que valide precios/stock
   en servidor y cree la preferencia de **Mercado Pago** (o PaymentIntent de **Stripe**). Webhook para confirmar pago.
3. **Stock**: descontar/reservar por sucursal al confirmar la orden.
4. **Panel de administración**: `/admin` protegido con Supabase Auth (ABM de productos, stock por sucursal, pedidos).
5. **Newsletter**: conectar el formulario a la tabla `subscribers` o a un proveedor de email marketing.
