/**
 * Modelos de dominio de la tienda.
 * Están pensados para mapear 1:1 con tablas de Supabase/Postgres en el futuro
 * (products, product_variants, branches, stock, orders).
 */

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "U" | "36" | "38" | "40" | "42" | "44" | "46";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Brand {
  slug: string;
  name: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  /** Precio anterior (si existe, el producto está en oferta). */
  compareAtPrice?: number;
  description: string;
  details: string[];
  images: string[];
  colors: ProductColor[];
  sizes: Size[];
  /** Stock por sucursal: branchId -> unidades */
  stock: Record<string, number>;
  tags: ("nuevo" | "destacado" | "mas-vendido" | "oferta")[];
  rating: number;
  reviews: number;
  createdAt: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: { days: string; time: string }[];
  whatsapp: string;
  phone: string;
  mapQuery: string;
  image: string;
}

export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  size: Size;
  color: ProductColor;
  quantity: number;
}

export type SortOption = "relevancia" | "novedades" | "precio-asc" | "precio-desc" | "mas-vendidos";

export interface ProductFilters {
  q?: string;
  categories?: string[];
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  sort?: SortOption;
}
