import { ChevronLeft } from "lucide-react";
import TimerMyFlight from "./ui/TimerMyFlight";
import useTimer from "@/lib/hooks/useTimer";
import DetailRuteOrder from "./containers/DetailRuteOrder";
import PassangerDetails from "./containers/PassangerDetails";
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const WaitingPayment = () => {
  const date = new Date().getTime();
  const countDownTime = 1000;
  const {seconds, minutes, hours} = useTimer({date, countDownTime});

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
        <DetailRuteOrder />
        <PassangerDetails />
        <Button
          type="button"
          className="w-full h-14 rounded-xl bg-primary-500 py-4 text-white font-medium text-sm"
        >Complete the Payment in {hours}:{minutes}:{seconds}</Button>
      </div>
    </section>
  )
}

export default WaitingPayment;