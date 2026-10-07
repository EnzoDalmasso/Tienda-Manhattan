# Tienda Manhattan

Tienda online para Manhattan, un local de ropa de mujer de Cañada de Gómez (Santa Fe) que hoy vende por Instagram y WhatsApp. La armé como demo para mostrarles cómo podría verse su tienda propia, así que los productos, precios y fotos son de prueba.

## Con qué está hecha

Next.js 15 con App Router, TypeScript y Tailwind 4. Los componentes base siguen el estilo de shadcn/ui (sobre Radix), las animaciones son con Framer Motion y el carrito, los favoritos y la sucursal elegida viven en Zustand, guardados en localStorage. No hay backend todavía: todas las páginas se generan estáticas en el build.

## Qué se puede hacer

Recorrer el catálogo filtrando por categoría, talle, color, precio o marca (los filtros quedan en la URL, así que un link filtrado se puede compartir), entrar a un producto y ver el stock en cada una de las dos sucursales, armar el carrito y pasar por un checkout de tres pasos donde se elige retiro en local o envío y el medio de pago. El pago es simulado; al final muestra el número de pedido y no cobra nada.

También tiene página de sucursales con mapa y horarios, favoritos y un botón de WhatsApp que arma el mensaje con el producto que estás mirando.

## Correrla local

```bash
npm install
npm run dev
```

Queda en http://localhost:3000. Para chequear el build de producción: `npm run build`.

No hace falta ninguna variable de entorno. `NEXT_PUBLIC_SITE_URL` es opcional y solo se usa para el sitemap y las metaetiquetas.

## Cómo está organizada

Los componentes no leen los datos directo de los archivos: pasan por `src/lib/services/`, que hoy devuelve datos fijos de `src/lib/data/`. La idea es que el día que haya base de datos se cambie el contenido de esas funciones y el resto quede igual.

```
src/
  app/          páginas
  components/   ui/ (base), layout/, home/, catalog/, product/, checkout/
  lib/          tipos, datos de prueba y servicios
  store/        estado del carrito, favoritos y sucursal
```

## Seguridad

El repo no tiene claves ni credenciales y el `.gitignore` deja afuera cualquier `.env`. En producción el sitio manda cabeceras de seguridad (CSP, HSTS, X-Frame-Options, nosniff) configuradas en `next.config.ts`. Como todavía no hay base de datos ni pagos reales, el checkout no envía datos a ningún servidor.

Cuando se sumen integraciones, las claves privadas (Mercado Pago, la service role de Supabase) van como variables de entorno y se leen solo del lado del servidor, nunca con el prefijo `NEXT_PUBLIC_`.

## Pendiente

- Pasar productos, stock por sucursal y pedidos a Supabase.
- Cobro real con Mercado Pago, validando precio y stock en el servidor antes de crear el pago.
- Un panel para que el local cargue productos y actualice stock sin tocar código.
- Cargar las direcciones y horarios reales de los locales (los de la demo son inventados) y las fotos propias de la marca.
