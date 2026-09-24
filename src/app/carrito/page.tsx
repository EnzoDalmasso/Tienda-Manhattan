import type { Metadata } from "next";
import { CartPageView } from "@/components/checkout/cart-page";

export const metadata: Metadata = { title: "Carrito", robots: { index: false } };

export default function CartPage() {
  return <CartPageView />;
}
