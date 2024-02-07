import Timer from "./components/containers/Timer";
import PaymentMethod from "./components/containers/PaymentMethod";
import OrderDetail from "./components/containers/OrderDetail";
import useTimer from "@/lib/hooks/useTimer";
import Total from "./components/containers/Total";
import { Button } from "@/components/ui/button";
import PromoForm from "./components/form/PromoForm";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { ICompleteBooking } from "@/types/Booking";
import { CartItem } from "@/store/useCartStore";
import { useFetchBooking, useSavedBooking } from "@/lib/hooks/usePayment";
import { transformCartData } from "@/lib/dataformatter";
import { useCartStore } from "@/store/useCartStore";
import { usePassengerStore } from "@/store/useBookingStore";

const Payment = () => {
  const { booking_id } = useParams<{ booking_id?: string }>();
  const parsedBookingId = booking_id ? parseInt(booking_id, 10) : null;

  const date = new Date().getTime();
  const countDownTime = 5;
  const { seconds, minutes, hours, runTimer } = useTimer({
    date,
    countDownTime,
  });
  const method = localStorage.getItem("bankMethod");

  const { updateCompleteBookingData: handleAddToCompleteBooking } =
    usePassengerStore();

  let completeBooking: ICompleteBooking;
  let cartTicket: CartItem[];

  const isInPaymentPage: boolean =
    window.location.pathname.includes("/user/payment/");

  if (isInPaymentPage) {
    const { data } = useFetchBooking(parsedBookingId);
    completeBooking = data;
    cartTicket = transformCartData(data);
  } else {
    const { cart } = useCartStore();
    const { completeBookingData } = useSavedBooking();
    completeBooking = completeBookingData;
    cartTicket = cart;
  }

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (method) {
      navigate("/user/payment-details/");
    } else {
      toast.error("Payment Method", {
        description: "Please, Select Payment Method",
      });
    }
  };

  useEffect(() => {
    if (!runTimer) {
      toast.error("Transaction Timeout", {
        description: "Please, repeate the procedure",
      });
    }
  });

  useEffect(() => {
    const bookingData: ICompleteBooking = completeBooking;
    console.log("bookingData >>> ", bookingData);
    handleAddToCompleteBooking(bookingData);
  }, [completeBooking]);

  return (
    <section className="grid gap-12 px-20 pb-4 xs:grid-cols-1 lg:grid-cols-3">
      <div className="col-span-2 flex flex-col space-y-9">
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <PaymentMethod runTimer={runTimer} />
      </div>
      <div className="flex flex-col bg-white shadow-3xl">
        {completeBooking.contact_details.email !== "" ? (
          <OrderDetail completeBooking={completeBooking} />
        ) : (
          ""
        )}
        <PromoForm />
        <Total completeBooking={completeBooking} />
        <Button
          disabled={!runTimer}
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
