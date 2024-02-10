import Timer from "./components/containers/Timer";
import PaymentMethod from "./components/containers/PaymentMethod";
import OrderDetail from "./components/containers/OrderDetail";
import Total from "./components/containers/Total";
import { Button } from "@/components/ui/button";
import PromoForm from "./components/form/PromoForm";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { useFetchBooking } from "@/lib/hooks/usePayment";
import { usePassengerStore } from "@/store/useBookingStore";
import { differenceInSeconds, isFuture } from "date-fns";
import TimerExpired from "./components/containers/TimerExpired";
import { calculateTotalPrice, summarizeBooking } from "@/lib/totalSummarizer";

const Payment = () => {
  const { booking_id } = useParams<{ booking_id?: string }>();
  const parsedBookingId = booking_id ? parseInt(booking_id, 10) : null;

  const navigate = useNavigate();
  const method = localStorage.getItem("bankMethod");

  const [count_down, setCountDown] = useState<number>(0);
  const [isRunOut, setIsRunOut] = useState<boolean>(false);

  const [total, setTotal] = useState(0);

  const handleTimerStatusChange = (timerStatus: boolean) => {
    setIsRunOut(timerStatus);
  };

  window.location.pathname.includes("/user/payment/");

  const { setTotalAmount, updateCompleteBookingData: handleAddToCompleteBooking } =
    usePassengerStore();
  const { data, cartTicket } = useFetchBooking(parsedBookingId);

  const completeBooking = data;

  const handleOnClick = () => {
    if (method) {
      navigate(`/user/payment/payment-details/${booking_id}`);
    } else {
      toast.error("Payment Method", {
        description: "Please, Select Payment Method",
      });
    }
  };

  // Call hooks unconditionally
  useEffect(() => {
    if (data.contact_details.email === "" && count_down < 1 && total < 1) {
      return;
    }
    handleAddToCompleteBooking(data);
    setTotalAmount(total);

    const summary = summarizeBooking(data, cartTicket);

    setTotal(calculateTotalPrice(summary));

    const expiryTime = completeBooking?.ticket_details.expired_time;
    const currentTime = new Date();

    if (expiryTime && isFuture(new Date(expiryTime))) {
      setCountDown(differenceInSeconds(new Date(expiryTime), currentTime));
    }
  }, [data, total]);
  console.log("total >>> ", total);

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
        <PaymentMethod runTimer={isRunOut} />
      </div>
      <div className="flex flex-col bg-white shadow-3xl">
        {completeBooking.contact_details.email !== "" ? (
          <OrderDetail completeBooking={completeBooking} />
        ) : (
          ""
        )}
        <PromoForm />
        {total > 0 && (
          <Total completeBooking={completeBooking} totalPrice={total} />
        )}
        <Button
          disabled={!isRunOut}
          type="submit"
          className="mx-4 rounded-xl bg-primary-500 py-4 text-white disabled:bg-gray-600 disabled:text-black"
          onClick={handleOnClick}
        >
          Pay
        </Button>
      </div>
      <Toaster />
    </section>
  );
};

export default Payment;
