import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePassengerStore } from "@/store/useBookingStore";
import Total from "@/pages/payment/components/containers/Total";
import { useBooking } from "@/lib/hooks/useBooking";
import { useSavedBooking } from "@/lib/hooks/usePayment";
import { ICompleteBooking } from "@/types/Booking";
import { addHours } from "date-fns";
import { useEffect, useState } from "react";

const CheckoutButton = () => {
  const [total, setTotal] = useState(0);
  
  const { mutateAsync } = useBooking();
  const { setTotalAmount, updateCompleteBookingData: handleAddToCompleteBooking } =
    usePassengerStore();

  const { updatedCompleteBookingData, totalBooking } = useSavedBooking();

  const currentDatetime = new Date();
    const newExpiryDatetime = addHours(currentDatetime, 3);

  const handleCheckout = async () => {
    const bookingData: ICompleteBooking = updatedCompleteBookingData;
    if (bookingData) {
      bookingData.ticket_details.expired_time = newExpiryDatetime;
      await mutateAsync(bookingData);
    }

    setTotalAmount(total);

    handleAddToCompleteBooking(bookingData);
    console.log(bookingData.ticket_details.expired_time);
  };

  useEffect(() => {
    if (updatedCompleteBookingData.contact_details.email === "" && total < 1) {
      return;
    }
    handleAddToCompleteBooking(updatedCompleteBookingData);
    setTotal(totalBooking);

    setTotalAmount(total);

  }, [setTotalAmount]);

  return (
    <section className="flex flex-col gap-2 py-8">
      <Card className="mt-2">
        <CardContent className="flex flex-col px-6 py-8">
          {updatedCompleteBookingData.contact_details.email !== "" ? (
            <Total completeBooking={updatedCompleteBookingData} totalPrice={total} />
          ) : (
            ""
          )}
          <Button
            type="submit"
            onClick={handleCheckout}
            variant="primary"
            className="h-14 w-full"
          >
            Continue to payment
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default CheckoutButton;
