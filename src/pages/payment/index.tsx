import Timer from "./components/containers/Timer";
import PaymentMethod from "./components/containers/PaymentMethod";
import OrderDetail from "./components/containers/OrderDetail";
import Total from "./components/containers/Total";
import { Button } from "@/components/ui/button";
import PromoForm from "./components/form/PromoForm";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { ICompleteBooking } from "@/types/Booking";
import { CartItem } from "@/store/useCartStore";
import { useFetchBooking, useSavedBooking } from "@/lib/hooks/usePayment";
import { transformCartData } from "@/lib/dataformatter";
import { useCartStore } from "@/store/useCartStore";
import { usePassengerStore } from "@/store/useBookingStore";
import { differenceInSeconds, isFuture } from "date-fns";

const Payment = () => {
  const { booking_id } = useParams<{ booking_id?: string }>();
  const parsedBookingId = booking_id ? parseInt(booking_id, 10) : null;

  const method = localStorage.getItem("bankMethod");

  const [count_down, setCountDown] = useState<number>(0);
  const [isRunOut, setIsRunOut] = useState<boolean>(false);

  const handleTimerStatusChange = (timerStatus: boolean) => {
    setIsRunOut(timerStatus);
  };

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

  console.log(cartTicket);

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (method) {
      navigate("/user/payment/payment-details/");
    } else {
      toast.error("Payment Method", {
        description: "Please, Select Payment Method",
      });
    }
  };

  const expiryTime = completeBooking?.ticket_details.expired_time;
  const currentTime = new Date();

  useEffect(() => {
    const bookingData: ICompleteBooking = completeBooking;
    handleAddToCompleteBooking(bookingData);
    if (expiryTime && isFuture(new Date(expiryTime))) {
      setCountDown(differenceInSeconds(new Date(expiryTime), currentTime));
    }
  }, [completeBooking]);

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

        <PaymentMethod runTimer={isRunOut} />
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
