import { cn, discountPercent, formatPrice } from "@/lib/utils";

export function Price({
  price,
  compareAt,
  className,
  size = "sm",
}: {
  price: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "lg";
}) {
  const off = discountPercent(price, compareAt);
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-medium tabular-nums", size === "lg" ? "text-2xl" : "text-[15px]")}>
        {formatPrice(price)}
      </span>
      {off > 0 && (
        <>
          <span className={cn("text-muted-foreground line-through tabular-nums", size === "lg" ? "text-base" : "text-xs")}>
            {formatPrice(compareAt!)}
          </span>
          <span className={cn("font-medium text-[#8c2a2a]", size === "lg" ? "text-sm" : "text-xs")}>{off}% OFF</span>
        </>
      )}
    </div>
  );
}
