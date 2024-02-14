import { Airfly } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@mantine/core";
import Barcode from "react-jsbarcode";
import { toJpeg } from "html-to-image";
import { useRef, useState } from "react";
import { BookingUser, Passenger } from "@/types/BookingUser";
import { format } from "date-fns";
interface props {
  booking: BookingUser;
}

function SelectPassanger({
  passanger,
  setSelected,
}: {
  passanger: Passenger[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Select defaultValue={"0"} onValueChange={(select) => setSelected(select)}>
      <SelectTrigger className="mx-auto mt-5 w-fit border-none text-lg font-medium">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {passanger.map((item: Passenger, index) => (
            <SelectItem key={item.nik} value={`${index}`}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const DialogBoardingPass = ({ booking }: props) => {
  const [selected, setSelected] = useState("0");
  const myElementRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async () => {
    if (myElementRef.current) {
      myElementRef.current.style.padding = "16px";
      await toJpeg(myElementRef.current).then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "booking-pass.jpg";
        link.href = dataUrl;
        link.click();
      });
      myElementRef.current.style.padding = "0px";
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="h-14 w-full rounded-xl bg-primary-500 text-sm text-white">
        See Boarding Pass
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[430px] overflow-auto">
        <div ref={myElementRef} className="bg-white">
          <DialogHeader>
            <DialogTitle>Boarding Pass</DialogTitle>
          </DialogHeader>
          <div>
            <SelectPassanger
              passanger={booking.passengers}
              setSelected={setSelected}
            />
            <Text className="text-center text-sm">
              Seat: {booking.passengers[parseInt(selected)].seat}
            </Text>
          </div>
          <div className="mt-6 flex justify-between">
            <Text className="text-7xl font-medium">
              {booking.tickets[0].flight.departure.airport_details.iata_code}
            </Text>
            <Text className="text-7xl font-medium">
              {booking.tickets[0].flight.arrival.airport_details.iata_code}
            </Text>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-col gap-1 text-xs">
              <p className="font-medium text-primary-500">Depart</p>
              <p>
                {format(
                  booking.tickets[0].flight.departure.scheduled_time,
                  "E, d MMM yyyy",
                )}
              </p>
              <p className="font-medium text-gray-300">
                {format(
                  booking.tickets[0].flight.departure.scheduled_time,
                  "hh:mm a",
                )}
              </p>
            </div>
            <Airfly />
            <div className="flex flex-col gap-1 text-right text-xs">
              <p className="font-medium text-primary-500">Arrival</p>
              <p>
                {format(
                  booking.tickets[0].flight.arrival.scheduled_time,
                  "E, d MMM yyyy",
                )}
              </p>
              <p className="font-medium text-gray-300">
                {format(
                  booking.tickets[0].flight.arrival.scheduled_time,
                  "hh:mm a",
                )}
              </p>
            </div>
          </div>
          <div className="my-8 rounded-xl bg-black p-7">
            <Text className="text-2xl font-medium uppercase text-white">
              {booking.passengers[parseInt(selected)].name}
            </Text>
            <div className="mt-6 flex flex-wrap gap-y-6">
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  {booking.tickets[0].flight.departure.terminal}
                </Text>
                <Text className="mt-2 text-sm text-white">Terminal</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  12A
                </Text>
                <Text className="mt-2 text-sm text-white">Gate</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  {booking.tickets[0].flight.iata}
                </Text>
                <Text className="mt-2 text-sm text-white">Flight</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  {booking.passengers[parseInt(selected)].seat}
                </Text>
                <Text className="mt-2 text-sm text-white">Seat</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  {format(
                    booking.tickets[0].flight.departure.scheduled_time,
                    "d MMM",
                  )}
                </Text>
                <Text className="mt-2 text-sm text-white">Date</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  {format(
                    booking.tickets[0].flight.departure.scheduled_time,
                    "hh:mm a",
                  )}
                </Text>
                <Text className="mt-2 text-sm text-white">Boarding</Text>
              </div>
            </div>
          </div>
          <Barcode
            value="CODEBOOKING"
            options={{ width: 2.3, displayValue: false, margin: 0 }}
            className="my-4 w-full"
          />
        </div>
        <Button
          className="h-14 w-full rounded-xl bg-primary-500 text-xs font-medium text-white hover:bg-primary-500/80"
          type="button"
          onClick={downloadAsImage}
        >
          Download Boarding Pass
        </Button>
        <Button className="h-14 w-full rounded-xl border-2 border-primary-100 bg-transparent text-xs font-medium text-primary-500 hover:bg-primary-50">
          Share Boarding Pass
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBoardingPass;
