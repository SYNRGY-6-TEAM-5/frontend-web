import { Text } from "@mantine/core";
import { Separator } from "@/components/ui/separator";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TicketComponent } from "../ui/Ticket";

export interface Ticket {
  departure_date: string;
  departure_airport: string;
  arrival_date: string;
  arrival_airport: string;
  flight_duration: string;
  flight_number: string;
  airline_iata: string;
  price: string;
}

export const tickets: Ticket[] = [
  {
    departure_date: "2024-01-06T06:05:00+00:00",
    departure_airport: "Anaa",
    arrival_date: "2024-01-07T06:05:00+00:00",
    arrival_airport: "Arrabury",
    flight_duration: "24h",
    flight_number: "6811",
    airline_iata: "AA",
    price: "1,165,450",
  },
  {
    departure_date: "2024-01-06T06:05:00+00:00",
    departure_airport: "Anaa",
    arrival_date: "2024-01-07T06:05:00+00:00",
    arrival_airport: "Arrabury",
    flight_duration: "24h",
    flight_number: "6811",
    airline_iata: "AA",
    price: "1,165,450",
  },
  {
    departure_date: "2024-01-06T06:05:00+00:00",
    departure_airport: "Anaa",
    arrival_date: "2024-01-07T06:05:00+00:00",
    arrival_airport: "Arrabury",
    flight_duration: "24h",
    flight_number: "6811",
    airline_iata: "AA",
    price: "1,165,450",
  },
];

export function TicketPromosBanner() {
  return (
    <div className="flex flex-col gap-4 px-2 py-8 md:gap-10 md:p-20 md:px-8 md:pr-0 lg:h-full lg:flex-row lg:gap-20 lg:px-20">
      <div className="w-46 flex flex-col items-start justify-start gap-1">
        <Text className="text-color1 text-xl font-semibold tracking-tight md:text-4xl lg:text-4xl">
          Ticket Promo
        </Text>

        <Separator
          orientation="horizontal"
          className="my-2 h-[1.5px] bg-primary-500 md:my-0"
        />

        <Text className="text-color3 text-justify text-sm font-light md:text-base">
          Search Flights to our most popular destinations
        </Text>
      </div>
      <div className="relative w-full flex-1 lg:w-[65%]">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex items-center space-x-4 lg:p-4">
            {tickets.map((ticket, index) => (
              <TicketComponent key={index} ticket={ticket} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
