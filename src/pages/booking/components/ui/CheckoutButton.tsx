import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IContactDetails, PassengerDetailsItem, usePassengerStore } from "@/store/useBooking";
import { IPersonAddOns, useAddOnsStore } from "@/store/useAddOnsStore";
import { CartItem, useCartStore } from "@/store/useCart";
import { TripInsurance, useTicketContext } from "@/context/TicketContext";
import { useProfileUserStore } from "@/store/useProfileUserStore";
import Total from "@/pages/payment/components/containers/Total";
import { IUser } from "@/lib/hooks/useNav";

export interface ICompleteBooking {
  ticket_details: {
    booked_ticket: CartItem[];
    total_ticket_price: number;
  },
  user_data?: IUser;
  contact_details: IContactDetails;
  passenger_details: PassengerDetailsItem[];
  passenger_addOns: IPersonAddOns[];
  trip_insurance: TripInsurance;
}

const CheckoutButton = () => {
  const { tripInsurance } = useTicketContext();
  const { userData } = useProfileUserStore();

  const { cart, totalFare } = useCartStore();
  const { contactDetails, passengerDetails, updateCompleteBookingData: handleAddToCompleteBooking } = usePassengerStore();
  const { personAddOns } = useAddOnsStore();

  const handleCheckout = () => {
    const completeBookingData: ICompleteBooking = {
      ticket_details: {
        booked_ticket: cart,
        total_ticket_price: totalFare(),
      },
      user_data: userData,
      contact_details: contactDetails,
      passenger_details: passengerDetails,
      passenger_addOns: personAddOns,
      trip_insurance: tripInsurance,
    };

    handleAddToCompleteBooking(completeBookingData);
    
  };

  return (
    <section className="flex flex-col gap-2 py-8">
      <Card className="mt-2">
        <CardContent className="flex flex-col px-6 py-8">
          <Total />
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
