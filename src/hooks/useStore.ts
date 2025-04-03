import { create } from "zustand";

interface CounterState {
  page: number;
  increasePage: () => void;
  decreasePage: () => void;
  reset:() => void;
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
