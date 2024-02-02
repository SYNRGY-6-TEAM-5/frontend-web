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
  image: string;
}

const DialogAddOns = ({ type, image }: props) => {
  const { isSelecting, setSelect, setType } = useAddOnsStore();

  const selectAddOns = () => {
    setSelect(false);
    setType(image);
  };

  return (
    <Dialog>
      <DialogOverlay className="bg-transparent" />
      <DialogTrigger asChild>
        <button onClick={selectAddOns}>
          <img src={image} alt={type} className="ml-2 hover:opacity-90" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-auto sm:max-w-md">
        {isSelecting ? <BaggageDialog /> : <FlightContent />}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddOns;
