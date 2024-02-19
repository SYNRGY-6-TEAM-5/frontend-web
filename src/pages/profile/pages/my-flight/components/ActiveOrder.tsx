import { Text } from "@mantine/core";
import OrderIcon from "@/assets/order-icon.png";
import Globe from "@/assets/globe.png";
import { useNavigate } from "react-router-dom";
import { BookingUser } from "@/types/BookingUser";
import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";
import OrderStatusComponent from "./ui/Checkin";
import NoActiveFlight from "./NoActiveFlight";

interface BookingUserArr {
  BookingUser: BookingUser[];
}

const ActiveOrder = ({ BookingUser }: BookingUserArr) => {
  const filteredOrder = BookingUser.filter((bookingUser) => {
    const num = bookingUser.tickets.length - 1;
    return (
      bookingUser.status !== "FAILED" &&
      new Date(bookingUser.tickets[num].flight.arrival.scheduled_time) >
        new Date()
    );
  });

  const navigate = useNavigate();
  const handleETicket = (orderId: number) => {
    navigate(`/profile/booking/${orderId}`);
  };

  const { formatDateTime } = useFormatDateTime();
  const formatMoney = (amount: string) => {
    const parsedAmount = parseFloat(amount.replace(/,/g, ""));
    return new Intl.NumberFormat("id-ID").format(parsedAmount);
  };

  return filteredOrder.length > 0 ? (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
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
            <OrderStatusComponent
              order={order}
              total={total}
              handleETicket={handleETicket}
            />
          </div>
        );
      })}
    </div>
  ) : (
    <NoActiveFlight />
  );
};

export default ActiveOrder;
