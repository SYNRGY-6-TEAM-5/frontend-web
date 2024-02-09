import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import TablePrice from "../ui/components/TablePrice";

import { usePassengerStore } from "@/store/useBookingStore";
import { CartItem, useCartStore } from "@/store/useCartStore";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { ICompleteBooking } from "@/types/Booking";
import { IPricePassenger, summarizeBooking } from "@/lib/totalSummarizer";
import { useSavedBooking } from "@/lib/hooks/usePayment";
import { transformCartData } from "@/lib/dataformatter";

interface TotalPrps {
  completeBooking: ICompleteBooking;
  totalPrice: number;
}

const Total: React.FC<TotalPrps> = ({ completeBooking, totalPrice }) => {
  const [dialog, setDialog] = useState<boolean>(false);

  const { updateCompleteBookingData: handleAddToCompleteBooking } = usePassengerStore();
  const { tripInsurance } = useAddOnsStore();
  
  const [summaryTotal, setSummaryTotal] = useState<IPricePassenger[]>([]);

  let cartTicket: CartItem[];
  
  const isInPaymentPage: boolean = window.location.pathname.includes("/user/payment/");
  if (isInPaymentPage) {
    cartTicket = transformCartData(completeBooking);
  } else {
    const { cart } = useCartStore();
    const { updatedCompleteBookingData } = useSavedBooking();
    completeBooking = updatedCompleteBookingData;
    cartTicket = cart;
  }

  useEffect(() => {
    const handleShowSummary = () => {
      const bookingData: ICompleteBooking = completeBooking;
      handleAddToCompleteBooking(bookingData);

      const summary = summarizeBooking(bookingData, cartTicket);

      setSummaryTotal(summary);
    };

    if (dialog) {
      handleShowSummary();
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
        className="group flex items-center hover:text-primary-200 cursor-pointer"
      >
        <Text className="text-lg">Total</Text>
        <input type="button" id="prices" name="prices" onClick={handleDialog} />
        <ChevronDown size={20} className="font-base text-primary-500" />
        <Text className="grow text-right text-primary-500">{`IDR ${totalPrice.toLocaleString()}`}</Text>
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
