import { create } from 'zustand';
import { PassengerData } from '@/types/Booking';

interface PassengerDetailsItem extends PassengerData {
    count: number;
}

type PassengerStore = {
    passengerDetails: PassengerDetailsItem[];
    count: () => number;
    add: (passengerDetails: PassengerData) => void;
    remove: (idPassenger: string) => void;
    removeAll: () => void;
};

export const usePassengerStore = create<PassengerStore>((set, get) => ({
    passengerDetails: [],
    count: () => {
        const { passengerDetails } = get();
        if (passengerDetails.length)
            return passengerDetails.map(item => item.count).reduce((prev, curr) => prev + curr);
        return 0;
    },
    add: (passengerDetails: PassengerData) => {
        const { passengerDetails: existingPassengers } = get();
        const updatedPassengerDetails = updatePassengerDetails(passengerDetails, existingPassengers);
        set({ passengerDetails: updatedPassengerDetails });
    },
    remove: (idPassenger: string) => {
        const { passengerDetails } = get();
        const updatedPassengerDetails = removePassengerDetails(idPassenger, passengerDetails);
        set({ passengerDetails: updatedPassengerDetails });
    },
    removeAll: () => set({ passengerDetails: [] }),
}));

function updatePassengerDetails(passengerDetailsToAdd: PassengerData, existingPassengers: PassengerDetailsItem[]): PassengerDetailsItem[] {
    const passengerIndex = existingPassengers.findIndex(passenger => passenger.id === passengerDetailsToAdd.id);

    if (passengerIndex !== -1) {
        console.log(`Passenger with ID ${passengerDetailsToAdd.id} already exists. Updating data.`);
        const updatedPassengerDetails = [...existingPassengers];
        updatedPassengerDetails[passengerIndex] = { ...passengerDetailsToAdd, count: 1 };
        return updatedPassengerDetails;
    }

    return [...existingPassengers, { ...passengerDetailsToAdd, count: 1 }];
}

function removePassengerDetails(passengerIdToRemove: string, existingPassengers: PassengerDetailsItem[]): PassengerDetailsItem[] {
    const updatedPassengerDetails = existingPassengers.filter(passenger => passenger.id !== passengerIdToRemove);

    return updatedPassengerDetails;
}