import { Text } from "@mantine/core";
import Line from "@/assets/Line26.png";
import { BookingUser } from "@/types/BookingUser";
import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";

const DetailRuteSuccess = ({BookingUser}:{BookingUser:BookingUser}) => {
  
  const { formatDate, formatTime } = useFormatDateTime();

  return(
    <div className="grid grid-flow-col gap-4">
      {BookingUser.tickets.map((ticket, index) => {
        const flightRute = index === 0 ? "Depart" : "Return";
        const transit = ticket.flight.transit === 0 ? "Non-stop" : "Transit";

        return(
          <div className="px-4 py-3 space-y-6 shadow-3xl rounded-lg bg-white">
            <div className="pb-3 border-b border-gray-100">
              <Text>{flightRute}</Text>
            </div>
            <div className="flex justify-between text-base font-normal">
              <Text><span className="text-primary-500 font-medium">Depart </span>{formatDate(ticket.flight.departure.scheduled_time)} </Text>
              <Text className="text-gray-500 text-xs font-medium px-2 bg-gray-100 rounded-3xl py-1">{transit}</Text>
            </div>
            <div className="grid grid-cols-4 h-fit w-fit mx-auto">
              <div className="text-right space-y-1 self-start">
                  <Text className="font-semibold text-2xl">{ticket.flight.departure.airport_details.iata_code}</Text>
                  <Text className="text-sm font-medium text-gray-300">{formatTime(ticket.flight.departure.scheduled_time)}</Text>
              </div>
              <div className="row-span-3 flex justify-center self-center py-3"> <img src={Line} width={3} /> </div>
              <div className="text-left space-y-1 col-span-2 self-start">
                  <Text className="text-sm font-medium">{ticket.flight.departure.airport_details.city_name}</Text>
                  <Text className="text-xs font-normal">Terminal {ticket.flight.departure.terminal} Domestic</Text>
              </div>
              <Text className="self-center font-medium col-span-2">1h 33m</Text>
              <div className="text-right space-y-1 self-end">
                  <Text className="font-semibold text-2xl">{ticket.flight.arrival.airport_details.iata_code}</Text>
                  <Text className="text-sm font-medium text-gray-300">{formatTime(ticket.flight.arrival.scheduled_time)}</Text>
              </div>
              <div className="text-left space-y-1 col-span-2 self-end ">
              <Text className="text-sm font-medium">{ticket.flight.arrival.airport_details.city_name}</Text>
                  <Text className="text-xs font-normal">Terminal {ticket.flight.arrival.terminal} Domestic</Text>
              </div>
            </div>
            <Text className="text-base font-normal"><span className="text-primary-500 font-medium">Arrived </span>{formatDate(ticket.flight.arrival.scheduled_time)} </Text>
          </div>
      )})}
    </div>
  )
}

export default DetailRuteSuccess