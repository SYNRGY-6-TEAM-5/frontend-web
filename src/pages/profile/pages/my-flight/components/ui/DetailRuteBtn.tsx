import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Text } from "@mantine/core"
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const DetailRuteBtn = () => {
  const [dialog, setDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setDialog(!dialog);
  }

  return (
    <div className="border-t pt-3">
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
        <DialogContent className="max-w-[500px] backdrop-blur-md p-4 sm:max-w-[500px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Depart</DialogTitle>
          </DialogHeader>
          <div className="py-8">
            <div className="flex justify-between">
              <div className="flex space-x-3">
                <Text className="font-medium text-primary-500">Depart</Text>
                <Text>Tue, 3 Jan 2024</Text>
              </div>
              <Text className="font-medium text-xs text-gray-500 bg-gray-100 rounded-3xl px-2 py-1 text-center">Non-stop</Text>
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