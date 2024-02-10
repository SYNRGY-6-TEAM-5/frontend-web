import ArrowCircle from "@/assets/ArrowCircleRight.png";
import { GarudaLogo } from "@/assets/svg";
import DetailRuteBtn from "../ui/DetailRuteBtn";
import { Text } from "@mantine/core";
import { BookingUser } from "@/types/BookingUser";
import useFormatDateTime from "@/lib/hooks/useFormatDateTIme";

const DetailRuteOrder = ({BookingUser}:{BookingUser:BookingUser}) => {

  const { formatDate, formatTime } = useFormatDateTime();

  return(
    <div className="shadow-3xl rounded-lg bg-white">
      <div className="bg-black rounded-t-lg text-white text-center flex justify-center space-x-5 p-1 items-center">
        <Text>{BookingUser.tickets[0].flight.departure.airport_details.iata_code}</Text>
        <img src={ArrowCircle}/>
        <Text>{BookingUser.tickets[0].flight.arrival.airport_details.iata_code}</Text>
      </div>
      <div>
        {BookingUser.tickets.map((ticket, index) => {
          let flightRute ="";
          {index === 0 ? flightRute = "Depart" : flightRute = "Return"}

          return(
            <div key={String(index)} className="p-3 space-y-3 border-t border-dashed border-gray-300">
              <div className="flex justify-between text-base font-medium">
                <Text className="text-primary-500">{flightRute}</Text>
                <div className="flex flex-row items-center">
                  {ticket.flight.airline_id === 1 ?(
                    <GarudaLogo className="h-2" />
                  ): (<img src={ticket.flight.airline.image} sizes="20" />)}
                  <Text>{ticket.flight.iata}</Text>
                </div>
              </div>

              <div className="flex justify-between font-medium">
                <Text className="text-lg ">{formatDate(ticket.flight.departure.scheduled_time)}</Text>
                <Text className="text-gray-500 text-sm">{formatTime(ticket.flight.departure.scheduled_time)}</Text>
              </div>

              <DetailRuteBtn ticket={ticket} flightRute={flightRute} />
            </div>
        )})}        
      </div>
    </div>
  )
}

export default DetailRuteOrder