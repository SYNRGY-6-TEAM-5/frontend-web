import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";
import { BookingUser } from "@/types/BookingUser";
import { Text } from "@mantine/core";
import Globe from "@/assets/globe.png";
import OrderIcon from "@/assets/order-icon.png";

interface DataAwaiting {
  order : BookingUser[],
  status: "waiting" | "processing" | "completed" | "canceled"
}

const OrderPage = ({order, status}:DataAwaiting) => {
  const {formatDateTime} = useFormatDateTime();
  const statusInfo = 
    status === "waiting" ? "Waiting Payment"
    : status === "processing" ? "Processing"
    : status === "completed" ? "Completed"
    : "Canceled";
  
  return(
    <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1">
      {order.map((orderData, index) => {
        const departure = orderData.tickets[0].flight.departure;
        const arrival = orderData.tickets[0].flight.arrival;
        const flightType = orderData.tickets.length > 1 ? "Roundtrip" : "One Way";
        return(
          <div key={index} className="space-y-3 p-3 bg-white shadow-3xl h-fit rounded-xl">
            <div className="flex justify-between items-center">
              <Text className="text-xs font-normal text-gray-400">Order ID: {orderData.booking_id}</Text>
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
            <Text className="font-normal text-sm text-gray-400">{statusInfo}</Text>
          </div>
      )})}
    </div>
  )
}

export default OrderPage;