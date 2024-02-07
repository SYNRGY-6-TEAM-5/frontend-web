import useTimer from "@/lib/hooks/useTimer";
import Timer from "../payment/components/containers/Timer"
import MethodDetails from "./components/MethodDetails";
import OrderDetail from "../payment/components/containers/OrderDetail";
import Total from "../payment/components/containers/Total";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";

const PaymentDetails = () => {
  const bankMethod = localStorage.getItem("bankMethod");
  const date = new Date().getTime();
  const countDownTime = 5;
  const {seconds, minutes, hours, runTimer} = useTimer({date, countDownTime});

  useEffect(() => {
    if(!runTimer) {
      toast.error("Transaction Timeout", {
        description: "Please, repeate the procedure"
      })
    }
  })
  
  return(
    <section className="grid gap-12 pb-4 px-20 lg:grid-cols-3 xs:grid-cols-1">
      <div className="col-span-2 flex flex-col space-y-9">
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <MethodDetails bankMethod={String(bankMethod)} />
      </div>
      <div className="bg-white shadow-3xl flex flex-col">
        <OrderDetail />
        <Total />
      </div>
      <Toaster />
    </section>
  )
}

export default PaymentDetails;