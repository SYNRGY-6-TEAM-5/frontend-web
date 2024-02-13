import { create } from 'zustand';
import { IAddOns, ICompleteBooking, IContactDetails, PassengerData, PassengerDetailsItem } from '@/types/Booking';
import { completeBooking } from '@/components/particles/completeBookingData';
import { calculateTotalPrice, summarizeBooking } from '@/lib/totalSummarizer';
import { CartItem, useCartStore } from './useCartStore';


type PassengerStore = {
    totalAmount: number;
    contactDetails: IContactDetails;
    passengerDetails: PassengerDetailsItem[];
    completeBookingData: ICompleteBooking;
    setTotalAmount:(total: number) => void;
    count: () => number;
    updateContactDetails: (contactDetails: Partial<IContactDetails>) => void;
    updateCompleteBookingData: (completeBookingData: Partial<ICompleteBooking>, cart: CartItem[]) => void;
    add: (passengerDetails: PassengerData) => void;
    remove: (idPassenger: string) => void;
    removeAll: () => void;
    addOnToPassenger: (fullName: string, addOn: IAddOns) => void;
    removeAddOnFromPassenger: (fullName: string) => void;
};

export const usePassengerStore = create<PassengerStore>((set, get) => ({
    contactDetails: {
        fullName: "",
        email: "",
        phone: ""
    },
    passengerDetails: [],
    completeBookingData: completeBooking,
    totalAmount: 0,
    setTotalAmount: (total: number) => {
        set({ totalAmount: total });
    },
    count: () => {
        const { passengerDetails } = get();
        if (passengerDetails.length)
            return passengerDetails.map(item => item.count).reduce((prev, curr) => prev + curr);
        return 0;
    },
    updateContactDetails: (contactDetails: Partial<IContactDetails>) => {
        set(state => ({ contactDetails: { ...state.contactDetails, ...contactDetails } }));
    },
    updateCompleteBookingData: (completeBookingData: Partial<ICompleteBooking>, cart: CartItem[]) => {
        set(state => {
            const newState = { completeBookingData: { ...state.completeBookingData, ...completeBookingData } };
            const summarizedBooking = summarizeBooking(newState.completeBookingData, cart);
            const totalPrice = calculateTotalPrice(summarizedBooking);
            return { ...newState, totalAmount: totalPrice };
        });
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
    addOnToPassenger: (fullName: string, addOn: IAddOns) => {
        const passengers = get().passengerDetails;
        const updatedPassengers = passengers.map(passenger => {
            if (passenger.fullName === fullName) {
                return {
                    ...passenger,
                    add_ons: {
                        ...addOn
                    }
                };
            }
            return passenger;
        });
        set({ passengerDetails: updatedPassengers });
    },
    removeAddOnFromPassenger: (fullName: string) => {
        const passengers = get().passengerDetails;
        const updatedPassengers = passengers.map(passenger => {
            if (passenger.fullName === fullName) {
                return {
                    ...passenger,
                    add_ons: {
                        meals: [],
                        baggage: {
                            baggage_weight: "",
                            baggage_price: ""
                        }
                    }
                };
            }
            return passenger;
        });
        set({ passengerDetails: updatedPassengers });
    },
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