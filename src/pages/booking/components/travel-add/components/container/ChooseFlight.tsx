import { ArrowCircleRight, GarudaLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { Text } from "@mantine/core";
import { Dot } from "lucide-react";

const ChooseFlight = () => {
  const { setSelect, setFlight } = useAddOnsStore();

  const pickFlight = (flight: string) => {
    setSelect(true);
    setFlight(flight);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Select Depart and Return</DialogTitle>
      </DialogHeader>
      <div className="mt-6">
        <Text className="font-medium">Depart</Text>
        <div className="mt-3 rounded-lg px-3 py-4 shadow">
          <div className="flex justify-between">
            <Text className="text-3xl font-semibold">YIA</Text>
            <ArrowCircleRight />
            <Text className="text-3xl font-semibold">CGK</Text>
            <Text
              className="cursor-pointer text-xs font-medium text-primary-500"
              onClick={() => pickFlight("Depart")}
            >
              Select
            </Text>
          </div>
          <div className="my-3 h-px w-full bg-gray-200"></div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <GarudaLogo className="w-6" />
                <Text className="font-medium">GA207</Text>
              </div>
              <div className="inline-flex h-6 items-center justify-center rounded-full bg-gray-100 px-2">
                <Text className="text-xs font-medium text-gray-500">
                  Non-stop
                </Text>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-gray-400">
              Fri, 19 Jan <Dot className="h-4 w-4 text-black" />
              16:20 - 17:40
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Text className="font-medium">Return</Text>
        <div className="mt-3 rounded-lg px-3 py-4 shadow">
          <div className="flex justify-between">
            <Text className="text-3xl font-semibold">YIA</Text>
            <ArrowCircleRight />
            <Text className="text-3xl font-semibold">CGK</Text>
            <Text
              className="cursor-pointer text-xs font-medium text-primary-500"
              onClick={() => pickFlight("Return")}
            >
              Select
            </Text>
          </div>
          <div className="my-3 h-px w-full bg-gray-200"></div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <GarudaLogo className="w-6" />
                <Text className="font-medium">GA207</Text>
              </div>
              <div className="inline-flex h-6 items-center justify-center rounded-full bg-gray-100 px-2">
                <Text className="text-xs font-medium text-gray-500">
                  Non-stop
                </Text>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-gray-400">
              Fri, 19 Jan <Dot className="h-4 w-4 text-black" />
              16:20 - 17:40
            </div>
          </div>
        </div>
      </div>
      <DialogClose asChild>
        <Button
          type="button"
          variant="primary"
          className="mt-8 h-14 w-full rounded-xl"
        >
          Done Selecting
        </Button>
      </DialogClose>
    </>
  );
};

export default ChooseFlight;
