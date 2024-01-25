import { useLocation } from "react-router-dom";
import FlightCard from "./ui/FlightCard";
import {
  FlightSearchParams,
  useSearchTicket,
} from "@/lib/hooks/useSearchTicket";
import { Ticket } from "@/types/Ticket";
import { useEffect } from "react";
import { useSearchTicketStore } from "@/store/useSearctTicketStore";
import TicketEmpty from "./container/TicketEmpty";
import LoadingTicket from "./ui/LoadingTicket";

const ListTicket = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paramsData: FlightSearchParams = {
    departure_airport: searchParams.get("origin") || "",
    arrival_airport: searchParams.get("destination") || "",
    departure_date: searchParams.get("date") || "",
  };

  const { data, isFetching } = useSearchTicket(paramsData);
  const { setIsFetchedAfterMount } = useSearchTicketStore();

  useEffect(() => {
    setIsFetchedAfterMount(isFetching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  return (
    <div className="relative mt-6 grid gap-y-8 px-6 md:px-9 lg:px-20">
      {isFetching ? (
        <LoadingTicket />
      ) : !!data && data.length > 0 ? (
        data.map((ticket: Ticket) => (
          <FlightCard key={ticket.ticket_id} ticket={ticket} />
        ))
      ) : (
        <TicketEmpty />
      )}
    </div>
  );
};

export default ListTicket;
