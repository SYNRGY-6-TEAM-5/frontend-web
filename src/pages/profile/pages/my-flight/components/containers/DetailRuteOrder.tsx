import ArrowCircle from "@/assets/ArrowCircleRight.png";
import { GarudaLogo } from "@/assets/svg";
import DetailRuteBtn from "../ui/DetailRuteBtn";
import { Text } from "@mantine/core";
import { BookingUser } from "@/types/BookingUser";
import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";

const DetailRuteOrder = ({ BookingUser }: { BookingUser: BookingUser }) => {
  const { formatDate, formatTime } = useFormatDateTime();

  return (
    <div className="rounded-lg bg-white shadow-3xl">
      <div className="flex items-center justify-center space-x-5 rounded-t-lg bg-black p-1 text-center text-white">
        <Text>
          {BookingUser.tickets[0].flight.departure.airport_details.iata_code}
        </Text>
        <img src={ArrowCircle} />
        <Text>
          {BookingUser.tickets[0].flight.arrival.airport_details.iata_code}
        </Text>
      </div>
      <div>
        {BookingUser.tickets.map((ticket, index) => {
          let flightRute = "";
          {
            index === 0 ? (flightRute = "Depart") : (flightRute = "Return");
          }

          return (
            <div
              key={String(index)}
              className="space-y-3 border-t border-dashed border-gray-300 p-3"
            >
              <div className="flex justify-between text-base">
                <Text className="font-medium text-primary-500">
                  {flightRute}
                </Text>
                <div className="flex flex-row items-center">
                  {ticket.flight.airline_id === 1 ? (
                    <GarudaLogo className="h-2" />
                  ) : (
                    <img
                      src={ticket.flight.airline.image}
                      className="mr-1 h-4"
                    />
                  )}
                  <Text className="font-medium">{ticket.flight.iata}</Text>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Text className="text-lg font-medium">
                  {formatDate(ticket.flight.departure.scheduled_time)}
                </Text>
                <Text className="text-sm font-medium text-gray-500">
                  {formatTime(ticket.flight.departure.scheduled_time)}
                </Text>
              </div>

              <DetailRuteBtn ticket={ticket} flightRute={flightRute} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailRuteOrder;
