import { ChevronLeft } from "lucide-react";
import TimerMyFlight from "./ui/TimerMyFlight";
import useTimer from "@/lib/hooks/useTimer";
import DetailRuteOrder from "./containers/DetailRuteOrder";

const WaitingPayment = () => {
  const date = new Date().getTime();
  const countDownTime = 1000;
  const {seconds, minutes, hours} = useTimer({date, countDownTime});
  return(
    <section id="waitingPayment">
      <div className="grid grid-cols-3 mb-10 items-center">
        <label
          htmlFor="back"
          className="group flex items-center hover:text-primary-200"
        >
          <input
            type="button"
            id="back"
            name="back"
          />
          <ChevronLeft size={20} />
        </label>
        
        <div className="flex flex-col text-center sm:max-lg:col-span-2">
          <text className="font-medium">Waiting For Payment</text>
          <text className=" text-xs font-normal text-gray-400">Order ID:</text>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <TimerMyFlight hours={hours} minutes={minutes} seconds={seconds} />
        <DetailRuteOrder />
      </div>
    </section>
  )
}

export default WaitingPayment;