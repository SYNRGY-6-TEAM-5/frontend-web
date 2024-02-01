import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import TabsPayment from "./components/TabsPayment";

const OrderSummary = () => {
  const [dialog, setDialog] = useState<boolean>(false);
  
  const handleDialog = () => {
    setDialog(!dialog);
  }

  return (
    <>
      <label
        htmlFor="details"
        className="group flex mt-3 items-center hover:text-primary-200"
      >
        <Text className="grow text-sm">Details</Text>
        <input
          type="button"
          id="details"
          name="details"
          onClick={handleDialog}
        />
        <ChevronRight size={20} className="font-base text-primary-500" />
      </label>
      <Dialog open={dialog} onOpenChange={handleDialog}>
        <DialogContent className="max-w-[400px] max-h-[85%] backdrop-blur-md p-4 sm:max-w-[400px] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Order Summary</DialogTitle>
          </DialogHeader>
          <TabsPayment />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default OrderSummary;