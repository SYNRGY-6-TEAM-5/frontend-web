import Timer from "../payment/components/containers/Timer";
import MethodDetails from "./components/MethodDetails";
import OrderDetail from "../payment/components/containers/OrderDetail";
import Total from "../payment/components/containers/Total";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { usePassengerStore } from "@/store/useBookingStore";
import { differenceInSeconds, isFuture } from "date-fns";

const PaymentDetails = () => {
  const bankMethod = localStorage.getItem("bankMethod");
  const [count_down, setCountDown] = useState<number>(0);
  const [isRunOut, setIsRunOut] = useState<boolean>(false);
  const { completeBookingData } = usePassengerStore();

  const handleTimerStatusChange = (timerStatus: boolean) => {
    setIsRunOut(timerStatus);
  };

  const expiryTime = completeBookingData?.ticket_details.expired_time;
  const currentTime = new Date();

  useEffect(() => {
    if (expiryTime && isFuture(new Date(expiryTime))) {
      setCountDown(differenceInSeconds(new Date(expiryTime), currentTime));
    }
    if (!isRunOut) {
      toast.error("Transaction Timeout", {
        description: "Please, repeate the procedure",
      });
    }
  }, [completeBookingData]);

  return (
    <section className="grid gap-12 px-20 pb-4 xs:grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2 flex flex-col space-y-9">
        {count_down > 0 ? (
          <Timer
            countDown={count_down}
            onTimerStatusChange={handleTimerStatusChange}
          />
        ) : (
          ""
        )}
        <MethodDetails bankMethod={String(bankMethod)} />
      </div>
      <div className="flex flex-col bg-white shadow-3xl">
        {completeBookingData.contact_details.email !== "" ? (
          <OrderDetail completeBooking={completeBookingData} />
        ) : (
          ""
        )}
        <Total completeBooking={completeBookingData} />
      </div>
      <Toaster />
    </section>
  );
};

export default PaymentDetails;
