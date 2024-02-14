import { Text } from "@mantine/core";
import Line from "@/assets/Line26.png";
import { BookingUser } from "@/types/BookingUser";
import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";
import { differenceInMinutes, format } from "date-fns";

const DetailRuteSuccess = ({ BookingUser }: { BookingUser: BookingUser }) => {
  const { formatDate, formatTime } = useFormatDateTime();

  const timeDifference = (dep: string, arr: string) => {
    const startDate = new Date(dep);
    const endDate = new Date(arr);

    const differenceInMinutesValue = differenceInMinutes(endDate, startDate);

    const hours = Math.floor(differenceInMinutesValue / 60);
    const minutes = differenceInMinutesValue % 60;

    const formattedDifference = format(
      new Date(0, 0, 0, hours, minutes),
      "H'h' m'm'",
    );

    return formattedDifference;
  };

  return (
    <div className="grid grid-flow-col gap-4">
      {BookingUser.tickets.map((ticket, index) => {
        const flightRute = index === 0 ? "Depart" : "Return";
        const transit = ticket.flight.transit === 0 ? "Non-stop" : "Transit";

        return (
          <div
            className="space-y-6 rounded-lg bg-white p-4 pt-3 shadow-3xl"
            key={ticket.ticket_id}
          >
            <div className="border-b border-gray-100 pb-3">
              <Text>{flightRute}</Text>
            </div>
            <div className="flex justify-between text-base font-normal">
              <Text>
                <span className="font-medium text-primary-500">Depart </span>
                {formatDate(ticket.flight.departure.scheduled_time)}{" "}
              </Text>
              <Text className="rounded-3xl bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
                {transit}
              </Text>
            </div>
            <div className="mx-auto grid h-fit w-fit grid-cols-4">
              <div className="space-y-1 self-start text-right">
                <Text className="text-2xl font-semibold">
                  {ticket.flight.departure.airport_details.iata_code}
                </Text>
                <Text className="text-sm font-medium text-gray-300">
                  {formatTime(ticket.flight.departure.scheduled_time)}
                </Text>
              </div>
              <div className="row-span-3 flex justify-center self-center py-3">
                {" "}
                <img src={Line} width={3} />{" "}
              </div>
              <div className="col-span-2 space-y-1 self-start text-left">
                <Text className="text-sm font-medium">
                  {ticket.flight.departure.airport_details.city_name}
                </Text>
                <Text className="text-xs font-normal">
                  Terminal {ticket.flight.departure.terminal} Domestic
                </Text>
              </div>
              <Text className="col-span-2 self-center font-medium">
                {timeDifference(
                  ticket.flight.departure.scheduled_time,
                  ticket.flight.arrival.scheduled_time,
                )}
              </Text>
              <div className="space-y-1 self-end text-right">
                <Text className="text-2xl font-semibold">
                  {ticket.flight.arrival.airport_details.iata_code}
                </Text>
                <Text className="text-sm font-medium text-gray-300">
                  {formatTime(ticket.flight.arrival.scheduled_time)}
                </Text>
              </div>
              <div className="col-span-2 space-y-1 self-end text-left ">
                <Text className="text-sm font-medium">
                  {ticket.flight.arrival.airport_details.city_name}
                </Text>
                <Text className="text-xs font-normal">
                  Terminal {ticket.flight.arrival.terminal} Domestic
                </Text>
              </div>
            </div>
            <Text className="text-base font-normal">
              <span className="font-medium text-primary-500">Arrived </span>
              {formatDate(ticket.flight.arrival.scheduled_time)}{" "}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default DetailRuteSuccess;
