import { GarudaLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Text } from "@mantine/core";
import { Dot } from "lucide-react";
import { CaretDown } from "@phosphor-icons/react";
import Meal from "../ui/Meal";
import Baggage from "../ui/Baggage";
import { useAddOnsStore } from "@/store/useAddOnsStore";

function SelectPassanger() {
  return (
    <Select>
      <SelectTrigger className="mx-auto w-fit border-none text-lg font-medium">
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

const AccordionSubtotal = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b-0 border-t">
        <AccordionTrigger className="w-fit justify-start decoration-transparent [&>*:last-child]:hidden">
          <span className="flex items-center">Subtotal </span>
          <CaretDown className="ml-2 h-4 w-4 shrink-0 text-primary-500 transition-transform duration-200" />
          <span className="ml-auto font-semibold text-primary-500">
            IDR 199,000
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span>Baggage 16 KG</span>
            <span>IDR 199,000</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const AddOnsContent = () => {
  const { type, flight, setSelect } = useAddOnsStore();

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Add {flight} {type}
        </DialogTitle>
      </DialogHeader>
      <div className="mt-6 ">
        <SelectPassanger />
        <Text className="mx-auto w-fit text-xs font-semibold">
          1 Meal <span className="font-normal">IDR 49,000</span>
        </Text>
        <div className="mt-8 rounded-lg px-3 py-4 shadow">
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
      {type === "Baggage" ? <Baggage /> : <Meal />}
      <AccordionSubtotal />
      <Button
        type="button"
        variant="primary"
        className="h-14 w-full rounded-xl"
        onClick={() => setSelect(false)}
      >
        Save
      </Button>
    </>
  );
};

export default AddOnsContent;
