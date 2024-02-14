import { DirectBox } from "@/assets/svg";
import { Button, Text } from "@mantine/core";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

const HeaderDetailBooking = ({
  status,
  booking_id,
  airlane,
  iata,
  ticket_type,
}: {
  status: string;
  booking_id: number;
  airlane: string;
  iata: string;
  ticket_type: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-10 grid grid-cols-3 items-center">
      <ArrowLeft
        size={20}
        onClick={() => {
          navigate(-1);
        }}
        className="cursor-pointer hover:text-primary-500"
      />
      <div className="flex flex-col text-center sm:max-lg:col-span-2">
        {(status === "SUCCESS") ? (
          <div className="mb-3">
            <Text className="font-medium">{airlane}</Text>
            <Text className="text-xs">
              {iata} - <span className="capitalize">{ticket_type}</span>
            </Text>
          </div>
        ) : (
          <Text className="font-medium">Waiting For Payment</Text>
        )}
        <Text className=" text-xs font-normal text-gray-400">
          Order ID: {booking_id}
        </Text>
      </div>

      <Button className="flex items-center justify-end p-0">
        <DirectBox />
      </Button>
    </div>
  );
};

export default HeaderDetailBooking;
