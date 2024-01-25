import useTimer from "@/lib/hooks/useTimer";
import Timer from "../payment/components/containers/Timer"
import Allert from "@/components/containers/Allert";
import MethodDetails from "./components/MethodDetails";
import OrderDetail from "../payment/components/containers/OrderDetail";
import Total from "../payment/components/containers/Total";

const PaymentDetails = () => {
  const date = new Date().getTime();
  const countDownTime = 5;
  const {seconds, minutes, hours, runTimer} = useTimer({date, countDownTime});

  return(
    <section className="grid gap-4 pt-32 pb-4 px-20 lg:grid-cols-3 xs:grid-cols-1">
      {!runTimer && <Allert variant={"destructive"} tittle={"Time Out"} desc={"You can't do Payment"} position={"center"} />}
      <div className="col-span-2 flex flex-col space-y-9">
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <MethodDetails />
      </div>
      <div className="bg-white shadow-3xl flex flex-col">
        <OrderDetail />
        <Total />
      </div>
    </section>
  )
}

export default PaymentDetails;