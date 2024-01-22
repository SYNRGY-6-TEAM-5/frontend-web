import Timer from "./components/Timer";
import PaymentMethod from "./components/PaymentMethod";
import OrderDetail from "./components/OrderDetail";
import useTimer from "@/lib/hooks/useTimer";

const Payment = () => {
  const date = new Date().getTime();
  const countDownTime = 20;
  const {seconds, minutes, hours, runTimer} = useTimer({date, countDownTime});
  
  return(
    <section className="grid grid-cols-3 gap-4 pt-32 px-20">
      <div className="col-span-2 grid gap-8">
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <PaymentMethod runTimer={runTimer} /> 
      </div>
      <OrderDetail />
    </section>
  )
}

export default Payment;