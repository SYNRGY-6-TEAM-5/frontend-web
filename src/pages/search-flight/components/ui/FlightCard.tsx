import { differenceInMinutes, format } from "date-fns";

import { Button } from "@/components/ui/button";
import ArrowCircle from "../../../../assets/arrowCircle.png";

import { useCartStore } from "@/store/useCartStore";
import { Ticket } from "@/types/Ticket";
import { Baggage, Meal } from "@/assets/svg";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Separator } from "@/components/ui/separator";

interface props {
  ticket: Ticket;
  tripType: string;
}

const formatMoney = (amount: string) => {
  const parsedAmount = parseFloat(amount.replace(/,/g, ""));
  return new Intl.NumberFormat("id-ID").format(parsedAmount);
};

const formatTime = (time: string) => {
  const date = new Date(time);
  const formattedTime = format(date, "hh:mm a");
  return formattedTime;
};

const FlightCard = ({ ticket, tripType }: props) => {
  const { add: handleAddToCart } = useCartStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

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

  const transitTime =
    ticket.flight.transit > 0 ? `${ticket.flight.transit} transit` : "Non-stop";

  if (!isDesktop) {
    return (
      <Button
        onClick={() => handleAddToCart(ticket, tripType)}
        variant="link"
        className="block h-full justify-start rounded-xl border border-gray-100 bg-white p-3 decoration-transparent"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={ticket.flight.airline.image}
              alt={ticket.flight.airline.name}
              className="h-[11px]"
            />
            <div className="text-base font-medium text-black">
              {ticket.flight.iata}
            </div>
          </div>
          <div className="rounded-full bg-gray-100 px-2 py-1 text-xs  font-medium text-gray-500">
            {transitTime}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="">
            <div className="text-3xl font-semibold">
              {ticket.flight.departure.airport_details.iata_code}
            </div>
            <div className="text-[14px] font-medium text-[#B9C0D4]">
              {formatTime(ticket.flight.departure.scheduled_time)}
            </div>
          </div>
          <div>
            <img src={ArrowCircle} alt=""/>
          </div>
          <div className="">
            <div className="text-3xl font-semibold">
              {ticket.flight.arrival.airport_details.iata_code}
            </div>
            <div className="text-[14px] font-medium text-[#B9C0D4]">
              {formatTime(ticket.flight.arrival.scheduled_time)}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            <div className="flex h-6 w-6 rounded-full bg-primary-500">
              <Meal className="m-auto h-3 w-3" />
            </div>
            <div className="flex h-6 w-6 rounded-full bg-primary-500">
              <Baggage className="m-auto h-3 w-3" />
            </div>
          </div>
          <div className="text-xs text-gray-400">{timeDifference()}</div>
          <div className="text-sm font-medium text-primary-500">
            IDR {formatMoney(ticket.fare_amount)}
          </div>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between">
          <div className="text-black text-xs font-normal">
            {" "}
            Excess baggage (+)
          </div>{" "}
          <span className="text-black text-xs font-medium">
            IDR 25.000/kg
          </span>
        </div>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => handleAddToCart(ticket, tripType)}
      variant="ghost"
      className="h-46 mx-auto flex w-full flex-row items-center justify-between overflow-hidden rounded-xl border border-gray-100 bg-white px-4 py-6"
    >
      <div className="flex items-center">
        <div className="flex w-36 flex-col items-center justify-center gap-4">
          <img
            src={ticket.flight.airline.image}
            alt={ticket.flight.airline.name}
            className="h-[11px] md:h-[22px]"
          />
          <div className="leading-38 text-lg font-semibold text-black md:text-[30px]">
            {ticket.flight.iata}
          </div>
        </div>
        <div className="mx-7 h-[116px] w-px bg-gray-200"></div>
        <div className="flex h-[116px] items-center justify-between gap-5 rounded-[16px] bg-[#111] p-3 md:w-[340px]">
          <div className="text-white">
            <div className="text-3xl font-semibold">
              {ticket.flight.departure.airport_details.iata_code}
            </div>
            <div className="text-[14px] font-medium text-[#B9C0D4]">
              {formatTime(ticket.flight.departure.scheduled_time)}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-white">
            <div className="text-sm">{timeDifference()}</div>
            <div>
              <img src={ArrowCircle} alt="" />
            </div>

            <div className="rounded-full bg-white px-2 py-1 text-xs  font-medium text-black">
              {transitTime}
            </div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-semibold">
              {ticket.flight.arrival.airport_details.iata_code}
            </div>
            <div className="text-[14px] font-medium text-[#B9C0D4]">
              {formatTime(ticket.flight.arrival.scheduled_time)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 rounded-full bg-primary-500">
            <Meal className="m-auto" />
          </div>
          <div className="flex h-9 w-9 rounded-full bg-primary-500">
            <Baggage className="m-auto" />
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="text-Base-Black leading-24 text-[16px] font-normal">
            {" "}
            Excess baggage (+)
          </div>{" "}
          <span className="text-Base-Black leading-24 text-[16px] font-medium">
            IDR 25.000/kg
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-3xl font-medium leading-9 text-primary-500">
          IDR {formatMoney(ticket.fare_amount)}
        </div>
        <div className="leading-32 font-regular hidden text-[24px] text-gray-500 md:block">
          /pax
        </div>
      </div>
    </Button>
  );
};

export default FlightCard;
