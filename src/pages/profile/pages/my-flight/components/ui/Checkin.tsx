import { Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import WaitingBtn from "./WaitingBtn";
import { BookingUser } from "@/types/BookingUser";
import { format, isAfter, isBefore, sub } from "date-fns";

const CheckinButton = ({
  label,
  disabled = false,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) => (
  <label
    htmlFor="prices"
    className={`group flex cursor-${
      disabled ? "not-allowed" : "pointer"
    } items-center justify-between rounded-lg ${
      disabled ? "bg-gray-300 text-gray-500" : "bg-success-500 text-white"
    } p-[6px]`}
  >
    <Text className="text-sm font-normal">{label}</Text>
    <input
      type="button"
      id="prices"
      name="prices"
      disabled={disabled}
      onClick={onClick}
    />
    <ChevronRight size={20} className="font-base" />
  </label>
);

const OrderStatusComponent = ({
  order,
  total,
  handleETicket,
}: {
  order: BookingUser;
  total: string;
  handleETicket: (id: number) => void;
}) => {
  const canCheckin = () => {
    const index =
      order.tickets.length > 1
        ? isAfter(new Date(), order.tickets[0].flight.departure.scheduled_time)
          ? 0
          : 1
        : 0;

    const sehariSebelumBerangkat = sub(
      order.tickets[index].flight.departure.scheduled_time,
      { days: 1 },
    );
    const lastCall = sub(order.tickets[index].flight.departure.scheduled_time, {
      minutes: 75,
    });
    if (
      isAfter(new Date(), sehariSebelumBerangkat) &&
      isBefore(new Date(), lastCall)
    ) {
      return (
        <CheckinButton
          label="You can check-in now"
          onClick={() => handleETicket(order.booking_id)}
        />
      );
    } else if (isAfter(new Date(), lastCall)) {
      return (
        <CheckinButton label="Time for check in has expired" disabled={true} />
      );
    } else {
      return (
        <Text className="rounded-lg bg-orange-100 p-[6px] text-sm text-orange-500">
          You can check in at{" "}
          {format(sehariSebelumBerangkat, "EEEE, dd MMM yyyy hh:mm")}
        </Text>
      );
    }
  };

  if (order.status === null || order.status === "PENDING") {
    return (
      <WaitingBtn
        expiredTime={order.expired_time}
        orderId={order.booking_id}
        total={total}
      />
    );
  } else if (order.status !== "PENDING" && order.status !== "FAILED") {
    return (
      <>
        {canCheckin()}
        <div
          className="flex cursor-pointer justify-between text-primary-500"
          onClick={() => handleETicket(order.booking_id)}
        >
          <Text className="text-sm font-normal text-primary-500">
            Your e-ticket is available!
          </Text>
          <ChevronRight size={20} className="font-base" />
        </div>
      </>
    );
  } else {
    return (
      <Text className="rounded-lg bg-error-100 px-1 py-[6px] text-center text-sm text-error-500">
        Booking Failed
      </Text>
    );
  }
};

export default OrderStatusComponent;
