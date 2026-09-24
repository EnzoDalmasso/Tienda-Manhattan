"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Aparición suave al entrar en viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
}) {
  return (
    <Reveal
      className={
        align === "center"
          ? "mx-auto mb-10 max-w-2xl text-center sm:mb-14"
          : "mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between"
      }
    >
      <div>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
        {description && (
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </Reveal>
  );
}
