import {  BaggageBlack, GarudaLogo, MealBlack } from "@/assets/svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Text } from "@mantine/core"
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Line from "@/assets/Line26.png"

const DetailRuteBtn = () => {
  const [dialog, setDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setDialog(!dialog);
  }

  return (
    <div className="border-t border-gray-100 pt-3">
      <label
        htmlFor="detailRute"
        className="group flex items-center justify-between hover:text-primary-200 cursor-pointer"
      >
        <Text className="text-xs font-normal">Terminal 3 Domestic</Text>
        <input
          type="button"
          id="detailRute"
          name="detailRute"
          onClick={handleDialog}
        />
        <ChevronRight size={20} className="font-normal text-primary-500" />
      </label>
      <Dialog open={dialog} onOpenChange={handleDialog}>
        <DialogContent className="max-w-[600px] backdrop-blur-md p-4 sm:max-w-[600px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Depart</DialogTitle>
          </DialogHeader>
          <div className="py-8 grid gap-6">
            <div className="flex justify-between">
              <div className="flex space-x-3">
                <Text className="font-medium text-primary-500">Depart</Text>
                <Text>Tue, 3 Jan 2024</Text>
              </div>
              <Text className="font-medium text-xs text-gray-500 bg-gray-100 rounded-3xl px-2 py-1 text-center">Non-stop</Text>
            </div>
            <div className="grid grid-cols-4 h-fit w-fit mx-auto">
              <div className="text-right space-y-1 self-start">
                  <Text className="font-semibold text-2xl">YIA</Text>
                  <Text className="text-sm font-medium text-gray-300">06:25 AM</Text>
              </div>
              <div className="row-span-3 flex justify-center self-center py-3"> <img src={Line} /> </div>
              <div className="text-left space-y-1 col-span-2 self-start">
                  <Text className="text-sm font-medium">Yogyakarta Kulon Progo</Text>
                  <Text className="text-xs font-normal">Terminal 1 Domestic</Text>
              </div>
              <Text className="self-center font-medium text-right">1h 33m</Text>
              <div className="col-span-2 border-gray-200 rounded-xl border">
                <div className="p-3 flex justify-betwen items-center border-gray-200 border-b gap-2">
                  <GarudaLogo className=" w-14" />
                  <div>
                    <Text className="font-medium">Garuda Indonesia</Text>
                    <Text className="text-xs">GA207 - Economy</Text>
                  </div>
                </div>
                <div className="px-3 py-4 gap-2 flex flex-col">
                  <Text className=" text-sm font-medium">What’s included</Text>
                  <div className="flex gap-2">
                    <BaggageBlack />
                    <div>
                      <Text className="text-xs">Cabin baggage: 10kg</Text>
                      <Text className="text-xs">Excess baggage (+): IDR 25,000/kg </Text>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <MealBlack />
                    <Text className="text-xs">Free meals</Text>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-1 self-end">
                  <Text className="font-semibold text-2xl">CGK</Text>
                  <Text className="text-sm font-medium text-gray-300">07:40 AM</Text>
              </div>
              <div className="text-left space-y-1 col-span-2 self-end ">
                  <Text className="text-sm font-medium">Soekarno Hatta</Text>
                  <Text className="text-xs font-normal">Terminal 3 Domestic</Text>
              </div>
            </div>
            <div className="flex space-x-3">
              <Text className="font-medium text-primary-500">Arrived</Text>
              <Text>Tue, 3 Jan 2024</Text>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DetailRuteBtn;