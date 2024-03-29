import { Button } from "@/components/ui/button";
import { Text } from "@mantine/core";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import FlightContent from "./container/ChooseFlight";
import AddOnsContent from "./container/AddOnsContent";
import { useAddOnsStore } from "@/store/useAddOnsStore";

interface props {
  type: "Baggage" | "Meal";
}

const DialogAddOns = ({ type }: props) => {
  const { isSelecting, setSelect, setType, selectedFlightIndex } = useAddOnsStore();

  const selectAddOns = () => {
    setSelect(false);
    setType(type);
  };

  return (
    <Dialog>
      <DialogOverlay className="bg-transparent" />
      <DialogTrigger asChild className="shadow-md">
        <Button
          variant="primary"
          onClick={selectAddOns}
          className="h-5 w-5 p-3"
        >
          <Text className="text-sm">+</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-auto sm:max-w-md">
        {isSelecting ? <AddOnsContent cart_index={selectedFlightIndex} /> : <FlightContent />}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddOns;
