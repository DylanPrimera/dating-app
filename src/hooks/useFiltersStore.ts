/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserFilters } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FilterState {
  filters: UserFilters;
  setFilters: (filterName: keyof FilterState["filters"], value: any) => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      filters: {
        ageRange: [18, 45],
        gender: ["male", "female"],
        orderBy: "",
        withPhoto: true,
      },
      setFilters: (filterName, value) =>
        set((state) => {
          return {
            filters: { ...state.filters, [filterName]: value },
          };
        }),
    }),
    {
      name: "filter-store",
    }
  )
);
