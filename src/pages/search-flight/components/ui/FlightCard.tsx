import { Ticket } from "@/types/Ticket";
import ArrowCircle from "../../../../assets/arrowCircle.png";
import { differenceInMinutes, format } from "date-fns";

interface props {
  ticket: Ticket;
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

const FlightCard = ({ ticket }: props) => {
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
    <section className="mx-auto flex w-full flex-row items-center justify-between overflow-x-hidden rounded-xl border border-gray-100 bg-white px-4 py-6">
      <div className="flex items-center">
        <div className="flex flex-col gap-2">
          <img src={ticket.flight.airline.image} alt="" width={48} />
          <div className="text-Base-Black font-inter leading-38 text-[30px] font-semibold">
            {ticket.flight.iata}
          </div>
        </div>
        <div className="mx-7 h-[116px] w-px bg-gray-200"></div>
        <div className="flex h-[116px] w-[340px] items-center justify-between rounded-[16px] bg-[#111] p-3 ">
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
          <div className="flex h-9 w-9 rounded-full bg-[#F74E28]">
            <svg
              className="m-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5.9157 7.08267V3.58267C5.9157 3.42796 5.97715 3.27958 6.08655 3.17019C6.19595 3.06079 6.34432 2.99933 6.49903 2.99933C6.65374 2.99933 6.80211 3.06079 6.91151 3.17019C7.0209 3.27958 7.08236 3.42796 7.08236 3.58267V7.08267C7.08236 7.23738 7.0209 7.38575 6.91151 7.49514C6.80211 7.60454 6.65374 7.666 6.49903 7.666C6.34432 7.666 6.19595 7.60454 6.08655 7.49514C5.97715 7.38575 5.9157 7.23738 5.9157 7.08267ZM16.4157 3.58267V16.9993C16.4157 17.154 16.3542 17.3024 16.2448 17.4118C16.1354 17.5212 15.9871 17.5827 15.8324 17.5827C15.6777 17.5827 15.5293 17.5212 15.4199 17.4118C15.3105 17.3024 15.249 17.154 15.249 16.9993V13.4993H11.749C11.5943 13.4993 11.4459 13.4379 11.3365 13.3285C11.2272 13.2191 11.1657 13.0707 11.1657 12.916C11.1928 11.5187 11.3693 10.1283 11.6922 8.7685C12.4053 5.8161 13.7572 3.83715 15.6027 3.04673C15.6914 3.00873 15.7881 2.99333 15.8842 3.00192C15.9804 3.0105 16.0728 3.04279 16.1534 3.0959C16.234 3.14901 16.3001 3.22128 16.3459 3.30623C16.3917 3.39119 16.4157 3.48617 16.4157 3.58267ZM15.249 4.59621C12.9033 6.38777 12.4439 10.7518 12.3542 12.3327H15.249V4.59621ZM9.40768 3.48714C9.39625 3.41055 9.36969 3.337 9.32954 3.27077C9.28939 3.20455 9.23645 3.14699 9.17382 3.10144C9.11119 3.05589 9.04012 3.02327 8.96475 3.00547C8.88937 2.98768 8.81121 2.98507 8.73482 2.99781C8.65844 3.01054 8.58535 3.03835 8.51982 3.07963C8.45429 3.1209 8.39764 3.17481 8.35317 3.23821C8.30869 3.30161 8.27729 3.37323 8.26079 3.4489C8.24429 3.52456 8.24302 3.60276 8.25705 3.67892L8.83236 7.1286C8.83236 7.74744 8.58653 8.34093 8.14895 8.77852C7.71136 9.2161 7.11787 9.46194 6.49903 9.46194C5.88019 9.46194 5.2867 9.2161 4.84911 8.77852C4.41153 8.34093 4.1657 7.74744 4.1657 7.1286L4.74028 3.67892C4.75431 3.60276 4.75304 3.52456 4.73654 3.4489C4.72004 3.37323 4.68863 3.30161 4.64416 3.23821C4.59969 3.17481 4.54304 3.1209 4.47751 3.07963C4.41198 3.03835 4.33889 3.01054 4.2625 2.99781C4.18612 2.98507 4.10796 2.98768 4.03258 3.00547C3.95721 3.02327 3.88614 3.05589 3.82351 3.10144C3.76088 3.14699 3.70794 3.20455 3.66779 3.27077C3.62764 3.337 3.60108 3.41055 3.58965 3.48714L3.00632 6.98715C3.00133 7.01874 2.99889 7.05068 2.99903 7.08267C3.00019 7.9094 3.29355 8.70912 3.82727 9.3405C4.36098 9.97188 5.10069 10.3943 5.9157 10.5331V16.9993C5.9157 17.154 5.97715 17.3024 6.08655 17.4118C6.19595 17.5212 6.34432 17.5827 6.49903 17.5827C6.65374 17.5827 6.80211 17.5212 6.91151 17.4118C7.0209 17.3024 7.08236 17.154 7.08236 16.9993V10.5331C7.89737 10.3943 8.63708 9.97188 9.17079 9.3405C9.70451 8.70912 9.99786 7.9094 9.99903 7.08267C9.99893 7.05066 9.99624 7.01872 9.99101 6.98715L9.40768 3.48714Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="flex h-9 w-9 rounded-full bg-[#F74E28]">
            <svg
              className="m-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M16.4189 4.74996H13.5023V4.16663C13.5023 3.7025 13.3179 3.25738 12.9897 2.92919C12.6615 2.601 12.2164 2.41663 11.7523 2.41663H8.25228C7.78815 2.41663 7.34303 2.601 7.01484 2.92919C6.68665 3.25738 6.50228 3.7025 6.50228 4.16663V4.74996H3.58561C3.27619 4.74996 2.97945 4.87288 2.76065 5.09167C2.54186 5.31046 2.41895 5.60721 2.41895 5.91663V15.25C2.41895 15.5594 2.54186 15.8561 2.76065 16.0749C2.97945 16.2937 3.27619 16.4166 3.58561 16.4166H16.4189C16.7284 16.4166 17.0251 16.2937 17.2439 16.0749C17.4627 15.8561 17.5856 15.5594 17.5856 15.25V5.91663C17.5856 5.60721 17.4627 5.31046 17.2439 5.09167C17.0251 4.87288 16.7284 4.74996 16.4189 4.74996ZM7.66895 4.16663C7.66895 4.01192 7.7304 3.86354 7.8398 3.75415C7.9492 3.64475 8.09757 3.58329 8.25228 3.58329H11.7523C11.907 3.58329 12.0554 3.64475 12.1648 3.75415C12.2742 3.86354 12.3356 4.01192 12.3356 4.16663V4.74996H7.66895V4.16663ZM12.3356 5.91663V15.25H7.66895V5.91663H12.3356ZM3.58561 5.91663H6.50228V15.25H3.58561V5.91663ZM16.4189 15.25H13.5023V5.91663H16.4189V15.25Z"
                fill="white"
              />
            </svg>
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
        <div className="text-3xl font-medium leading-9 text-[#F74E28]">
          IDR {formatMoney(ticket.fare_amount)}
        </div>
        <div className="font-inter leading-32 font-regular text-[24px] text-gray-500">
          /pax
        </div>
      </div>
    </section>
  );
};

export default FlightCard;
