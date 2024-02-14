import { Text } from "@mantine/core";
import ArrowCircle from "@/assets/ArrowCircleRight.png";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { HalfCircle } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { BookingUser, Passenger } from "@/types/BookingUser";
import CheckinPolicy from "@/pages/checkin-policy";
import DialogBoardingPass from "./DialogBoardingPass";

interface bookingTypes {
  booking: BookingUser;
  bookingCode: string;
  depart: string;
  arive: string;
  passanger: Passenger[];
}
const CodeBooking = ({
  booking,
  bookingCode,
  depart,
  arive,
  passanger,
}: bookingTypes) => {
  const handleCopyText = () => {
    navigator.clipboard.writeText(bookingCode);
    toast.success("Text Copied", {});
  };

  return (
    <div className="rounded-lg bg-white shadow-3xl">
      <div className="flex items-center justify-center space-x-5 rounded-t-lg bg-black p-1 text-center text-white">
        <Text>{depart}</Text>
        <img src={ArrowCircle} />
        <Text>{arive}</Text>
      </div>
      <div className="relative">
        <div className="flex justify-between border-b border-dashed border-gray-100 p-3 pb-4">
          <Text className="text-sm">Your e-ticket is here</Text>
          <Text className="text-sm text-primary-500">See</Text>
        </div>
        <div className="flex items-center justify-between p-3 pt-4">
          <Text className="text-sm text-gray-500">Booking code</Text>
          <div className="flex flex-row items-center">
            <Text className="text-sm font-semibold">{bookingCode}</Text>
            <Button
              variant={"link"}
              type="button"
              className="h-fit p-0 pl-2 text-primary-500"
              onClick={handleCopyText}
            >
              <Copy size={18} />
            </Button>
          </div>
        </div>
        <HalfCircle className="absolute top-1/2 -translate-y-1/2" />
        <HalfCircle className="absolute right-0 top-1/2 -translate-y-1/2 rotate-180" />
      </div>
      <div className="w-full p-3 pt-4">
        {booking.map_ticket[0].boarding_code ? (
          <DialogBoardingPass booking={booking} />
        ) : (
          <CheckinPolicy booking={booking} passanger={passanger} />
        )}
      </div>
    </div>
  );
};

export default CodeBooking;
