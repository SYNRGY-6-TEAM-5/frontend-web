import { ITripDetails } from "@/types/Ticket";
import { create } from "zustand";

interface SearchTicketStore {
  isFetchedAfterMount: boolean;
  tripDetails: ITripDetails;
  previousPath: string;
  setPreviousPath: (path: string) => void;
  setTripDetails: (trip_data: ITripDetails) => void;
  setIsFetchedAfterMount: (arg0: boolean) => void;
}

export const useSearchTicketStore = create<SearchTicketStore>((set) => ({
  isFetchedAfterMount: false,
  previousPath: "/",
  tripDetails: {
    ticket_class: "",
    adult_seat: 0,
    infant_seat: 0,
    child_seat: 0,
    total_seat: 0,
    isInternational: false,
    trip_type: "",
  },
  setPreviousPath: (path: string) => {
    set({ previousPath: path });
  }, 
  setTripDetails: (trip_data: ITripDetails) => {
    set({ tripDetails: trip_data });
  }, 
  setIsFetchedAfterMount: (value: boolean) =>
    set({ isFetchedAfterMount: value }),
}));
