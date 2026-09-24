"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Landmark, Loader2, Lock, MapPin, Store, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Emblem } from "@/components/shared/logo";
import { useCart } from "@/store/cart";
import { useBranch } from "@/store/branch";
import { useHydrated } from "@/hooks/use-hydrated";
import { BRANCHES, PAYMENT_METHODS, SITE, type PaymentMethodId } from "@/lib/data/store";
import {
  calculateTotals,
  createOrder,
  type CheckoutCustomer,
  type DeliveryMethod,
  type ShippingAddress,
} from "@/lib/services/orders";
import { cn, formatPrice, whatsappLink } from "@/lib/utils";

const STEPS = ["Datos", "Entrega", "Pago"] as const;
const PAY_ICONS: Record<PaymentMethodId, typeof CreditCard> = {
  mercadopago: Wallet,
  tarjeta: CreditCard,
  transferencia: Landmark,
  efectivo: Store,
};

export function CheckoutView() {
  const hydrated = useHydrated();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const { branchId, setBranch } = useBranch();

  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState<CheckoutCustomer>({ firstName: "", lastName: "", email: "", phone: "", dni: "" });
  const [delivery, setDelivery] = useState<DeliveryMethod>("retiro");
  const [address, setAddress] = useState<ShippingAddress>({ street: "", number: "", apartment: "", city: "", province: "Santa Fe", zip: "" });
  const [payment, setPayment] = useState<PaymentMethodId>("mercadopago");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);
  const [placedItems, setPlacedItems] = useState(items);

  const totals = calculateTotals(items, delivery, payment);
  const branch = BRANCHES.find((b) => b.id === branchId) ?? BRANCHES[0];

  if (!hydrated) return <div className="min-h-[70vh]" />;

  if (order) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="grid size-20 place-items-center rounded-full bg-gold text-ink"
        >
          <Check className="size-9" strokeWidth={1.5} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="eyebrow mt-8">Pedido {order.id}</p>
          <h1 className="heading-display mt-3 text-5xl sm:text-6xl">¡Gracias, {customer.firstName || "por tu compra"}!</h1>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Recibimos tu pedido por <strong className="text-ink">{formatPrice(order.total)}</strong>. Te enviamos la
            confirmación a <strong className="text-ink">{customer.email || "tu email"}</strong>.{" "}
            {delivery === "retiro"
              ? `Te avisamos por WhatsApp cuando esté listo para retirar en ${branch.name}.`
              : "Te compartiremos el seguimiento del envío apenas sea despachado."}
          </p>
          <p className="mx-auto mt-4 max-w-md bg-secondary px-4 py-3 text-xs text-muted-foreground">
            Esta es una demo: no se realizó ningún cobro. {placedItems.length} producto(s) procesado(s).
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/catalogo">Seguir comprando</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={whatsappLink(branch.whatsapp, `Hola! Hice el pedido ${order.id} en la web.`)} target="_blank" rel="noopener">
                Consultar por WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <p className="font-serif text-4xl">No hay productos en tu carrito</p>
        <Button asChild size="lg">
          <Link href="/catalogo">Ir a la tienda</Link>
        </Button>
      </div>
    );
  }

  const validCustomer =
    customer.firstName && customer.lastName && /\S+@\S+\.\S+/.test(customer.email) && customer.phone.length >= 8;
  const validDelivery = delivery === "retiro" || (address.street && address.number && address.city && address.zip);
  const canContinue = [validCustomer, validDelivery, true][step];

  const submit = async () => {
    setLoading(true);
    const result = await createOrder({ customer, branchId, delivery, address: delivery === "envio" ? address : undefined, payment, items });
    setPlacedItems(items);
    setOrder({ id: result.id, total: result.total });
    clear();
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-x pb-24">
      <div className="flex flex-col gap-6 border-b py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow mb-2 flex items-center gap-2">
            <Lock className="size-3" /> Checkout seguro
          </p>
          <h1 className="heading-display text-4xl sm:text-5xl">Finalizar compra</h1>
        </div>
        <ol className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] sm:gap-4">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn("flex items-center gap-2", i < step && "cursor-pointer")}
              >
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full border text-[11px] transition-colors",
                    i < step ? "border-gold bg-gold text-ink" : i === step ? "border-ink bg-ink text-white" : "border-border text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={cn(i === step ? "text-ink" : "text-muted-foreground", "hidden sm:inline")}>{s}</span>
              </button>
              {i < STEPS.length - 1 && <span className="h-px w-6 bg-border sm:w-10" />}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-12 pt-10 lg:grid-cols-[1fr_420px] lg:gap-16 [&>*]:min-w-0">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              {step === 0 && (
                <fieldset className="min-w-0 space-y-6">
                  <legend className="mb-6 font-serif text-3xl">Tus datos</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nombre" id="firstName">
                      <Input id="firstName" autoComplete="given-name" value={customer.firstName} onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })} />
                    </Field>
                    <Field label="Apellido" id="lastName">
                      <Input id="lastName" autoComplete="family-name" value={customer.lastName} onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })} />
                    </Field>
                    <Field label="Email" id="email">
                      <Input id="email" type="email" autoComplete="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                    </Field>
                    <Field label="Teléfono / WhatsApp" id="phone">
                      <Input id="phone" type="tel" autoComplete="tel" placeholder="3471 000000" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                    </Field>
                    <Field label="DNI (opcional)" id="dni">
                      <Input id="dni" inputMode="numeric" value={customer.dni} onChange={(e) => setCustomer({ ...customer, dni: e.target.value })} />
                    </Field>
                  </div>
                  <label className="flex items-center gap-3 text-sm text-muted-foreground">
                    <input type="checkbox" defaultChecked className="size-4 accent-[var(--ink)]" /> Quiero recibir novedades y promociones
                  </label>
                </fieldset>
              )}

              {step === 1 && (
                <fieldset className="min-w-0 space-y-8">
                  <legend className="mb-6 font-serif text-3xl">Método de entrega</legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Option
                      active={delivery === "retiro"}
                      onClick={() => setDelivery("retiro")}
                      icon={Store}
                      title="Retiro en local"
                      subtitle="Gratis · Listo en 24 hs"
                    />
                    <Option
                      active={delivery === "envio"}
                      onClick={() => {
                        setDelivery("envio");
                        if (payment === "efectivo") setPayment("mercadopago");
                      }}
                      icon={Truck}
                      title="Envío a domicilio"
                      subtitle={totals.subtotal >= SITE.freeShippingFrom ? "Gratis · 2 a 5 días hábiles" : `${formatPrice(SITE.shippingCost)} · 2 a 5 días hábiles`}
                    />
                  </div>

                  <div>
                    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em]">
                      {delivery === "retiro" ? "¿Dónde querés retirar?" : "Sucursal que despacha tu pedido"}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {BRANCHES.map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBranch(b.id)}
                          className={cn(
                            "cursor-pointer border p-4 text-left transition-colors",
                            branchId === b.id ? "border-ink bg-white" : "border-border hover:border-ink/50",
                          )}
                        >
                          <span className="flex items-start justify-between">
                            <span className="font-serif text-xl">{b.name}</span>
                            <span className={cn("grid size-5 place-items-center rounded-full border", branchId === b.id && "border-ink bg-ink")}>
                              {branchId === b.id && <span className="size-1.5 rounded-full bg-white" />}
                            </span>
                          </span>
                          <span className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                            <MapPin className="size-3.5" /> {b.address}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">{b.hours[0].days}: {b.hours[0].time}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {delivery === "envio" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid gap-4 sm:grid-cols-6">
                      <Field label="Calle" id="street" className="sm:col-span-4">
                        <Input id="street" autoComplete="address-line1" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                      </Field>
                      <Field label="Número" id="number" className="sm:col-span-2">
                        <Input id="number" value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} />
                      </Field>
                      <Field label="Piso / Depto" id="apt" className="sm:col-span-2">
                        <Input id="apt" value={address.apartment} onChange={(e) => setAddress({ ...address, apartment: e.target.value })} />
                      </Field>
                      <Field label="Ciudad" id="city" className="sm:col-span-2">
                        <Input id="city" autoComplete="address-level2" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                      </Field>
                      <Field label="Código postal" id="zip" className="sm:col-span-2">
                        <Input id="zip" autoComplete="postal-code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                      </Field>
                      <Field label="Provincia" id="province" className="sm:col-span-6">
                        <Input id="province" value={address.province} onChange={(e) => setAddress({ ...address, province: e.target.value })} />
                      </Field>
                    </motion.div>
                  )}
                </fieldset>
              )}

              {step === 2 && (
                <fieldset className="min-w-0 space-y-6">
                  <legend className="mb-6 font-serif text-3xl">Método de pago</legend>
                  <div className="grid gap-3">
                    {PAYMENT_METHODS.map((m) => {
                      const disabled = m.id === "efectivo" && delivery === "envio";
                      return (
                        <Option
                          key={m.id}
                          active={payment === m.id}
                          disabled={disabled}
                          onClick={() => setPayment(m.id)}
                          icon={PAY_ICONS[m.id]}
                          title={m.name}
                          subtitle={disabled ? "Disponible solo con retiro en local" : m.description}
                          horizontal
                        />
                      );
                    })}
                  </div>
                  <div className="flex items-start gap-3 bg-secondary p-4 text-sm text-muted-foreground">
                    <Lock className="mt-0.5 size-4 shrink-0 text-gold" />
                    {payment === "mercadopago" || payment === "tarjeta"
                      ? "Al confirmar serás redirigida a la plataforma de pago segura para completar la operación."
                      : payment === "transferencia"
                        ? "Te enviaremos los datos bancarios por email y WhatsApp. Reservamos tu pedido por 48 hs."
                        : "Abonás en efectivo al momento de retirar en la sucursal."}
                  </div>
                </fieldset>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between border-t pt-6">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="flex cursor-pointer items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]">
                <ArrowLeft className="size-4" /> Volver
              </button>
            ) : (
              <Link href="/carrito" className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]">
                <ArrowLeft className="size-4" /> Carrito
              </Link>
            )}
            {step < STEPS.length - 1 ? (
              <Button size="lg" disabled={!canContinue} onClick={() => setStep(step + 1)}>
                Continuar
              </Button>
            ) : (
              <Button size="lg" onClick={submit} disabled={loading} className="min-w-52">
                {loading ? <Loader2 className="animate-spin" /> : <Lock />}
                {loading ? "Procesando..." : `Pagar ${formatPrice(totals.total)}`}
              </Button>
            )}
          </div>
        </div>

        {/* Resumen */}
        <aside className="h-fit bg-ivory p-6 sm:p-8 lg:sticky lg:top-[140px]">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl">Tu pedido</h2>
            <Emblem className="h-3 text-gold" />
          </div>
          <ul className="mt-6 max-h-72 space-y-4 overflow-y-auto pr-1">
            {items.map((i) => (
              <li key={i.key} className="flex gap-4">
                <div className="relative h-20 w-16 shrink-0 bg-secondary">
                  <Image src={i.image} alt={i.name} fill sizes="64px" className="object-cover" />
                  <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-ink text-[10px] text-white">{i.quantity}</span>
                </div>
                <div className="min-w-0 flex-1 text-sm">
                  <p className="truncate font-serif text-lg leading-tight">{i.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {i.color.name} · Talle {i.size}
                  </p>
                </div>
                <p className="text-sm tabular-nums">{formatPrice(i.price * i.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t pt-6 text-sm">
            <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
            <Row
              label={delivery === "retiro" ? `Retiro en ${branch.name}` : "Envío"}
              value={totals.shipping === 0 ? "Gratis" : formatPrice(totals.shipping)}
            />
            {totals.discount > 0 && <Row label="Descuento transferencia (10%)" value={`− ${formatPrice(totals.discount)}`} accent />}
            <div className="flex items-baseline justify-between border-t pt-4">
              <dt className="uppercase tracking-[0.16em]">Total</dt>
              <dd className="text-2xl font-medium tabular-nums">{formatPrice(totals.total)}</dd>
            </div>
          </dl>
          {(customer.firstName || step > 0) && (
            <div className="mt-6 space-y-1 border-t pt-6 text-xs text-muted-foreground">
              {customer.firstName && (
                <p>
                  <span className="text-ink">Cliente:</span> {customer.firstName} {customer.lastName} · {customer.email}
                </p>
              )}
              <p>
                <span className="text-ink">Entrega:</span>{" "}
                {delivery === "retiro" ? `Retiro en ${branch.name} (${branch.address})` : `Envío a domicilio${address.city ? ` · ${address.city}` : ""}`}
              </p>
              {step === 2 && (
                <p>
                  <span className="text-ink">Pago:</span> {PAYMENT_METHODS.find((m) => m.id === payment)?.name}
                </p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({ label, id, children, className }: { label: string; id: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("tabular-nums", accent && "text-[#3c6e47]")}>{value}</dd>
    </div>
  );
}

function Option({
  active,
  onClick,
  icon: Icon,
  title,
  subtitle,
  disabled,
  horizontal,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof CreditCard;
  title: string;
  subtitle: string;
  disabled?: boolean;
  horizontal?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex cursor-pointer gap-4 border p-5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-45",
        horizontal ? "items-center" : "flex-col",
        active ? "border-ink bg-white" : "border-border hover:border-ink/50",
      )}
    >
      <span className={cn("grid size-11 shrink-0 place-items-center rounded-full", active ? "bg-ink text-white" : "bg-secondary")}>
        <Icon className="size-5" strokeWidth={1.4} />
      </span>
      <span className="flex-1">
        <span className="block font-medium">{title}</span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{subtitle}</span>
      </span>
      {horizontal && (
        <span className={cn("grid size-5 place-items-center rounded-full border", active && "border-ink bg-ink")}>
          {active && <span className="size-1.5 rounded-full bg-white" />}
        </span>
      )}
    </button>
  );
}
