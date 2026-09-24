"use client";

import { Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SIZE_GUIDE } from "@/lib/data/store";

export function SizeGuide({ type }: { type: "ropa" | "denim" }) {
  const table = SIZE_GUIDE[type];
  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer items-center gap-1.5 text-xs underline underline-offset-4 hover:text-gold">
        <Ruler className="size-3.5" strokeWidth={1.5} /> Guía de talles
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle className="font-serif text-3xl font-normal">Guía de talles</DialogTitle>
        <DialogDescription className="mt-2 text-sm text-muted-foreground">
          Medidas del cuerpo en centímetros. Si estás entre dos talles, te recomendamos elegir el mayor.
        </DialogDescription>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {table.headers.map((h) => (
                  <th key={h} className="py-3 pr-4 text-left text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((r) => (
                <tr key={r[0]} className="border-b last:border-0 even:bg-secondary/50">
                  {r.map((c, i) => (
                    <td key={i} className={`py-3 pr-4 ${i === 0 ? "font-medium" : "tabular-nums"}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 bg-secondary p-4 text-sm leading-relaxed">
          <p className="font-medium">¿Cómo medirte?</p>
          <p className="mt-1 text-muted-foreground">
            <strong>Busto:</strong> por la parte más prominente. <strong>Cintura:</strong> por la parte más angosta.{" "}
            <strong>Cadera:</strong> por la parte más ancha, con los pies juntos.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
