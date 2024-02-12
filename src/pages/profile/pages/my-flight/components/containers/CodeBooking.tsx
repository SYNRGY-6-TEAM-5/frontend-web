import { Text } from "@mantine/core";
import ArrowCircle from "@/assets/ArrowCircleRight.png";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { HalfCircle } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useCheckInStore } from "@/store/useCheckInStore";
import { Passenger } from "@/types/BookingUser";

interface bookingTypes {
  bookingCode: string;
  depart: string;
  arive: string;
  passanger: Passenger[];
}
const CodeBooking = ({
  bookingCode,
  depart,
  arive,
  passanger,
}: bookingTypes) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { setUserData, setSelectedUser } = useCheckInStore();

  const handleCopyText = () => {
    navigator.clipboard.writeText(bookingCode);
    toast.success("Text Copied", {});
  };

  const setupCheckin = () => {
    const formatPass = passanger.map((item) => ({
      id: item.passenger_id,
      nama: item.name,
      seat: "",
    }));
    setUserData(formatPass);
    setSelectedUser(formatPass[0].id);
    navigate(`/profile/checkin/${id}`);
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
              value="BHJCYAA"
            >
              <Copy size={18} />
            </Button>
          </div>
        </div>
        <HalfCircle className="absolute top-1/2 -translate-y-1/2" />
        <HalfCircle className="absolute right-0 top-1/2 -translate-y-1/2 rotate-180" />
      </div>
      <div className="w-full p-3 pt-4">
        <Button
          type="button"
          variant="primary"
          className="h-14 w-full rounded-xl text-sm"
          onClick={setupCheckin}
        >
          Check-In Online Now
        </Button>
      </div>
    </div>
  );
};

export default CodeBooking;
