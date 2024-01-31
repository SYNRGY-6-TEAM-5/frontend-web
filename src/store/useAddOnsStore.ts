import { create } from "zustand";

type Store = {
  isSelecting: boolean;
  type?: string;
  flight?: string;
  setSelect: (select: boolean) => void;
  setType: (type: string) => void;
  setFlight: (flight: string) => void;
};

export const useAddOnsStore = create<Store>()((set) => ({
  isSelecting: false,
  setSelect: (select) => set({ isSelecting: select }),
  setType: (type) => set({ type }),
  setFlight: (flight) => set({ flight }),
}));
