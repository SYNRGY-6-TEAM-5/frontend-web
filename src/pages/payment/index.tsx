import Timer from "./components/containers/Timer";
import PaymentMethod from "./components/containers/PaymentMethod";
import OrderDetail from "./components/containers/OrderDetail";
import useTimer from "@/lib/hooks/useTimer";
import Total from "./components/containers/Total";
import { Button } from "@/components/ui/button";
import PromoForm from "./components/form/PromoForm";

const Payment = () => {
  const date = new Date().getTime();
  const countDownTime = 20;
  const {seconds, minutes, hours, runTimer} = useTimer({date, countDownTime});
  
  return(
    <section className="grid gap-4 pt-32 pb-4 px-20 lg:grid-cols-3 xs:grid-cols-1">
      <div className="col-span-2 flex flex-col space-y-9">
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <PaymentMethod runTimer={runTimer} /> 
      </div>
      <div className="bg-white shadow-3xl flex flex-col">
        <OrderDetail />
        <PromoForm />
        <Total />
        <Button
            type="submit"
            className="rounded-xl bg-primary-500 py-4 mx-4 text-white"
          >
            Pay
          </Button>
      </div>
    </section>
  )
}

export default Payment;