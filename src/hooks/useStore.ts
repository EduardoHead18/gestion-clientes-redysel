import { create } from "zustand";

interface IPagination {
  page: number;
  refresh: boolean;
  increasePage: () => void;
  decreasePage: () => void;
  reset: () => void;
  refreshFunction: () => void;
}

interface SearchState {
  search: string;
  setSearch: (value: string) => void;
}

export const useStorePagination = create<IPagination>((set) => ({
  page: 1,
  refresh: false,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () =>
    set((state) => ({
      page: state.page > 1 ? state.page - 1 : 1,
    })),
  reset: () => set({ page: 1 }),
  refreshFunction: () => set((state) => ({ refresh: !state.refresh })),
}));

export const useStoreSearch = create<SearchState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));
