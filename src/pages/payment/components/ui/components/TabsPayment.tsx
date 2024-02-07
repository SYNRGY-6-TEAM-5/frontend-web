import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@mantine/core";
import Rute from "../../containers/Rute";
import TabsPassanger from "./TabsPassanger";
import { ICompleteBooking } from "@/types/Booking";
import React from "react";
import { CartItem } from "@/store/useCartStore";
import { transformCartData } from "@/lib/dataformatter";
import { format, parseISO } from "date-fns";

interface TabsPaymentProps {
  completeBooking: ICompleteBooking;
}

const TabsPayment: React.FC<TabsPaymentProps> = ({ completeBooking }) => {
  let cartTicket: CartItem[] = transformCartData(completeBooking);

  function modifyDateString(dateString: string): string {
    const date = parseISO(dateString);
    const formattedDate = format(date, "EEE, d LLL yyyy");

    return formattedDate;
  }

  return (
    <Tabs defaultValue="0" className="w-auto">
      <TabsList className="grid w-fit grid-cols-2 gap-4 bg-white">
        {cartTicket.map((_, index) => (
          <TabsTrigger
            key={`route-${index}`}
            value={String(index)}
            className="p-0 text-lg text-gray-300 data-[state=active]:border-b data-[state=active]:border-primary-500 data-[state=active]:bg-white data-[state=active]:text-black"
          >
            {index === 0 ? "Depart" : "Return"}
          </TabsTrigger>
        ))}
      </TabsList>
      {cartTicket.map((ticket_details, index) => (
        <TabsContent key={`flight-details-${index}`} value={String(index)} className="flex flex-col gap-8">
          <div className="mt-6 space-y-6 rounded-xl bg-white px-4 py-3 shadow-3xl">
            <div>
              <Text className="mb-2">
                <span className="text-primary-500">Depart</span>{" "}
                {modifyDateString(
                  ticket_details.flight.departure.scheduled_time,
                )}
              </Text>
              <Text className="mb-1 text-sm font-medium">
                {ticket_details.flight.departure.airport_details.airport_name},{" "}
                {ticket_details.flight.departure.airport_details.city_name}
              </Text>
              <Text className="text-xs">
                Terminal {ticket_details.flight.departure.terminal}
              </Text>
            </div>
            <Rute
              departure={
                ticket_details.flight?.departure?.airport_details?.iata_code ??
                ""
              }
              departureTime={ticket_details.flight?.departure?.scheduled_time}
              desc={
                ticket_details.flight?.transit !== 0
                  ? `${ticket_details.flight.transit} Transit`
                  : "Non-Stop"
              }
              arrival={
                ticket_details.flight?.arrival?.airport_details?.iata_code ?? ""
              }
              arrivalTime={ticket_details.flight?.arrival?.scheduled_time}
            />
            <div>
              <Text className="mb-2">
                <span className="text-primary-500">Arrived</span>{" "}
                {modifyDateString(ticket_details.flight.arrival.scheduled_time)}
              </Text>
              <Text className="mb-1 text-sm font-medium">
                {ticket_details.flight.arrival.airport_details.airport_name},{" "}
                {ticket_details.flight.arrival.airport_details.city_name}
              </Text>
              <Text className="text-xs">
                Terminal {ticket_details.flight.arrival.terminal}
              </Text>
            </div>
          </div>
          <div>
            <Text className="text-l mb-6 font-medium">Passenger & Add-ons</Text>
            <TabsPassanger
              depart={ticket_details.flight.departure.airport_details.city_name}
              arrive={ticket_details.flight.arrival.airport_details.city_name}
              completeBooking={completeBooking}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsPayment;
