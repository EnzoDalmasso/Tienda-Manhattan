import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full min-w-0 border border-input bg-white px-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-foreground disabled:opacity-50 aria-invalid:border-destructive md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("mb-1.5 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground", className)}
      {...props}
    />
  );
}

export { Input, Label };
