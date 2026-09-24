"use client";

import { useEffect, useState } from "react";

/** Evita diferencias de hidratación al leer estado persistido en localStorage. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
