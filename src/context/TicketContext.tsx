import { createContext, useState, useContext, ReactNode } from 'react';

import { Ticket } from '@/types/Ticket';

interface TicketContextType {
  selectedTicket: Ticket | null;
  selectTicket: (ticket: Ticket | null) => void;
}

const TicketContext = createContext<TicketContextType>({
  selectedTicket: null,
  selectTicket: () => {},
});

export const useTicketContext = (): TicketContextType => useContext(TicketContext);

interface TicketProviderProps {
  children: ReactNode;
}

export const TicketProvider = ({ children }: TicketProviderProps): JSX.Element => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const selectTicket = (ticket: Ticket | null) => {
    setSelectedTicket(ticket);
  };

  const contextValue: TicketContextType = {
    selectedTicket,
    selectTicket,
  };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};
