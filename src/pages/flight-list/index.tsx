import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Text } from "@mantine/core";

import useFlight from "@/lib/hooks/useFlight";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FlightList = () => {
  const location = useLocation();
  const newParams: any = location.state;
  const { flights, fetchFlights, params, handleFilter } = useFlight();

  useEffect(() => {
    if (newParams) {
      handleFilter(newParams);
      fetchFlights(),
      console.log(newParams);
    }
  }, [fetchFlights, params]);

  return (
    <section className="flex w-full flex-col justify-center gap-10 overflow-x-hidden px-16 py-10">
      <Text className="text-4xl font-semibold uppercase text-black">
        Flight List
      </Text>
      <ScrollArea className="h-[100vh] max-h-[100vh] w-full overflow-y-auto pt-3">
        <div className="flex flex-col items-center gap-2">
          {flights.map((flight, index) => (
            <div
              key={index}
              className="flex h-14 w-full items-center justify-between rounded-lg border-b border-neutral-200 py-10 pl-2 pr-6 hover:bg-slate-200"
            >
              <div className="inline-flex flex-col items-start justify-start gap-1">
                <div className="text-base font-semibold text-neutral-900">
                  Airline/Flight Number:{" "}
                  {`${flight.airline.iata}/${flight.flight_number}`}
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  Departure Airport:{" "}
                  {`${flight.departure.airport_details.airport_name} (${flight.departure.airport_details.iata_code})`}
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  Arrival Airport:{" "}
                  {`${flight.arrival.airport_details.airport_name} (${flight.arrival.airport_details.iata_code})`}
                </div>
              </div>
              <div className="text-base font-semibold tracking-wider text-neutral-900">
                {flight.departure.scheduled_time}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </section>
  );
};

export default FlightList;
