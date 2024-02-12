import { ChevronLeft } from "lucide-react";
import TimerMyFlight from "./ui/TimerMyFlight";
import useParseTime from "@/lib/hooks/useTimer";
import DetailRuteOrder from "./containers/DetailRuteOrder";
import PassangerDetails from "./containers/PassangerDetails";
import { Button, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "@/components/particles/BookingData";
import { useEffect, useState } from "react";
import { differenceInSeconds, isFuture } from "date-fns";
import useTimer from 'easytimer-react-hook';
import useNav from "@/lib/hooks/useNav";

const WaitingPayment = () => {
  const [count_down, setCountDown] = useState<number>(0);
  const [isRunOut, setIsRunOut] = useState<boolean>(false);
  
  const { userData } = useNav();

  const [timer] = useTimer({ countdown: true });

  const location = useLocation();
  const orderId = location.state.orderId;

  const dataBooking = data.filter(bookingUser => bookingUser.booking_id === orderId);
  const dataFiltered = dataBooking[0];

  const { seconds, minutes, hours } = useParseTime({ countDownTime: count_down });

  const navigate = useNavigate();

  const handleOnClick = () => {
    console.log("hello");
    navigate('/profile/');
  }

  const handlePay = () => {
    if (userData) {
      navigate(`/user/payment/${userData.id}/${dataBooking[0].booking_id}`);
    } else {
      console.log(userData)
    }
  };

  useEffect(() => {
    const expiryTime = data[0].expired_time;
    const currentTime = new Date();

    if (expiryTime && isFuture(new Date(expiryTime))) {
      setCountDown(differenceInSeconds(new Date(expiryTime), currentTime));
      setIsRunOut(false);
    } else {
      setIsRunOut(true);
    }

    timer.start({
      countdown: true,
      startValues: { hours, minutes, seconds },
    });
  }, [data, seconds, minutes, hours]);

  return (
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
          <Text className=" text-xs font-normal text-gray-400">Order ID: {dataBooking[0].booking_id}</Text>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <TimerMyFlight timeValues={timer.getTimeValues()} />
        <DetailRuteOrder BookingUser={dataFiltered} />
        <PassangerDetails Passangers={dataFiltered.passengers} Tickets={dataFiltered.tickets} />
        {!isRunOut && (
          <Button
            onClick={handlePay}
            type="button"
            className="w-full h-14 rounded-xl bg-primary-500 py-4 text-white font-medium text-sm"
          >
            Complete the Payment in {hours}:{minutes}:{seconds}
          </Button>)}
      </div>
    </section>
  )
}

export default WaitingPayment;