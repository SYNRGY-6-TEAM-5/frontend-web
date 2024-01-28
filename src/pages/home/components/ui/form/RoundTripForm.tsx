import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import SelectAirportDialog from "../SelectAirportDialog";
import SelectSeatDialog from "../SelectSeatDialog";
import DepartureDatePicker from "../DepartureDatePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ArrowsLeftRight,
  AirplaneTakeoff,
  AirplaneLanding,
} from "@phosphor-icons/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import useHome from "@/lib/hooks/useHome";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { AirportDetails } from "@/types/Ticket";
import { Seat } from "@/types/Ticket";
import ArrivalDatePicker from "../ArrivalDatePicker";

const FormSchema = z.object({
  departureDate: z
    .date()
    .optional()
    .refine((val) => val !== null, {
      message: "A departure date is required.",
      path: ["departureDate"],
    }),
  arrivalDate: z
    .date()
    .optional()
    .refine((val) => val !== null, {
      message: "A departure date is required.",
      path: ["departureDate"],
    }),
  seat: z
    .string()
    .optional()
    .refine((val) => val !== "", {
      message: "Please select an email to display.",
      path: ["seat"],
    }),
  originDest: z
    .string()
    .optional()
    .refine((val) => val !== "", {
      message:
        "Please select an origin airport and destination airport to display.",
      path: ["originDest"],
    }),
});

interface props {
  tripType: string;
}

const RoundTripForm = ({ tripType }: props) => {
  const { airports, handleSearch, fetchAirports, params } = useHome();
  const navigate = useNavigate();

  const [selectedOriginAirport, setSelectedOriginAirport] =
    useState<AirportDetails | null>(null);
  const [selectedDestinationAirport, setSelectedDestinationAirport] =
    useState<AirportDetails | null>(null);
  const [isOriginActive, setIsOriginActive] = useState(true);

  const [ticketDetails, setTicketDetails] = useState<Seat | null>(null);

  const handleTicketDetails = (details: Seat) => {
    setTicketDetails(details);

    console.log("Ticket Details:", details);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const isOriginDestEmpty =
    !selectedOriginAirport || !selectedDestinationAirport;

  useEffect(() => {
    // Check if either selectedOriginAirport or selectedDestinationAirport has changed
    if (selectedOriginAirport && selectedDestinationAirport) {
      setIsOriginActive(false); // Change isActive prop accordingly
    }
  }, [selectedOriginAirport, selectedDestinationAirport]);

  const handleOriginAirportSelection = (airportData: any) => {
    setSelectedOriginAirport(airportData);

    console.log("Selected Origin Airport:", airportData);
  };

  const handleDestinationAirportSelection = (airportData: any) => {
    setSelectedDestinationAirport(airportData);

    console.log("Selected Destination Airport:", airportData);
  };

  const handleAirportSelection = () => {
    handleOriginAirportSelection(selectedDestinationAirport);
    handleDestinationAirportSelection(selectedOriginAirport);
  };

  const handleSwitch = () => {
    setIsOriginActive((prevIsOriginActive) => !prevIsOriginActive);
    handleAirportSelection();
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (isOriginDestEmpty) {
      toast({
        title: "Airport origin and destination are empty",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <p className="text-white">
              Please select origin and destination airports.
            </p>
          </div>
        ),
      });
      return;
    }

    const searchParams = new URLSearchParams();
    searchParams.append("origin", selectedOriginAirport.iata_code!);
    searchParams.append("destination", selectedDestinationAirport.iata_code!);
    searchParams.append("o_city", selectedOriginAirport.city_name!);
    searchParams.append("d_city", selectedDestinationAirport.city_name!);
    searchParams.append("date", format(data.departureDate!, "yyyy-MM-dd"));
    searchParams.append("trip-type", tripType!);

    for (const key in ticketDetails) {
      searchParams.append(key, (ticketDetails as Record<string, any>)[key]);
    }

    navigate(`/flight/search-flight?${searchParams}`);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchAirports();
    }, 300);

    return () => clearTimeout(debounceTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="originDest"
          render={({}) => (
            <FormItem>
              <div className="flex w-full items-center rounded-md border bg-white p-4">
                <div className="space-3 flex flex-1 flex-row items-center gap-3 bg-white">
                  <div className="flex flex-col bg-white">
                    <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                      <AirplaneTakeoff size={42} className="h-6 w-6" />
                      <label
                        htmlFor="origin"
                        className="ml-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Origin
                      </label>
                    </div>
                    <SelectAirportDialog
                      airports={airports}
                      handleSearch={handleSearch}
                      onAirportSelect={handleOriginAirportSelection}
                      isActive={isOriginActive}
                      switchedAirport={selectedOriginAirport}
                    />
                  </div>

                  <Button
                    variant="primary"
                    type="button"
                    onClick={handleSwitch}
                    className="relative h-10 w-6 rounded-full border-4 border-primary-200"
                  >
                    <ArrowsLeftRight size={42} className="absolute h-4 w-4" />
                  </Button>

                  <div className="flex flex-col bg-white">
                    <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                      <AirplaneLanding size={42} className="h-6 w-6" />
                      <label
                        htmlFor="destination"
                        className="ml-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Destination
                      </label>
                    </div>
                    <SelectAirportDialog
                      airports={airports}
                      handleSearch={handleSearch}
                      onAirportSelect={handleDestinationAirportSelection}
                      isActive={isOriginActive}
                      switchedAirport={selectedDestinationAirport}
                    />
                  </div>
                </div>
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-6">
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex w-1/2 flex-col">
                <FormLabel className="text-white">Departure Date</FormLabel>
                <DepartureDatePicker field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="arrivalDate"
            render={({ field }) => (
              <FormItem className="flex w-1/2 flex-col">
                <FormLabel className="text-white">Arrival Date</FormLabel>
                <ArrivalDatePicker field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="seat"
          render={({}) => (
            <FormItem>
              <FormLabel className="text-white">
                Passenger(s) and Cabin Class
              </FormLabel>
              <SelectSeatDialog onTicketDetails={handleTicketDetails} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="primary"
          type="submit"
          className="h-12 w-full items-center rounded-md p-4"
        >
          <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Cari
        </Button>
      </form>
    </Form>
  );
};

export default RoundTripForm;
