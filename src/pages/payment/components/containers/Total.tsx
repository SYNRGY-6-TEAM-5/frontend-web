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
import { useTicketContext } from "@/context/TicketContext";
import { useProfileUserStore } from "@/store/useProfileUserStore";
import { useCartStore } from "@/store/useCart";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { ICompleteBooking } from "@/pages/booking/components/ui/CheckoutButton";
import { IPricePassenger, calculateTotalPrice, summarizeBooking } from "@/lib/totalSummarizer";

const Total = () => {
  const [dialog, setDialog] = useState<boolean>(false);
  const { tripInsurance } = useTicketContext();
  const { userData } = useProfileUserStore();

  const { cart, totalFare } = useCartStore();
  const {
    contactDetails,
    passengerDetails,
    updateCompleteBookingData: handleAddToCompleteBooking,
  } = usePassengerStore();
  const { personAddOns } = useAddOnsStore();

  const [summaryTotal, setSummaryTotal] = useState<IPricePassenger[]>([]);

  useEffect(() => {
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

      const summary = summarizeBooking(completeBookingData);
      setSummaryTotal(summary);
    };

    if (dialog) {
      handleCheckout();
    }
  }, [
    dialog,
    cart,
    totalFare,
    userData,
    contactDetails,
    passengerDetails,
    personAddOns,
    tripInsurance,
    handleAddToCompleteBooking,
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
        <Text className="grow text-right text-primary-500">{`IDR ${calculateTotalPrice(summaryTotal).toLocaleString()}`}</Text>
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
