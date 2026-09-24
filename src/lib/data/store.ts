import type { Branch, Brand, Category } from "@/lib/types";
import { IMG } from "./images";

export const SITE = {
  name: "Manhattan",
  tagline: "Vestir bien nunca pasa de moda.",
  description:
    "Manhattan — boutique de moda femenina en Cañada de Gómez. Vestidos, sastrería, denim, tejidos y accesorios de Liarte, Ossira, Vesna y Drop Denim. Envíos a todo el país.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://manhattan-cdg.vercel.app",
  instagram: "https://www.instagram.com/manhattan.cdg/",
  instagramHandle: "@manhattan.cdg",
  whatsapp: "543471516409",
  email: "hola@manhattancdg.com.ar",
  freeShippingFrom: 150000,
  shippingCost: 8900,
  installments: 3,
  transferDiscount: 0.1,
} as const;

export const CATEGORIES: Category[] = [
  { slug: "vestidos", name: "Vestidos", description: "De día, de noche, para cada ocasión", image: IMG.redFlowingDress },
  { slug: "blusas-camisas", name: "Blusas & Camisas", description: "Básicos que elevan", image: IMG.whiteBlouse },
  { slug: "sacos-abrigos", name: "Sacos & Abrigos", description: "Sastrería con carácter", image: IMG.heroTrench },
  { slug: "denim", name: "Denim & Pantalones", description: "El calce perfecto", image: IMG.foldedJeans },
  { slug: "tejidos", name: "Tejidos", description: "Texturas que abrigan", image: IMG.creamKnit },
  { slug: "faldas", name: "Faldas", description: "Movimiento y femineidad", image: IMG.whiteSkirt },
  { slug: "carteras-accesorios", name: "Carteras & Accesorios", description: "El detalle que define", image: IMG.redBag },
];

export const BRANDS: Brand[] = [
  { slug: "manhattan", name: "Manhattan" },
  { slug: "liarte", name: "Liarte" },
  { slug: "ossira", name: "Ossira" },
  { slug: "vesna", name: "Vesna" },
  { slug: "drop-denim", name: "Drop Denim" },
];

/**
 * Sucursales. Direcciones y horarios son DATOS DEMO:
 * reemplazar con la información real antes de publicar.
 */
export const BRANCHES: Branch[] = [
  {
    id: "central",
    name: "Manhattan Centro",
    address: "Lavalle 1040",
    city: "Cañada de Gómez, Santa Fe",
    hours: [
      { days: "Lunes a viernes", time: "9:00 – 12:30 · 16:30 – 20:30" },
      { days: "Sábados", time: "9:00 – 13:00 · 17:00 – 21:00" },
    ],
    whatsapp: "543471516409",
    phone: "03471 51-6409",
    mapQuery: "Lavalle 1040, Cañada de Gómez, Santa Fe, Argentina",
    image: IMG.storeInterior,
  },
  {
    id: "boulevard",
    name: "Manhattan Boulevard",
    address: "Bv. Balcarce 875",
    city: "Cañada de Gómez, Santa Fe",
    hours: [
      { days: "Lunes a viernes", time: "9:30 – 13:00 · 17:00 – 21:00" },
      { days: "Sábados", time: "10:00 – 13:30 · 17:00 – 21:00" },
    ],
    whatsapp: "543471516409",
    phone: "03471 51-6409",
    mapQuery: "Bv. Balcarce 875, Cañada de Gómez, Santa Fe, Argentina",
    image: IMG.storeBoutique,
  },
];

export const TESTIMONIALS = [
  {
    name: "Carolina M.",
    location: "Cañada de Gómez",
    text: "La atención es un lujo. Me asesoraron para un casamiento y salí con el look completo. Siempre vuelvo.",
    rating: 5,
  },
  {
    name: "Silvina R.",
    location: "Rosario",
    text: "Compré por WhatsApp y me llegó en dos días, perfectamente empaquetado. La calidad de las prendas es excelente.",
    rating: 5,
  },
  {
    name: "Marcela G.",
    location: "Armstrong",
    text: "Encuentro marcas que no hay en otro lado. El trench camel es mi prenda favorita del invierno.",
    rating: 5,
  },
  {
    name: "Lucía P.",
    location: "Las Rosas",
    text: "Hermoso local, prendas divinas y las chicas súper atentas. El cambio de talle fue rapidísimo.",
    rating: 5,
  },
];

export const INSTAGRAM_POSTS = [
  IMG.darkCoatStreet,
  IMG.redBag,
  IMG.whiteDressStreet,
  IMG.embroideredBlouse,
  IMG.hatWhite,
  IMG.rackNeutral,
];

export const PAYMENT_METHODS = [
  { id: "mercadopago", name: "Mercado Pago", description: "Tarjetas, dinero en cuenta y cuotas" },
  { id: "tarjeta", name: "Tarjeta de crédito / débito", description: `Hasta ${SITE.installments} cuotas sin interés` },
  { id: "transferencia", name: "Transferencia bancaria", description: `${SITE.transferDiscount * 100}% OFF abonando por transferencia` },
  { id: "efectivo", name: "Efectivo en el local", description: "Solo con retiro en sucursal" },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];

export const SIZE_GUIDE = {
  ropa: {
    headers: ["Talle", "Busto (cm)", "Cintura (cm)", "Cadera (cm)"],
    rows: [
      ["XS", "80 – 84", "62 – 66", "86 – 90"],
      ["S", "84 – 88", "66 – 70", "90 – 94"],
      ["M", "88 – 92", "70 – 74", "94 – 98"],
      ["L", "92 – 98", "74 – 80", "98 – 104"],
      ["XL", "98 – 104", "80 – 86", "104 – 110"],
    ],
  },
  denim: {
    headers: ["Talle", "Cintura (cm)", "Cadera (cm)", "Largo (cm)"],
    rows: [
      ["36", "64 – 67", "88 – 91", "100"],
      ["38", "68 – 71", "92 – 95", "101"],
      ["40", "72 – 75", "96 – 99", "102"],
      ["42", "76 – 79", "100 – 103", "103"],
      ["44", "80 – 84", "104 – 108", "104"],
      ["46", "85 – 89", "109 – 113", "105"],
    ],
  },
};
