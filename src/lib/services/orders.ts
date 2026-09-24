/**
 * Servicio de órdenes (DEMO).
 *
 * En producción, `createOrder` debería ser un Server Action / Route Handler que:
 *  1. Valide precios y stock contra la base (Supabase) — nunca confiar en el cliente.
 *  2. Inserte la orden en `orders` + `order_items` y reserve stock por sucursal.
 *  3. Cree la preferencia de pago (Mercado Pago) o el PaymentIntent (Stripe)
 *     y devuelva la URL/clientSecret para redirigir al pago.
 */
import type { CartItem } from "@/lib/types";
import type { PaymentMethodId } from "@/lib/data/store";
import { SITE } from "@/lib/data/store";

export type DeliveryMethod = "retiro" | "envio";

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
}

export interface ShippingAddress {
  street: string;
  number: string;
  apartment?: string;
  city: string;
  province: string;
  zip: string;
}

export interface OrderInput {
  customer: CheckoutCustomer;
  branchId: string;
  delivery: DeliveryMethod;
  address?: ShippingAddress;
  payment: PaymentMethodId;
  items: CartItem[];
  notes?: string;
}

export function calculateTotals(items: CartItem[], delivery: DeliveryMethod, payment: PaymentMethodId) {
  const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0);
  const shipping = delivery === "envio" && subtotal < SITE.freeShippingFrom ? SITE.shippingCost : 0;
  const discount = payment === "transferencia" ? Math.round(subtotal * SITE.transferDiscount) : 0;
  return { subtotal, shipping, discount, total: subtotal + shipping - discount };
}

export async function createOrder(input: OrderInput) {
  await new Promise((r) => setTimeout(r, 1400)); // simula latencia de red
  const totals = calculateTotals(input.items, input.delivery, input.payment);
  return {
    id: `MH-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    status: "pendiente_pago" as const,
    ...totals,
  };
}
