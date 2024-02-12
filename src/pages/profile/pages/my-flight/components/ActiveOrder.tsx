import { Text } from "@mantine/core";
import OrderIcon from "@/assets/order-icon.png";
import Globe from "@/assets/globe.png";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookingUser } from "@/types/BookingUser";
import WaitingBtn from "./ui/WaitingBtn";
import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";

interface BookingUserArr {
  BookingUser: BookingUser[];
}

const ActiveOrder = ({ BookingUser }: BookingUserArr) => {
  const filteredOrder = BookingUser.filter(
    (bookingUser) => bookingUser.status !== "expired",
  );

  const navigate = useNavigate();
  const handleETicket = (orderId: number) => {
    navigate(`/profile/booking/${orderId}`);
  };

  const { formatDateTime } = useFormatDateTime();
  const formatMoney = (amount: string) => {
    const parsedAmount = parseFloat(amount.replace(/,/g, ""));
    return new Intl.NumberFormat("id-ID").format(parsedAmount);
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
      {filteredOrder.map((order) => {
        const departure = order.tickets[0].flight.departure;
        const arrival = order.tickets[0].flight.arrival;
        const total = formatMoney(String(order.total_amount));
        return (
          <div
            key={order.booking_id}
            className="h-fit space-y-3 rounded-xl bg-white p-3 shadow-3xl"
          >
            <div className="flex items-center justify-between">
              <Text className="text-xs font-normal text-gray-400">
                Order ID: {order.booking_id}
              </Text>
              <Text className="rounded-3xl bg-gray-100 px-2 py-1 text-xs font-medium text-primary-500">
                {order.map_ticket.length > 1 ? "Roundtrip" : "One-Way"}
              </Text>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pt-3">
              <div className="grid gap-1 pb-3">
                <Text className="text-xs font-medium text-gray-600">
                  {formatDateTime(departure.scheduled_time)}
                </Text>
                <Text className="text-2xl font-medium text-gray-900">
                  {departure.airport_details.iata_code}
                </Text>
                <Text className="text-xs font-normal text-gray-500">
                  {departure.airport_details.city_name}
                </Text>
              </div>
              <div className="flex flex-col self-end">
                <img src={OrderIcon} />
                <img src={Globe} />
              </div>
              <div className=" pb-3 text-right">
                <Text className="text-xs font-medium text-gray-600">
                  {formatDateTime(arrival.scheduled_time)}
                </Text>
                <Text className="text-2xl font-medium text-gray-900">
                  {arrival.airport_details.iata_code}
                </Text>
                <Text className="text-xs font-normal text-gray-500">
                  {arrival.airport_details.city_name}
                </Text>
              </div>
            </div>
            {/* status null maka tampil btn waiting for payment */}
            {order.status === null || order.status === "PENDING" ? (
              <WaitingBtn
                expiredTime={order.expired_time}
                orderId={order.booking_id}
                total={total}
              />
            ) : order.status === "true" && order.status === "true" ? (
              // sudah payment dan bisa checkin
              <>
                <label
                  htmlFor="prices"
                  className="group flex cursor-pointer items-center justify-between rounded-lg bg-success-500 p-[6px] text-white"
                >
                  <Text className="text-sm font-normal ">
                    You can check-in now
                  </Text>
                  <input type="button" id="prices" name="prices" />
                  <ChevronRight size={20} className="font-base" />
                </label>
                <Text className="text-sm font-normal text-primary-500">
                  Your e-ticket is available!
                </Text>
              </>
            ) : // sudah paymeny bisa checkin tapi expired jadi ga bisa checkin
            order.status === "true" && order.fullName === "expired" ? (
              <>
                <label
                  htmlFor="prices"
                  className="group flex cursor-not-allowed items-center justify-between rounded-lg bg-gray-300 p-[6px] text-gray-500"
                >
                  <Text className="text-sm font-normal ">
                    Time for check in has expired
                  </Text>
                  <input type="button" id="prices" name="prices" disabled />
                  <ChevronRight size={20} className="font-base" />
                </label>
                <Text className="text-sm font-normal text-primary-500">
                  Your e-ticket is available!
                </Text>
              </>
            ) : order.status === "true" ? (
              <>
                <Text className="rounded bg-error-100 px-1 py-[6px] text-center text-sm text-error-500">
                  Can't check in yet
                </Text>
                <Text className="text-sm font-normal text-primary-500">
                  Your e-ticket is available!
                </Text>
              </>
            ) : (
              // sudah payment tapi belum bisa chekin
              <div
                className="flex cursor-pointer items-center justify-between text-primary-500"
                onClick={() => handleETicket(order.booking_id)}
              >
                <Text className="text-sm font-normal">
                  Your e-ticket is available!
                </Text>
                <ChevronRight size={20} className="font-base" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ActiveOrder;
