import { create } from "zustand";

export type DateRange = "7d" | "30d" | "90d";

interface OverviewDateRangeStore {
  date: DateRange;
  setDate: (range: DateRange) => void;
}

export const useOverviewDateRange = create<OverviewDateRangeStore>((set) => ({
  date: "7d",
  setDate: (range) => set({ date: range }),
}));
