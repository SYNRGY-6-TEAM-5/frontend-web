import Timer from "../payment/components/containers/Timer";
import MethodDetails from "./components/MethodDetails";
import OrderDetail from "../payment/components/containers/OrderDetail";
import Total from "../payment/components/containers/Total";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { usePassengerStore } from "@/store/useBookingStore";
import { differenceInSeconds, isFuture } from "date-fns";
import TimerExpired from "../payment/components/containers/TimerExpired";
import { usePaymentStripe } from "@/lib/hooks/usePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Nl0LBAB9ked6PM5u4Oj2nlhbiPStfn0Y9nI7gUI5xJoXdnHIeU0e285JEm6xj4gufnNkUKtfaG0CCXykwalqmwO00qRMlPdS5",
);

const PaymentDetails = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { mutateAsync: makeStripePayment } = usePaymentStripe();

  const bankMethod = localStorage.getItem("bankMethod");
  const [count_down, setCountDown] = useState<number>(0);
  const [isRunOut, setIsRunOut] = useState<boolean>(false);
  const { completeBookingData, totalAmount } = usePassengerStore();

  const handleTimerStatusChange = (timerStatus: boolean) => {
    setIsRunOut(timerStatus);
  };

  const expiryTime = completeBookingData?.ticket_details.expired_time;
  const currentTime = new Date();

  useEffect(() => {
    const fetchIntentPaymentData = async () => {
      const { data } = await makeStripePayment();
      setClientSecret(data.clientSecret);
    };

    fetchIntentPaymentData();

    return;
  }, []);

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
          <TimerExpired />
        )}
        {stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <MethodDetails bankMethod={String(bankMethod)} />
          </Elements>
        )}
      </div>
      <div className="flex flex-col bg-white shadow-3xl">
        {completeBookingData.contact_details.email !== "" ? (
          <OrderDetail completeBooking={completeBookingData} />
        ) : (
          ""
        )}
        <Total
          completeBooking={completeBookingData}
          totalPrice={totalAmount}
        />
      </div>
      <Toaster />
    </section>
  );
};

export default PaymentDetails;
