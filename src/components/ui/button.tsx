import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.18em] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        gold: "bg-gold text-ink hover:bg-gold-light",
        outline: "border border-foreground/80 bg-transparent hover:bg-foreground hover:text-background",
        "outline-light": "border border-white/80 bg-transparent text-white hover:bg-white hover:text-ink",
        light: "bg-white text-ink hover:bg-ivory",
        secondary: "bg-secondary text-secondary-foreground hover:bg-sand",
        ghost: "text-sm normal-case tracking-normal hover:bg-secondary",
        link: "normal-case tracking-normal text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-13 px-8",
        icon: "size-10 tracking-normal",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
