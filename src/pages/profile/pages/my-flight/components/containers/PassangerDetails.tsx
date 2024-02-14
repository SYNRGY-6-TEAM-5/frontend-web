import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@mantine/core";
import { BookingUser, Passenger, AddOns } from "@/types/BookingUser";
import { Ticket } from "@/types/Ticket";

interface passengersDetail {
  Booking: BookingUser;
  Passangers: Passenger[];
  Tickets: Ticket[];
}

const PassangerDetails = ({
  Booking,
  Passangers,
  Tickets,
}: passengersDetail) => {
  const addOnsMap = (addOns: AddOns[], index: number) => {
    if (index === 0) {
      return addOns.filter((addon) => addon.trip_type === "departure");
    } else {
      return addOns.filter((addon) => addon.trip_type !== "departure");
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <Text>Passenger & Facilities</Text>
      <Tabs
        defaultValue="0"
        className="w-auto rounded-lg bg-white p-2 pb-0 shadow-3xl"
      >
        <TabsList className="mb-3 grid h-fit w-fit grid-cols-2 gap-4 bg-white">
          {Passangers.map((p, index) => (
            <TabsTrigger
              key={String(index)}
              value={String(index)}
              className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-black data-[state=active]:border-error-500 data-[state=active]:bg-error-50 data-[state=active]:text-primary-500"
            >
              {p.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {Passangers.map((p, index) => (
          <TabsContent
            value={String(index)}
            key={p.passenger_id}
            className="flex flex-col gap-3"
          >
            {Tickets.map((order, index) => (
              <div
                key={String(index)}
                className="border-t border-dashed border-t-gray-200 pt-4"
              >
                <div className="mb-4 flex space-x-1">
                  <Text>
                    {order.flight.departure.airport_details.city_name}
                  </Text>
                  <ArrowRight size={24} className="text-primary-500" />
                  <Text>{order.flight.arrival.airport_details.city_name}</Text>
                </div>
                <Table className="border-gray-200">
                  <TableHeader>
                    <TableRow className="bg-black text-white hover:bg-black hover:text-white [&_th:first-child]:border-r">
                      <TableHead className="rounded-ss-lg text-inherit">
                        Add-ons
                      </TableHead>
                      <TableHead className="rounded-se-lg text-inherit">
                        Evidence
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="[&_td]:border-x [&_tr:last-child]:rounded-lg [&_tr:last-child]:border">
                    <TableRow>
                      <TableCell>Extra Baggage</TableCell>
                      <TableCell>
                        {addOnsMap(p.add_ons, index)[0]?.baggage_weight ?? "0 KG"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Meal</TableCell>
                      <TableCell>
                        {addOnsMap(p.add_ons, index)?.length ?? 0} Meal
                      </TableCell>
                    </TableRow>
                    {Booking.flight_delay && (
                      <TableRow>
                        <TableCell>Flight Delay</TableCell>
                        <TableCell>Insured</TableCell>
                      </TableRow>
                    )}
                    {Booking.bag_insurance && (
                      <TableRow>
                        <TableCell>Baggage Insurance</TableCell>
                        <TableCell>Insured</TableCell>
                      </TableRow>
                    )}
                    {Booking.full_protection && (
                      <TableRow>
                        <TableCell>Full Protection</TableCell>
                        <TableCell>Insured</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PassangerDetails;
