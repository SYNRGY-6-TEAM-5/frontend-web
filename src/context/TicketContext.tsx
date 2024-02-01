import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

import { Ticket, ITripDetails  } from '@/types/Ticket';

interface TicketContextType {
  selectedTicket: Ticket | null;
  tripData: ITripDetails;
  selectTicket: (ticket: Ticket | null) => void;
  setTripData: Dispatch<SetStateAction<ITripDetails>>;
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
  selectTicket: () => {},
  setTripData: () => {},
});

export const useTicketContext = (): TicketContextType => useContext(TicketContext);

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps): JSX.Element => {
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

  const selectTicket = (ticket: Ticket | null) => {
    setSelectedTicket(ticket);
  };

  const contextValue: TicketContextType = {
    selectedTicket,
    tripData,
    selectTicket,
    setTripData,
  };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};
