import { IUser } from "@/lib/hooks/useNav";
import { create } from "zustand";

interface ProfileUserStore {
  userData?: IUser;
  setUserData: (user: IUser) => void;
}

export const useProfileUserStore = create<ProfileUserStore>((set) => ({
  setUserData: (user) => set({ userData: user }),
}));
