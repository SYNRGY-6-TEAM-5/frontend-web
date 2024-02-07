import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Ticket, ITripDetails } from "@/types/Ticket";

export interface TripInsurance {
  full_insurance: any;
  baggage_insurance: any;
  flight_delay_insurance: any;
}

interface TicketContextType {
  selectedTicket: Ticket | null;
  tripData: ITripDetails;
  tripInsurance: TripInsurance;
  selectTicket: (ticket: Ticket | null) => void;
  setTripData: Dispatch<SetStateAction<ITripDetails>>;
  setTripInsurance: Dispatch<SetStateAction<TripInsurance>>;
}

const TicketContext = createContext<TicketContextType>({
  selectedTicket: null,
  tripData: {
    ticket_class: "",
    adult_seat: 0,
    infant_seat: 0,
    child_seat: 0,
    total_seat: 0,
    isInternational: false,
    trip_type: "",
  },
  tripInsurance: {
    full_insurance: {
      type: "",
      price: 0,
    },
    baggage_insurance: {
      type: "",
      price: 0,
    },
    flight_delay_insurance: {
      type: "",
      price: 0,
    },
  },
  selectTicket: () => {},
  setTripData: () => {},
  setTripInsurance: () => {},
});

export const useTicketContext = (): TicketContextType =>
  useContext(TicketContext);

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider = ({
  children,
}: TicketProviderProps): JSX.Element => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tripData, setTripData] = useState<ITripDetails>({
    ticket_class: "",
    adult_seat: 0,
    infant_seat: 0,
    child_seat: 0,
    total_seat: 0,
    isInternational: false,
    trip_type: "",
  });
  const [tripInsurance, setTripInsurance] = useState<TripInsurance>({
    full_insurance: {},
    baggage_insurance: {},
    flight_delay_insurance: {},
  });

  const selectTicket = (ticket: Ticket | null) => {
    setSelectedTicket(ticket);
  };

  const contextValue: TicketContextType = {
    selectedTicket,
    tripData,
    tripInsurance,
    selectTicket,
    setTripData,
    setTripInsurance,
  };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};
