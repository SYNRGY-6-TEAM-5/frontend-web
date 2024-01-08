import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import giIcon from "../../../../assets/icon-gi.png";
import { cn } from "@/lib/utils";
import { AirplaneInFlight } from "@phosphor-icons/react";
import { Text } from "@mantine/core";
// import { Separator } from "@/components/ui/separator";

type CardProps = React.ComponentProps<typeof Card>;

interface TicketProps {
  ticket: {
    departure_date: string;
    departure_airport: string;
    arrival_date: string;
    arrival_airport: string;
    flight_duration: string;
    flight_number: string;
    airline_iata: string;
    price: string;
  };
}

export function Ticket(
  { ticket }: TicketProps,
  { className, ...props }: CardProps,
) {
  const {
    departure_date,
    departure_airport,
    arrival_date,
    arrival_airport,
    flight_duration,
    flight_number,
    airline_iata,
    price,
  } = ticket;

  //   const formattedDepartureDate = format(new Date(departure_date), "yyyy-MM-dd");
  //   const formattedArrivalDate = format(new Date(arrival_date), "yyyy-MM-dd");
  const formattedDepartureTime = format(new Date(departure_date), "HH:mm");
  const formattedArrivalTime = format(new Date(arrival_date), "HH:mm");

  return (
    <div className="relative flex w-[18.5rem] flex-col overflow-hidden rounded-md border border-black shadow-sm">
      <Card
        className={cn("flex  shrink-0 justify-between bg-black", className)}
        {...props}
      >
        <CardContent className="grid w-full gap-4 p-4">
          <div className="space-3 flex flex-1 flex-row items-center justify-stretch gap-10">
            <div className="flex w-1/3 flex-col items-start justify-start">
              <Text className="text-2xl font-medium text-white dark:text-white">
                {formattedDepartureTime}
              </Text>
              {/* <Text className="text-[8pt] font-thin text-white text-opacity-80 dark:text-white">
                {formattedDepartureDate}
              </Text> */}
              {/* <Separator
                orientation="horizontal"
                className="h-[0.5px] w-full bg-primary-500"
              /> */}
              <Text className="text-left text-[8pt] font-thin text-white text-opacity-80 dark:text-white">
                {departure_airport}
              </Text>
              {/* <Text className="text-left text-[14pt] font-normal text-white text-opacity-80 dark:text-white">
                {departure_airport}
              </Text> */}
            </div>

            <div className="flex w-1/3 flex-col items-center justify-center gap-1">
              <AirplaneInFlight size={42} className="h-4 w-4 text-white" />
              <Text className="text-[7pt] font-thin text-white text-opacity-80 dark:text-white">
                {flight_duration}
              </Text>
            </div>

            <div className="flex w-1/3 flex-col items-start justify-start">
              <Text className="text-2xl font-medium text-white dark:text-white">
                {formattedArrivalTime}
              </Text>
              {/* <Text className="text-[8pt] font-thin text-white text-opacity-80 dark:text-white">
                {formattedArrivalDate}
              </Text> */}
              {/* <Separator
                orientation="horizontal"
                className="h-[0.5px] w-full bg-primary-500"
              /> */}
              <Text className="text-right text-[8pt] font-thin text-white text-opacity-80 dark:text-white">
                {arrival_airport}
              </Text>
              {/* <Text className="text-right text-[14pt] font-normal text-white text-opacity-80 dark:text-white">
                {arrival_airport}
              </Text> */}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="absolute -left-2 top-[50%] h-5 w-5 rounded-full bg-primary-500"></div>
      <div className="absolute -right-2 top-[50%] h-5 w-5 rounded-full bg-primary-500"></div>
      {/* <div className="absolute -top-[0.3rem] -left-2 bg-white w-5 h-5 rounded-full"></div> */}
      {/* <div className="absolute -top-[0.3rem] -right-2 bg-white w-5 h-5 rounded-full"></div> */}
      <Card
        className={cn(
          "flex w-full shrink-0 justify-between bg-white",
          className,
        )}
        {...props}
      >
        <CardContent className="grid w-full grid-cols-2 gap-4 px-6 py-4">
          <div className="flex w-1/2 flex-row gap-2 items-center justify-center px-2">
            <Avatar className="w-8 h-4">
              <AvatarImage src={giIcon} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Text className="text-[12pt] font-semibold text-black dark:text-white">
              {`${airline_iata} ${flight_number}`}
            </Text>
          </div>

          <Text className="text-right text-[11pt] font-semibold text-primary-500 dark:text-white">
            {`IDR ${price}`}
          </Text>
        </CardContent>
      </Card>
    </div>
  );
}
