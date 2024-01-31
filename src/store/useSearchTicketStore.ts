import { create } from "zustand";

interface SearchTicketStore {
  isFetchedAfterMount: boolean;
  setIsFetchedAfterMount: (arg0: boolean) => void;
}

export const useSearchTicketStore = create<SearchTicketStore>((set) => ({
  isFetchedAfterMount: false,
  setIsFetchedAfterMount: (value: boolean) =>
    set({ isFetchedAfterMount: value }),
}));
