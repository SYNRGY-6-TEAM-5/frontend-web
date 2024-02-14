import Timer from "../payment/components/containers/Timer";
import MethodDetails from "./components/MethodDetails";
import OrderDetail from "../payment/components/containers/OrderDetail";
import Total from "../payment/components/containers/Total";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { usePassengerStore } from "@/store/useBookingStore";
import { differenceInSeconds, isFuture } from "date-fns";
import { usePaymentStripe } from "@/lib/hooks/usePayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useTimer from 'easytimer-react-hook';
import useParseTime from "@/lib/hooks/useTimer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentDetails = () => {
  const [clientSecret, setClientSecret] = useState("");

  const [count_down, setCountDown] = useState<number>(0);
  const [timer, isTargetAchieved] = useTimer({ countdown: true });
  const { seconds, minutes, hours } = useParseTime({ countDownTime: count_down })

  const { mutateAsync: makeStripePayment } = usePaymentStripe();

  const bankMethod = localStorage.getItem("bankMethod");
  const { completeBookingData, totalAmount } = usePassengerStore();

  useEffect(() => {
    const fetchIntentPaymentData = async () => {
      const { data } = await makeStripePayment(completeBookingData);
      setClientSecret(data.clientSecret);
    };

    fetchIntentPaymentData();
  }, []);

  useEffect(() => {
    const expiryTime = completeBookingData.ticket_details.expired_time;
    const currentTime = new Date();

    if (expiryTime && isFuture(new Date(expiryTime))) {
      setCountDown(differenceInSeconds(new Date(expiryTime), currentTime));
    }

    timer.start({
      countdown: true,
      startValues: { hours, minutes, seconds },
    });

    if (isTargetAchieved) {
      toast.error("Transaction Timeout", {
        description: "Please, repeat the procedure",
      });
    }

    return () => {
      timer.stop();
    };

  }, [completeBookingData, count_down, clientSecret]);

  return (
    <section className="grid gap-12 px-20 pb-4 xs:grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2 flex flex-col space-y-9">
      <Timer
          isTargetAchieved={isTargetAchieved} timeValues={timer.getTimeValues()}
        />
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
