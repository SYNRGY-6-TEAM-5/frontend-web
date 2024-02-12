import { UserSeat } from "@/types/CheckIn";
import { create } from "zustand";

type Store = {
  userData: UserSeat[];
  selectedUser?: number;
  setSelectedUser: (id: number) => void;
  setUserData: (data: UserSeat[]) => void;
  setChangeSeat: (seat: string) => void;
};

export const useCheckInStore = create<Store>()((set) => ({
  userData: [],
  setUserData: (data) => set({ userData: data }),
  setSelectedUser: (id) => set({ selectedUser: id }),
  setChangeSeat: (seatId) =>
    set((state) => ({
      userData: state.userData?.map((item) =>
        item.id === state.selectedUser ? { ...item, seat: seatId } : item,
      ),
    })),
}));
