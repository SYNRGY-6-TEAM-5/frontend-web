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
import { useRef } from "react";

function SelectPassanger() {
  return (
    <Select>
      <SelectTrigger className="mx-auto mt-5 w-fit border-none text-lg font-medium">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const DialogBoardingPass = () => {
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
      <DialogTrigger className="mt-4 h-14 w-full rounded-xl bg-primary-500 text-sm text-white">
        See Boarding Pass
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-[430px] overflow-auto">
        <div ref={myElementRef} className="bg-white">
          <DialogHeader>
            <DialogTitle>Boarding Pass</DialogTitle>
          </DialogHeader>
          <div>
            <SelectPassanger />
            <Text className="text-center text-sm">Seat B3</Text>
          </div>
          <div className="mt-6 flex justify-between">
            <Text className="text-7xl font-medium">YIA</Text>
            <Text className="text-7xl font-medium">CGK</Text>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex flex-col gap-1 text-xs">
              <p className="font-medium text-primary-500">Depart</p>
              <p>Tue, 4 Jan 2024</p>
              <p className="font-medium text-gray-300">07:40 AM</p>
            </div>
            <Airfly />
            <div className="flex flex-col gap-1 text-right text-xs">
              <p className="font-medium text-primary-500">Depart</p>
              <p>Tue, 4 Jan 2024</p>
              <p className="font-medium text-gray-300">07:40 AM</p>
            </div>
          </div>
          <div className="my-8 rounded-xl bg-black p-7">
            <Text className="text-2xl font-medium uppercase text-white">
              Bella Hadid
            </Text>
            <div className="mt-6 flex flex-wrap gap-y-6">
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">4</Text>
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
                  GA207
                </Text>
                <Text className="mt-2 text-sm text-white">Flight</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  B3
                </Text>
                <Text className="mt-2 text-sm text-white">Seat</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  4 Jan
                </Text>
                <Text className="mt-2 text-sm text-white">Date</Text>
              </div>
              <div className="w-1/2">
                <Text className="text-2xl font-medium text-primary-500">
                  07:40 AM
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
