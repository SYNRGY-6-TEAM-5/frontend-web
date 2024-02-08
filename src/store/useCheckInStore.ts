import { UserSeat } from "@/types/CheckIn";
import { create } from "zustand";

const dataCheckIn: UserSeat[] = [
  {
    id: 1,
    nama: "Bella Hadid",
    seat: "",
  },
  {
    id: 2,
    nama: "Jack Harris",
    seat: "",
  },
  {
    id: 3,
    nama: "Jack Morton",
    seat: "",
  },
];

type Store = {
  userData: UserSeat[];
  selectedUser?: number;
  setSelectedUser: (id: number) => void;
  setUserData: (seat: string) => void;
};

export const useCheckInStore = create<Store>()((set) => ({
  userData: dataCheckIn,
  selectedUser: dataCheckIn[0].id,
  setSelectedUser: (id) => set({ selectedUser: id }),
  setUserData: (seatId) =>
    set((state) => ({
      userData: state.userData.map((item) =>
        item.id === state.selectedUser ? { ...item, seat: seatId } : item,
      ),
    })),
}));
