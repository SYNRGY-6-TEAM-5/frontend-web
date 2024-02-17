import { useLocation } from "react-router-dom";
import FlightCard from "./ui/FlightCard";
import {
  FlightSearchParams,
  useSearchTicket,
} from "@/lib/hooks/useSearchTicket";
import { useEffect, useState } from "react"; // Import useState
import { useSearchTicketStore } from "@/store/useSearchTicketStore";
import TicketEmpty from "./container/TicketEmpty";
import LoadingTicket from "./ui/LoadingTicket";
import TicketsHolder from "./container/TicketHolder";
import { Ticket } from "@/types/Ticket";
import { useCartStore } from "@/store/useCartStore";

const ListTicket = () => {
  const location = useLocation();
  const { cart } = useCartStore();
  const { setIsFetchedAfterMount, tripDetails } = useSearchTicketStore();
  const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams(location.search));

  useEffect(() => {
    setSearchParams(new URLSearchParams(location.search));
  }, [location.search]);

  const paramsData: FlightSearchParams = {
    departure_airport: searchParams.get("origin") || "",
    arrival_airport: searchParams.get("destination") || "",
    departure_date: searchParams.get("dep_date") || "",
  };

  const returnParamsData: FlightSearchParams = {
    departure_airport: searchParams.get("destination") || "",
    arrival_airport: searchParams.get("origin") || "",
    return_date: searchParams.get("ret_date") || "",
  };

  const { data: depData, isFetching: depIsFetching } =
    useSearchTicket(paramsData);
  const { data: retData, isFetching: retIsFetching } =
    useSearchTicket(returnParamsData);

  useEffect(() => {
    setIsFetchedAfterMount(depIsFetching || retIsFetching);
  }, [depIsFetching, retIsFetching]);

  return (
    <div className="relative mt-6 grid gap-y-6 px-6 md:px-9 lg:px-20">
      <div className="flex w-full flex-row items-center justify-between gap-4">
        <TicketsHolder tripType={tripDetails.trip_type} />
      </div>
      {tripDetails.trip_type === "one-way" ? (
        <>
          {depIsFetching ? (
            <LoadingTicket />
          ) : (
            <>
              {!!depData && depData.data.length > 0 ? (
                depData.data.map((ticket: Ticket) => (
                  <FlightCard
                    key={ticket.ticket_id}
                    ticket={ticket}
                    tripType={tripDetails.trip_type}
                  />
                ))
              ) : (
                <TicketEmpty />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {depIsFetching || retIsFetching ? (
            <LoadingTicket />
          ) : (
            <>
              {cart.length === 0 && (
                <>
                  {!!depData && depData.data.length > 0 ? (
                    depData.data.map((ticket: Ticket) => (
                      <FlightCard
                        key={ticket.ticket_id}
                        ticket={ticket}
                        tripType="departure"
                      />
                    ))
                  ) : (
                    <TicketEmpty />
                  )}
                </>
              )}
              {cart.length > 0 && (
                <>
                  {!!retData && retData.data.length > 0 ? (
                    retData.data.map((ticket: Ticket) => (
                      <FlightCard
                        key={ticket.ticket_id}
                        ticket={ticket}
                        tripType="return"
                      />
                    ))
                  ) : (
                    <TicketEmpty />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ListTicket;
