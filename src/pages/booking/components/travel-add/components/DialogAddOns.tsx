import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import FlightContent from "./container/ChooseFlight";
import BaggageDialog from "./container/AddOnsContent";
import { useAddOnsStore } from "@/store/useAddOnsStore";

interface props {
  type: "Baggage" | "Meal";
}

const DialogAddOns = ({ type }: props) => {
  const { isSelecting, setSelect, setType } = useAddOnsStore();

  const selectAddOns = () => {
    setSelect(false);
    setType(type);
  };

  return (
    <Dialog>
      <DialogOverlay className="bg-transparent" />
      <DialogTrigger asChild>
        <Button variant="outline" onClick={selectAddOns}>
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-auto sm:max-w-md">
        {isSelecting ? <BaggageDialog /> : <FlightContent />}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddOns;
