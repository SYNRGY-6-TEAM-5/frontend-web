import { ChevronLeft } from "lucide-react";
import TimerMyFlight from "./ui/TimerMyFlight";
import useTimer from "@/lib/hooks/useTimer";
import DetailRuteOrder from "./containers/DetailRuteOrder";
import PassangerDetails from "./containers/PassangerDetails";
import { Button, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "@/components/particles/BookingData";

const WaitingPayment = () => {

  const location = useLocation();
  const orderId = location.state.orderId;

  const dataBooking =data.filter(bookingUser => bookingUser.booking_id === orderId);
  const dataFiltered = dataBooking[0];
  
  const expiredSecond = new Date(dataFiltered.expired_time).getTime();
  const date = new Date().getTime();
  const countDownTime =expiredSecond - date;
  const { seconds, minutes, hours} = useTimer({date, countDownTime});

  const navigate = useNavigate();
  const handleOnClick = () => {
    console.log("hello");
    navigate('/profile/');
  }
  return(
    <section id="waitingPayment">
      <div className="grid grid-cols-3 mb-10 items-center">
        <label
          htmlFor="back"
          className="group flex items-center hover:text-primary-200 cursor-pointer"
        >
          <input
            type="button"
            id="back"
            name="back"
            onClick={handleOnClick}
          />
          <ChevronLeft size={20} />
        </label>
        
        <div className="flex flex-col text-center sm:max-lg:col-span-2">
          <Text className="font-medium">Waiting For Payment</Text>
          <Text className=" text-xs font-normal text-gray-400">Order ID:</Text>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <TimerMyFlight hours={hours} minutes={minutes} seconds={seconds} />
        <DetailRuteOrder BookingUser={dataFiltered} />
        <PassangerDetails Passangers={dataFiltered.passengers} Tickets={dataFiltered.tickets} />
        <Button
          type="button"
          className="w-full h-14 rounded-xl bg-primary-500 py-4 text-white font-medium text-sm"
        >Complete the Payment in {hours}:{minutes}:{seconds}</Button>
      </div>
    </section>
  )
}

export default WaitingPayment;