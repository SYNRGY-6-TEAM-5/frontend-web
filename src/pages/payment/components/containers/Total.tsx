import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import TablePrice from "../ui/components/TablePrice";

import { usePassengerStore } from "@/store/useBooking";
import { useProfileUserStore } from "@/store/useProfileUserStore";
import { useCartStore } from "@/store/useCart";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { ICompleteBooking } from "@/pages/booking/components/ui/CheckoutButton";
import { IPricePassenger, calculateTotalPrice, summarizeBooking } from "@/lib/totalSummarizer";

const Total = () => {
  const [dialog, setDialog] = useState<boolean>(false);
  const { userData } = useProfileUserStore();

  const { cart, totalFare } = useCartStore();
  const {
    contactDetails,
    passengerDetails,
    updateCompleteBookingData: handleAddToCompleteBooking,
  } = usePassengerStore();
  const { personAddOns, tripInsurance } = useAddOnsStore();
  const lastArrivalScheduledTime = cart[cart.length - 1].flight.arrival.scheduled_time;

  const [summaryTotal, setSummaryTotal] = useState<IPricePassenger[]>([]);

  useEffect(() => {
    const handleCheckout = () => {
      const completeBookingData: ICompleteBooking = {
        ticket_details: {
          booked_ticket: cart.map(ticket => ticket.ticket_id),
          total_ticket_price: totalFare(),
          expired_time: new Date(lastArrivalScheduledTime),
        },
        user_data: userData,
        contact_details: contactDetails,
        passenger_details: passengerDetails,
        passenger_addOns: personAddOns,
        trip_insurance: tripInsurance,
      };

      handleAddToCompleteBooking(completeBookingData);

      const summary = summarizeBooking(completeBookingData, cart);
      console.log("Summary Data >>> ", completeBookingData);
      setSummaryTotal(summary);
    };

    if (dialog) {
      handleCheckout();
      console.log("Summary Data >>> ", summaryTotal);
    }
  }, [
    dialog,
    tripInsurance
  ]);

  const handleDialog = () => {
    setDialog(!dialog);
  };

  return (
    <div className="border-0 border-t p-4">
      <label
        htmlFor="prices"
        className="group flex items-center hover:text-primary-200"
      >
        <Text className="text-lg">Total</Text>
        <input type="button" id="prices" name="prices" onClick={handleDialog} />
        <ChevronDown size={20} className="font-base text-primary-500" />
        <Text className="grow text-right text-primary-500">{`IDR ${summaryTotal[0]?.departCity !== "" ? calculateTotalPrice(summaryTotal).toLocaleString() : "0"}`}</Text>
      </label>
      <Dialog open={dialog} onOpenChange={handleDialog}>
        <DialogContent className="max-h-screen max-w-[500px] overflow-y-scroll p-4 backdrop-blur-md sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Price Details</DialogTitle>
          </DialogHeader>
          <TablePrice summary_data={summaryTotal} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Total;
