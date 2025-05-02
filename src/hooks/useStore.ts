import { create } from "zustand";

interface IPagination {
  page: number;
  refresh: boolean;
  increasePage: () => void;
  decreasePage: () => void;
  reset: () => void;
  refreshFunction: () => void;
}

interface ISearchState {
  search: string;
  setSearch: (value: string) => void;
}

export interface IToken {
  token: string;
  setToken: (token: string) => void;
}
export interface IRefreshComponent {
  refresh: boolean;
  refreshFunction: () => void;
}

export interface IRefreshClientComponent {
  refreshClient: boolean;
  refreshFunctionClient: () => void;
}

export interface IRefreshIpAdressApi {
  refresh: boolean;
  refreshFunction: () => void;
}

export interface IRefreshTemporaryClient {
  refreshTemporaryClient: boolean;
  refreshFunctionTemporaryClient: () => void;
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

export const useStoreSearch = create<ISearchState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));

export const useStoreToken = create<IToken>((set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
}));

export const useRefreshComponent = create<IRefreshComponent>((set) => ({
  refresh: false,
  refreshFunction: () => set((state) => ({ refresh: !state.refresh })),
}));

export const useRefreshClientComponent = create<IRefreshClientComponent>(
  (set) => ({
    refreshClient: false,
    refreshFunctionClient: () =>
      set((state) => ({ refreshClient: !state.refreshClient })),
  })
);

export const useRefreshTemporaryClientComponent =
  create<IRefreshTemporaryClient>((set) => ({
    refreshTemporaryClient: false,
    refreshFunctionTemporaryClient: () =>
      set((state) => ({
        refreshTemporaryClient: !state.refreshTemporaryClient,
      })),
  }));

export const useRefreshIpAdressApi = create<IRefreshIpAdressApi>((set) => ({
  refresh: false,
  refreshFunction: () => set((state) => ({ refresh: !state.refresh })),
}));

export const useStoreIpAddressPagination = create<IPagination>((set) => ({
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
