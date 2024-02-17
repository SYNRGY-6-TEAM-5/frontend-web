import { differenceInMinutes, format } from "date-fns";

import ArrowCircle from "@/assets/arrowCircle.png";

import { Ticket } from "@/types/Ticket";

interface props {
  ticket: Ticket;
  index: number;
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

const ETicketFlightCard = ({ ticket, index }: props) => {
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

  return (
    <div className="py-[20px]">
      <div className="w-full rounded-t-lg bg-black p-2 text-xs text-white">
        {index > 0 ? "Return" : " Depart"} -{" "}
        {format(ticket.flight.departure.scheduled_time, "EEEE, dd MMMM yyyy")}
      </div>
      <div className="mx-auto flex w-full flex-row items-center justify-between overflow-hidden rounded-b-lg border border-gray-200 bg-white px-[6px] py-[22px]">
        <div className="flex items-center">
          <div className="flex flex-col items-start justify-center gap-1">
            <img
              src={ticket.flight.airline.image}
              alt={ticket.flight.airline.name}
              className="h-[9px]"
            />
            <div className="text-xs font-semibold text-black">
              {ticket.flight.iata}
            </div>
          </div>
          <div className="mx-[10px] h-[46px] w-[0.4px] bg-gray-200"></div>
          <div className="flex h-[46px] w-[148px] items-center justify-between rounded-[6px] bg-[#111] px-1 py-[10px] ">
            <div className="text-white">
              <div className="text-xs font-semibold">
                {ticket.flight.departure.airport_details.iata_code}
              </div>
              <div className="text-[6px] font-medium text-[#B9C0D4]">
                {formatTime(ticket.flight.departure.scheduled_time)}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 text-white">
              <div className="text-[6px]">{timeDifference()}</div>
              <div>
                <img src={ArrowCircle} className="w-14" />
              </div>

              <div className="rounded-full bg-white px-1 text-[5px] font-medium text-black">
                {transitTime}
              </div>
            </div>
            <div className="text-white">
              <div className="text-xs font-semibold">
                {ticket.flight.arrival.airport_details.iata_code}
              </div>
              <div className="text-[6px] font-medium text-[#B9C0D4]">
                {formatTime(ticket.flight.arrival.scheduled_time)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <div className="flex h-3 w-3 rounded-full bg-[#F74E28]">
              <svg
                className="m-auto"
                width="6"
                height="7"
                viewBox="0 0 6 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.62419 2.22496V0.816756C1.62419 0.754509 1.64892 0.694812 1.69293 0.650797C1.73695 0.606782 1.79664 0.582055 1.85889 0.582055C1.92114 0.582055 1.98083 0.606782 2.02485 0.650797C2.06886 0.694812 2.09359 0.754509 2.09359 0.816756V2.22496C2.09359 2.28721 2.06886 2.3469 2.02485 2.39092C1.98083 2.43493 1.92114 2.45966 1.85889 2.45966C1.79664 2.45966 1.73695 2.43493 1.69293 2.39092C1.64892 2.3469 1.62419 2.28721 1.62419 2.22496ZM5.8488 0.816756V6.21487C5.8488 6.27711 5.82407 6.33681 5.78006 6.38083C5.73604 6.42484 5.67634 6.44957 5.6141 6.44957C5.55185 6.44957 5.49215 6.42484 5.44814 6.38083C5.40412 6.33681 5.3794 6.27711 5.3794 6.21487V4.80666H3.97119C3.90895 4.80666 3.84925 4.78194 3.80524 4.73792C3.76122 4.69391 3.73649 4.63421 3.73649 4.57196C3.74739 4.00976 3.8184 3.45034 3.94831 2.90324C4.23523 1.71537 4.77915 0.919144 5.52168 0.601124C5.55737 0.585837 5.5963 0.579642 5.63497 0.583095C5.67364 0.586548 5.71085 0.599541 5.74327 0.620909C5.77569 0.642278 5.8023 0.671355 5.82071 0.705535C5.83913 0.739715 5.84878 0.77793 5.8488 0.816756ZM5.3794 1.22455C4.43561 1.94537 4.25078 3.70122 4.2147 4.33726H5.3794V1.22455ZM3.02916 0.778323C3.02457 0.747506 3.01388 0.717912 2.99773 0.691267C2.98157 0.664623 2.96027 0.641463 2.93508 0.623136C2.90988 0.60481 2.88128 0.591684 2.85095 0.584525C2.82063 0.577367 2.78918 0.576318 2.75845 0.58144C2.72771 0.586563 2.69831 0.597754 2.67194 0.614361C2.64558 0.630968 2.62278 0.652658 2.60489 0.678167C2.587 0.703676 2.57436 0.732492 2.56772 0.762935C2.56108 0.793378 2.56057 0.824838 2.56622 0.855481L2.79769 2.24344C2.79769 2.49243 2.69878 2.73122 2.52272 2.90727C2.34666 3.08333 2.10787 3.18224 1.85889 3.18224C1.6099 3.18224 1.37112 3.08333 1.19506 2.90727C1.019 2.73122 0.920087 2.49243 0.920087 2.24344L1.15127 0.855481C1.15691 0.824838 1.1564 0.793378 1.14976 0.762935C1.14312 0.732492 1.13049 0.703676 1.11259 0.678167C1.0947 0.652658 1.07191 0.630968 1.04554 0.614361C1.01918 0.597754 0.989772 0.586563 0.959037 0.58144C0.928302 0.576318 0.896855 0.577367 0.86653 0.584525C0.836205 0.591684 0.807609 0.60481 0.782409 0.623136C0.75721 0.641463 0.735912 0.664623 0.719758 0.691267C0.703604 0.717912 0.692917 0.747506 0.68832 0.778323L0.45362 2.18653C0.451611 2.19924 0.45063 2.21209 0.450686 2.22496C0.451155 2.55759 0.569186 2.87935 0.783922 3.13338C0.998658 3.38742 1.29628 3.55737 1.62419 3.61321V6.21487C1.62419 6.27711 1.64892 6.33681 1.69293 6.38083C1.73695 6.42484 1.79664 6.44957 1.85889 6.44957C1.92114 6.44957 1.98083 6.42484 2.02485 6.38083C2.06886 6.33681 2.09359 6.27711 2.09359 6.21487V3.61321C2.4215 3.55737 2.71912 3.38742 2.93386 3.13338C3.14859 2.87935 3.26662 2.55759 3.26709 2.22496C3.26705 2.21208 3.26597 2.19923 3.26386 2.18653L3.02916 0.778323Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex h-3 w-3 rounded-full bg-[#F74E28]">
              <svg
                className="m-auto"
                width="8"
                height="6"
                viewBox="0 0 8 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.55322 1.28573H5.37972V1.05103C5.37972 0.864286 5.30554 0.685195 5.17349 0.55315C5.04145 0.421106 4.86236 0.346924 4.67562 0.346924H3.26742C3.08068 0.346924 2.90158 0.421106 2.76954 0.55315C2.6375 0.685195 2.56331 0.864286 2.56331 1.05103V1.28573H1.38981C1.26532 1.28573 1.14592 1.33518 1.05789 1.42321C0.969865 1.51124 0.92041 1.63063 0.92041 1.75513V5.51033C0.92041 5.63483 0.969865 5.75422 1.05789 5.84225C1.14592 5.93028 1.26532 5.97974 1.38981 5.97974H6.55322C6.67772 5.97974 6.79711 5.93028 6.88514 5.84225C6.97317 5.75422 7.02262 5.63483 7.02262 5.51033V1.75513C7.02262 1.63063 6.97317 1.51124 6.88514 1.42321C6.79711 1.33518 6.67772 1.28573 6.55322 1.28573ZM3.03271 1.05103C3.03271 0.988779 3.05744 0.929082 3.10146 0.885067C3.14547 0.841052 3.20517 0.816325 3.26742 0.816325H4.67562C4.73786 0.816325 4.79756 0.841052 4.84158 0.885067C4.88559 0.929082 4.91032 0.988779 4.91032 1.05103V1.28573H3.03271V1.05103ZM4.91032 1.75513V5.51033H3.03271V1.75513H4.91032ZM1.38981 1.75513H2.56331V5.51033H1.38981V1.75513ZM6.55322 5.51033H5.37972V1.75513H6.55322V5.51033Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-center gap-1">
            <div className="text-[6px] font-normal text-black">
              {" "}
              Excess baggage (+)
            </div>{" "}
            <span className="text-[6px] font-medium text-black">
              IDR 25.000/kg
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs font-medium text-[#F74E28]">
            IDR {formatMoney(ticket.fare_amount)}
          </div>
          <div className="font-inter text-[10px] text-gray-500">/pax</div>
        </div>
      </div>
    </div>
  );
};

export default ETicketFlightCard;
