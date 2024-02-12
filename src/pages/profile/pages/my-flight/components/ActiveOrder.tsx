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

const ActiveOrder = ({BookingUser} : BookingUserArr) => {
  const filteredOrder = BookingUser.filter(bookingUser => bookingUser.status !== "expired")
    .map(order => {
      return order
    });
  
  const navigate = useNavigate();
  const handleETicket = (orderId:number) => {
    console.log({orderId});
    navigate('/profile/success', {
      state: {
        orderId: orderId,
      }
    });
  }

  const {formatDateTime} = useFormatDateTime();
  const formatMoney = (amount: string) => {
    const parsedAmount = parseFloat(amount.replace(/,/g, ""));
    return new Intl.NumberFormat("id-ID").format(parsedAmount);
  };

  return(
    <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1">
      {filteredOrder.map((order, index) => {
        const departure = order.tickets[0].flight.departure;
        const arrival = order.tickets[0].flight.arrival;
        const total = formatMoney(String(order.total_amount));
        const flightType = order.tickets.length > 1 ? "Roundtrip" : "One Way";
        return(
        <div key={index} className="space-y-3 p-3 bg-white shadow-3xl h-fit rounded-xl">
          <div className="flex justify-between items-center">
            <Text className="text-xs font-normal text-gray-400">Order ID: {order.booking_id}</Text>
            <Text className="bg-gray-100 rounded-3xl px-2 py-1 text-primary-500 text-xs font-medium">{flightType}</Text>
          </div>
          <div className="pt-3 flex justify-between border-b border-gray-100 items-center">
            <div className="grid gap-1 pb-3">
              <Text className="text-xs font-medium text-gray-600">{formatDateTime(departure.scheduled_time)}</Text>
              <Text className="font-medium text-2xl text-gray-900">{departure.airport_details.iata_code}</Text>
              <Text className="text-xs font-normal text-gray-500">{departure.airport_details.city_name}</Text>
            </div>
            <div className="flex flex-col self-end">
              <img src={OrderIcon} />
              <img src={Globe} />
            </div>
            <div className=" text-right pb-3">
              <Text className="text-xs font-medium text-gray-600">{formatDateTime(arrival.scheduled_time)}</Text>
              <Text className="font-medium text-2xl text-gray-900">{arrival.airport_details.iata_code}</Text>
              <Text className="text-xs font-normal text-gray-500">{arrival.airport_details.city_name}</Text>
            </div>
          </div>
          {/* status null maka tampil btn waiting for payment */}
          {order.status === null ? (
            <WaitingBtn expiredTime={order.expired_time} orderId={order.booking_id} total={total} />
          ) : order.status === "true" && order.status === "true" ?(
            // sudah payment dan bisa checkin
            <>
              <label
                htmlFor="prices"
                className="group flex items-center justify-between bg-success-500 text-white p-[6px] rounded-lg cursor-pointer"
              >
                <Text className="text-sm font-normal ">You can check-in now</Text>
                <input
                  type="button"
                  id="prices"
                  name="prices"
                />
                <ChevronRight size={20} className="font-base" />
              </label>
              <Text className="text-sm font-normal text-primary-500">Your e-ticket is available!</Text>
            </>
            // sudah paymeny bisa checkin tapi expired jadi ga bisa checkin
          ) : order.status === "true" && order.fullName === "expired" ?(
            <>
              <label
                htmlFor="prices"
                className="group flex items-center justify-between bg-gray-300 text-gray-500 p-[6px] rounded-lg cursor-not-allowed"
              >
                <Text className="text-sm font-normal ">Time for check in has expired</Text>
                <input
                  type="button"
                  id="prices"
                  name="prices"
                  disabled
                />
                <ChevronRight size={20} className="font-base" />
              </label>
              <Text className="text-sm font-normal text-primary-500">Your e-ticket is available!</Text>
            </>
          ) : order.status === "true" ?(
            <>
              <Text className="text-center text-error-500 bg-error-100 rounded px-1 py-[6px] text-sm">Can't check in yet</Text>
              <Text className="text-sm font-normal text-primary-500">Your e-ticket is available!</Text>
            </>
          ) : (
            // sudah payment tapi belum bisa chekin
            <label
              htmlFor="eTicket"
              className="group flex items-center justify-between text-primary-500 cursor-pointer"
            >
              <Text className="text-sm font-normal">Your e-ticket is available!</Text>
              <input
                type="button"
                id="eTicket"
                name="eTicket"
                onClick={() => handleETicket(order.booking_id)}
              />
              <ChevronRight size={20} className="font-base" />
            </label>
          )}
          
        </div>
       
        )})
      }
     </div>
    )
}

export default ActiveOrder;