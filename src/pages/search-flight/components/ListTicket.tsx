import { useLocation } from "react-router-dom";
import FlightCard from "./ui/FlightCard";
import {
  FlightSearchParams,
  useSearchTicket,
} from "@/lib/hooks/useSearchTicket";
import { useEffect } from "react";
import { useSearchTicketStore } from "@/store/useSearctTicketStore";
import TicketEmpty from "./container/TicketEmpty";
import LoadingTicket from "./ui/LoadingTicket";
import TicketsHolder from "./container/TicketHolder";
import { ITripDetails, Ticket } from "@/types/Ticket";
import { useCartStore } from "@/store/useCart";
import { useTicketContext } from "@/context/TicketContext";
// Mock Data for dev purpose
import { data } from "@/components/particles/TicketData";
import { ret_data } from "@/components/particles/ReturnTicketData";

const ListTicket = () => {
  const { setTripData } = useTicketContext();
  const location = useLocation();
  const { cart } = useCartStore();
  const searchParams = new URLSearchParams(location.search);

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

  const tripData: ITripDetails = {
    ticket_class: searchParams.get("ticket_class") || "",
    adult_seat: parseInt(searchParams.get("adult_seat") || "0"),
    infant_seat: parseInt(searchParams.get("infant_seat") || "0"),
    child_seat: parseInt(searchParams.get("child_seat") || "0"),
    total_seat: parseInt(searchParams.get("total_seat") || "0"),
    isInternational: false,
    trip_type: searchParams.get("trip-type") || "",
  };

  useEffect(() => {
    setTripData(tripData);
  }, [setTripData, tripData]);

  const { data: depData, isFetching: depIsFetching } =
    useSearchTicket(paramsData);
  const { data: retData, isFetching: retIsFetching } =
    useSearchTicket(returnParamsData);

  const { setIsFetchedAfterMount } = useSearchTicketStore();

  useEffect(() => {
    setIsFetchedAfterMount(depIsFetching || retIsFetching);
  }, [depIsFetching, retIsFetching]);

  return (

      <div className="relative mt-6 grid gap-y-6 px-6 md:px-9 lg:px-20">
        <div className="flex w-full flex-row items-center justify-between gap-4">
          <TicketsHolder tripType={tripData.trip_type} />
        </div>
        {tripData.trip_type === "one-way" ? (
          <>
            {depIsFetching ? (
              <LoadingTicket />
            ) : (
              <>
                {!!data && data.length > 0 ? (
                  data.map((ticket: Ticket) => (
                    <FlightCard
                      key={ticket.ticket_id}
                      ticket={ticket}
                      tripType={tripData.trip_type}
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
                    {!!data && data.length > 0 ? (
                      data.map((ticket: Ticket) => (
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
                    {!!ret_data && ret_data.length > 0 ? (
                      ret_data.map((ticket: Ticket) => (
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
