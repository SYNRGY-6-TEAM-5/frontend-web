import { create } from 'zustand';


type SavedPassengerStore = {
    selected_passenger_id: number;
    isAddingPassenger: boolean;
    setSelectedPassengerId: (passenger_id: number) => void;
    setIsAddingPassenger: (is_adding: boolean) => void;
};

export const useSavedPassengerStore = create<SavedPassengerStore>((set) => ({
    selected_passenger_id: 0,
    isAddingPassenger: false,
    setSelectedPassengerId: (passenger_id: number) => {
        set({ selected_passenger_id: passenger_id });
    },
    setIsAddingPassenger: (is_adding: boolean) => {
        set({ isAddingPassenger: is_adding });
    },
}));