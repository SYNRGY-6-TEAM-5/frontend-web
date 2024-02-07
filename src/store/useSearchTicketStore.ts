import { FlightSearchParams } from "@/lib/hooks/useSearchTicket";
import { ITripDetails } from "@/types/Ticket";
import { create } from "zustand";

interface SearchTicketStore {
  isFetchedAfterMount: boolean;
  tripDetails: ITripDetails;
  paramsData: FlightSearchParams;
  returnParamsData: FlightSearchParams;
  previousPath: string;
  setPreviousPath: (path: string) => void;
  setTripDetails: (trip_data: ITripDetails) => void;
  setParamsData: (trip_data: FlightSearchParams) => void;
  setReturnParamsData: (trip_data: FlightSearchParams) => void;
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
  paramsData: {
    departure_airport: "",
    arrival_airport: "",
    departure_date: "",
  },
  returnParamsData: {
    departure_airport: "",
    arrival_airport: "",
    departure_date: "",
  },
  setPreviousPath: (path: string) => {
    set({ previousPath: path });
  }, 
  setTripDetails: (trip_data: ITripDetails) => {
    set({ tripDetails: trip_data });
  }, 
  setParamsData: (params: FlightSearchParams) => {
    set({ paramsData: params });
  }, 
  setReturnParamsData: (params: FlightSearchParams) => {
    set({ returnParamsData: params });
  }, 
  setIsFetchedAfterMount: (value: boolean) =>
    set({ isFetchedAfterMount: value }),
}));
