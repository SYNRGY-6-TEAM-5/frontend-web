import { Text } from "@mantine/core";
import OrderSummary from "../ui/OrderSummary";
import Rute from "./Rute";
import { transformCartData } from "@/lib/dataformatter";
import { CartItem } from "@/store/useCartStore";
import React from "react";
import { ICompleteBooking } from "@/types/Booking";
import { useParams } from "react-router-dom";

interface OrderDetailProps {
  completeBooking: ICompleteBooking;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ completeBooking }) => {
  const { booking_id, user_id } = useParams<{
    booking_id?: string;
    user_id?: string;
  }>();
  let cartTicket: CartItem[] = transformCartData(completeBooking);

  return (
    <div className="p-4">
      {cartTicket.length > 0 ? (
        cartTicket.map((ticket, index) => (
          <div key={index}>
            <Text className="mb-6 text-xs font-normal text-gray-400">
              Order ID:
              {` AERSWFT-${booking_id}_${user_id?.slice(0, 5).toUpperCase()}`}
            </Text>
            <Rute
              departure={
                ticket.flight?.departure?.airport_details?.iata_code ?? ""
              }
              departureTime={ticket.flight?.departure?.scheduled_time}
              desc={
                ticket.flight?.transit !== 0
                  ? `${ticket.flight.transit} Transit`
                  : "Non-Stop"
              }
              arrival={ticket.flight?.arrival?.airport_details?.iata_code ?? ""}
              arrivalTime={ticket.flight?.arrival?.scheduled_time}
            />
            <OrderSummary completeBooking={completeBooking} />
          </div>
        ))
      ) : (
        <p>No tickets available</p>
      )}
    </div>
  );
};

export default OrderDetail;
