import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium uppercase leading-none tracking-[0.18em]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        sale: "bg-[#8c2a2a] text-white",
        gold: "bg-gold text-ink",
        light: "bg-white text-ink",
        outline: "border border-border text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
