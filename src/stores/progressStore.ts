"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TrickStatus } from "@/types";
import { computeAvailability, tricks } from "@/data/relations";

interface ProgressState {
  /** status[id] = 'learning' | 'mastered' | undefined (treated as derived) */
  status: Record<string, "learning" | "mastered">;
  notes: Record<string, string>;
  hydrated: boolean;
  setStatus: (id: string, s: TrickStatus) => void;
  setNote: (id: string, note: string) => void;
  reset: () => void;
  exportJSON: () => string;
  importJSON: (json: string) => boolean;
  setHydrated: () => void;
  /** Devuelve el estado derivado (locked/available/learning/mastered) por id */
  getDerived: () => Record<string, TrickStatus>;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      status: {},
      notes: {},
      hydrated: false,
      setStatus: (id, s) =>
        set((state) => {
          if (s === "available" || s === "locked") {
            const next = { ...state.status };
            delete next[id];
            return { status: next };
          }
          return { status: { ...state.status, [id]: s } };
        }),
      setNote: (id, note) =>
        set((state) => {
          const next = { ...state.notes };
          if (note.trim() === "") {
            delete next[id];
          } else {
            next[id] = note;
          }
          return { notes: next };
        }),
      reset: () => set({ status: {}, notes: {} }),
      exportJSON: () => {
        const { status, notes } = get();
        return JSON.stringify(
          {
            version: 1,
            exportedAt: new Date().toISOString(),
            status,
            notes,
          },
          null,
          2
        );
      },
      importJSON: (json) => {
        try {
          const parsed = JSON.parse(json);
          if (
            !parsed ||
            typeof parsed !== "object" ||
            typeof parsed.status !== "object" ||
            typeof parsed.notes !== "object"
          ) {
            return false;
          }
          // Validar ids existentes
          const validStatus: Record<string, "learning" | "mastered"> = {};
          for (const [id, value] of Object.entries(parsed.status)) {
            if (
              tricks.some((t) => t.id === id) &&
              (value === "learning" || value === "mastered")
            ) {
              validStatus[id] = value;
            }
          }
          const validNotes: Record<string, string> = {};
          for (const [id, value] of Object.entries(parsed.notes)) {
            if (tricks.some((t) => t.id === id) && typeof value === "string") {
              validNotes[id] = value;
            }
          }
          set({ status: validStatus, notes: validNotes });
          return true;
        } catch {
          return false;
        }
      },
      setHydrated: () => set({ hydrated: true }),
      getDerived: () => {
        const raw = get().status;
        const merged: Record<string, TrickStatus> = {};
        for (const t of tricks) {
          merged[t.id] = (raw[t.id] as TrickStatus) ?? "available";
        }
        return computeAvailability(merged);
      },
    }),
    {
      name: "trickdex-progress",
      storage: createJSONStorage(() => {
        if (typeof window === "undefined") {
          // SSR/SSG fallback inerte
          return {
            getItem: () => null,
            setItem: () => undefined,
            removeItem: () => undefined,
          };
        }
        return window.localStorage;
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
      partialize: (state) => ({ status: state.status, notes: state.notes }),
    }
  )
);

/** Hook seguro para SSR: no rompe cuando Zustand aún no hidrató */
export function useIsHydrated() {
  return useProgressStore((s) => s.hydrated);
}
