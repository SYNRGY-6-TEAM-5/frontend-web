import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePassengerStore } from "@/store/useBookingStore";
import Total from "@/pages/payment/components/containers/Total";
import { useBooking } from "@/lib/hooks/useBooking";
import { useSavedBooking } from "@/lib/hooks/usePayment";
import { ICompleteBooking } from "@/types/Booking";
import { addHours } from "date-fns";

const CheckoutButton = () => {
  const { mutateAsync } = useBooking();
  const { updateCompleteBookingData: handleAddToCompleteBooking } =
    usePassengerStore();
  const { completeBookingData } = useSavedBooking();

  const currentDatetime = new Date();
    const newExpiryDatetime = addHours(currentDatetime, 3);

  const handleCheckout = async () => {
    const bookingData: ICompleteBooking = completeBookingData;
    if (bookingData) {
      bookingData.ticket_details.expired_time = newExpiryDatetime;
      await mutateAsync(bookingData);
    }

    handleAddToCompleteBooking(bookingData);
    console.log(bookingData.ticket_details.expired_time);
  };

  return (
    <section className="flex flex-col gap-2 py-8">
      <Card className="mt-2">
        <CardContent className="flex flex-col px-6 py-8">
          {completeBookingData.contact_details.email !== "" ? (
            <Total completeBooking={completeBookingData} />
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
