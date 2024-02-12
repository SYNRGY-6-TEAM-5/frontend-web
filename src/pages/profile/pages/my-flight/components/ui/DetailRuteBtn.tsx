import { BaggageBlack, MealBlack } from "@/assets/svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Line from "@/assets/Line26.png";
import { TicketDetail } from "@/types/BookingUser";
import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";
import { differenceInMinutes, format } from "date-fns";

const DetailRuteBtn = ({
  ticket,
  flightRute,
}: {
  ticket: TicketDetail;
  flightRute: string;
}) => {
  const [dialog, setDialog] = useState<boolean>(false);
  const handleDialog = () => {
    setDialog(!dialog);
  };

  const { formatDate, formatTime } = useFormatDateTime();
  const transit = ticket.flight.transit === 0 ? "Non-stop" : "Transit";
  const TicketType = () => {
    if (ticket.ticket_type === "first-class") {
      return "First Class";
    }
    if (ticket.ticket_type === "business-class") {
      return "Business Class";
    } else {
      return "Economy Class";
    }
  };

  const timeDifference = () => {
    const startDate = new Date(ticket.flight.departure.scheduled_time);
    const endDate = new Date(ticket.flight.arrival.scheduled_time);

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
    <div className="border-t border-gray-100 pt-3">
      <label
        htmlFor="detailRute"
        className="group flex cursor-pointer items-center justify-between hover:text-primary-200"
      >
        <Text className="text-xs font-normal">
          Terminal {ticket.flight.departure.terminal} Domestic
        </Text>
        <input
          type="button"
          id="detailRute"
          name="detailRute"
          onClick={handleDialog}
        />
        <ChevronRight size={20} className="font-normal text-primary-500" />
      </label>
      <Dialog open={dialog} onOpenChange={handleDialog}>
        <DialogContent className="max-h-screen max-w-[600px] overflow-y-scroll p-4 backdrop-blur-md sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{flightRute}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-8">
            <div className="flex justify-between">
              <div className="flex space-x-3">
                <Text className="font-medium text-primary-500">Depart</Text>
                <Text>
                  {formatDate(ticket.flight.departure.scheduled_time)}
                </Text>
              </div>
              <Text className="rounded-3xl bg-gray-100 px-2 py-1 text-center text-xs font-medium text-gray-500">
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
                <img src={Line} />{" "}
              </div>
              <div className="col-span-2 space-y-1 self-start text-left">
                <Text className="text-sm font-medium">
                  {ticket.flight.departure.airport_details.city_name}
                </Text>
                <Text className="text-xs font-normal">
                  Terminal {ticket.flight.departure.terminal} Domestic
                </Text>
              </div>
              <Text className="self-center text-right font-medium">
                {timeDifference()}
              </Text>
              <div className="col-span-2 rounded-xl border border-gray-200">
                <div className="justify-betwen flex items-center gap-2 border-b border-gray-200 p-3">
                  <img src={ticket.flight.airline.image} className="mr-1 h-4" />
                  <div>
                    <Text className="font-medium">
                      {ticket.flight.airline.name}
                    </Text>
                    <Text className="text-xs">
                      {ticket.flight.iata} - {TicketType()}
                    </Text>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-3 py-4">
                  <Text className=" text-sm font-medium">What’s included</Text>
                  <div className="flex gap-2">
                    <BaggageBlack />
                    <div>
                      <Text className="text-xs">Cabin baggage: 10kg</Text>
                      <Text className="text-xs">
                        Excess baggage (+): IDR 25,000/kg{" "}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MealBlack />
                    <Text className="text-xs">Free meals</Text>
                  </div>
                </div>
              </div>
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
            <div className="flex space-x-3">
              <Text className="font-medium text-primary-500">Arrived</Text>
              <Text>{formatDate(ticket.flight.arrival.scheduled_time)}</Text>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailRuteBtn;
