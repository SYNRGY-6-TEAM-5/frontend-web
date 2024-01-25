import Timer from "./components/containers/Timer";
import PaymentMethod from "./components/containers/PaymentMethod";
import OrderDetail from "./components/containers/OrderDetail";
import useTimer from "@/lib/hooks/useTimer";
import Total from "./components/containers/Total";
import { Button } from "@/components/ui/button";
import PromoForm from "./components/form/PromoForm";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";

const Payment = () => {
  const date = new Date().getTime();
  const countDownTime = 5;
  const {seconds, minutes, hours, runTimer} = useTimer({date, countDownTime});

  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate('/user/payment-details');
  }

  useEffect(() => {
    if(!runTimer) {
      toast.error("Transaction Timeout", {
        description: "Please, repeate the procedure",
      })
    }
  })

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
          disabled={!runTimer}
          type="submit"
          className="rounded-xl bg-primary-500 py-4 mx-4 text-white disabled:bg-gray-600 disabled:text-black"
          onClick={handleOnClick}
        >
          Pay
        </Button>
      </div>
      <Toaster />
    </section>
  )
}

export default Payment;