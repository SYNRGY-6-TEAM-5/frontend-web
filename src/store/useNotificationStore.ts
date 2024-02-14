import { Notif } from "@/pages/profile/pages/notification/components/Notification";
import { create } from "zustand";

type Store = {
  notifData: Notif[];
  setNotifData: (notifData: Notif[]) => void;
};

export const useNotificationStore = create<Store>()((set) => ({
  notifData: [],
  setNotifData: (notifData) => set({ notifData }),
}));
