import { useState } from "react";
import { create } from "zustand";

interface CounterState {
  page: number;
  increasePage: () => void;
  decreasePage: () => void;
  reset:() => void;
}

interface SearchState {
  search: string;
  setSearch: (value: string) => void;
}

export const useStorePagination = create<CounterState>((set) => ({
  page: 1,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () =>
    set((state) => ({
      page: state.page > 1 ? state.page - 1 : 1,
    })),
  reset: () => set({ page: 1})
}));

export const useStoreSearch = create<SearchState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));
