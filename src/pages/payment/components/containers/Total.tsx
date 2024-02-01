import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Text } from "@mantine/core"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import TablePrice from "../ui/components/TablePrice";

const pricePassenger = [
  {
    departCity:"Jakarta",
    arriveCity:"Yogyakarta",
    adult:1,
    child:1
  },
  {
    departCity:"Yogyakarta",
    arriveCity:"Jakarta",
    adult:1,
    child:1
  },
];

const addOns = [
  {
    name:"Full protection",
    price:95000
  }
]

const Total = () => {
  const [dialog, setDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setDialog(!dialog);
  }
  return(
    <div className="border-0 border-t p-4">
      <label
        htmlFor="prices"
        className="group flex items-center hover:text-primary-200"
      >
        <Text className="text-lg">Total</Text>
        <input
          type="button"
          id="prices"
          name="prices"
          onClick={handleDialog}
        />
        <ChevronDown size={20} className="font-base text-primary-500" />
        <Text className="grow text-right text-primary-500">IDR 2,230,900</Text>
      </label>
      <Dialog open={dialog} onOpenChange={handleDialog}>
        <DialogContent className="max-w-[500px] backdrop-blur-md p-4 sm:max-w-[500px] overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Price Details</DialogTitle>
          </DialogHeader>
          <TablePrice routes={pricePassenger} addOns={addOns} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Total;