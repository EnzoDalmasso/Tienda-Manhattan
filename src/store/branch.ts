"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BRANCHES } from "@/lib/data/store";

interface BranchState {
  branchId: string;
  setBranch: (id: string) => void;
}

export const useBranch = create<BranchState>()(
  persist((set) => ({ branchId: BRANCHES[0].id, setBranch: (branchId) => set({ branchId }) }), {
    name: "manhattan-branch",
  }),
);
