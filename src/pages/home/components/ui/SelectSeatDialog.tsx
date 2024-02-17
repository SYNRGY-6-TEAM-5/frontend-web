import { useEffect, useState, ChangeEvent } from "react";

import {
  PlusCircledIcon,
  MinusCircledIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Seat } from "@/types/Ticket";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

type CardProps = React.ComponentProps<typeof Card>;

const SelectSeatDialog: React.FC<
  CardProps & { onTicketDetails: (details: Seat) => void }
> = ({ className, onTicketDetails, ...props }) => {
  const [adultSeat, setAdultSeat] = useState<number>(0);
  const [childSeat, setChildSeat] = useState<number>(0);
  const [infantSeat, setInfantSeat] = useState<number>(0);
  const [ticketClass, setTicketClass] = useState<string>("");
  // eslint-disable-next-line no-unused-vars
  const [ticketDetails, setTicketDetails] = useState<Seat>({
    ticket_class: "",
    adult_seat: 0,
    child_seat: 0,
    total_seat: 0,
    infant_seat: 0,
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleTicketClassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTicketClass(event.target.value);
  };

  const handleAdultIncrement = () => {
    if (adultSeat >= 0) {
      setAdultSeat((prevAdultValue) => prevAdultValue + 1);
    }
  };

  const handleAdultDecrement = () => {
    if (adultSeat > 0) {
      setAdultSeat((prevAdultValue) => prevAdultValue - 1);
    }
  };

  const handleChildIncrement = () => {
    if (childSeat >= 0) {
      setChildSeat((prevChildValue) => prevChildValue + 1);
    }
  };

  const handleChildDecrement = () => {
    if (childSeat > 0) {
      setChildSeat((prevChildValue) => prevChildValue - 1);
    }
  };

  const handleInfantIncrement = () => {
    if (infantSeat >= 0) {
      setInfantSeat((prevInfantValue) => prevInfantValue + 1);
    }
  };

  const handleInfantDecrement = () => {
    if (infantSeat > 0) {
      setInfantSeat((prevInfantValue) => prevInfantValue - 1);
    }
  };

  const totalPassengers: number = adultSeat + childSeat + infantSeat;

  const updateTicketDetails = () => {
    const totalPassengers = adultSeat + childSeat + infantSeat;
    const newTicketDetails: Seat = {
      ticket_class: ticketClass,
      adult_seat: adultSeat,
      child_seat: childSeat,
      total_seat: totalPassengers,
      infant_seat: infantSeat,
    };
    return newTicketDetails;
  };

  useEffect(() => {
    const newTicketDetails = updateTicketDetails();
    setTicketDetails(newTicketDetails);
    onTicketDetails(newTicketDetails);
    console.log(ticketDetails);
  }, [adultSeat, childSeat, infantSeat, ticketClass]);

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger className="bg-zinc-900" asChild>
          <Button className="h-15 relative flex w-full flex-col items-start justify-start">
            {totalPassengers > 0 ? (
              <Text className="lg:text-md w-full text-start text-sm font-normal text-white">
                {`${totalPassengers} Passenger${
                  totalPassengers > 1 ? "s" : ""
                } - ${ticketClass} Class`}
              </Text>
            ) : (
              <Text className="w-full text-start text-xs font-semibold text-slate-400 lg:text-sm">
                Select seat(s) - Class
              </Text>
            )}

            <ChevronDown
              size={20}
              className="font-base absolute right-2 top-1/4 text-primary-500"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full backdrop-blur-md">
          <DrawerHeader>
            <DrawerTitle className="pb-4">
              Select seat type and class
            </DrawerTitle>
            <DrawerDescription className="pb-4">
              <ul className="flex w-full flex-row items-center justify-between gap-2">
                <li className="flex-1">
                  <input
                    type="radio"
                    id="economy-class"
                    name="ticket-class"
                    value="Economy"
                    className="peer hidden"
                    required
                    checked={ticketClass === "Economy"}
                    onChange={handleTicketClassChange}
                  />
                  <label
                    htmlFor="economy-class"
                    className="block w-full cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white p-2 text-zinc-900 hover:bg-gray-800 hover:text-white peer-checked:bg-zinc-900 peer-checked:text-white"
                  >
                    <Text className="text-center text-xs font-semibold">
                      Economy Class
                    </Text>
                  </label>
                </li>
                <li className="flex-1">
                  <input
                    type="radio"
                    id="business-class"
                    name="ticket-class"
                    value="Business"
                    className="peer hidden"
                    required
                    checked={ticketClass === "Business"}
                    onChange={handleTicketClassChange}
                  />
                  <label
                    htmlFor="business-class"
                    className="block w-full cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white p-2 text-zinc-900 hover:bg-gray-800 hover:text-white peer-checked:bg-zinc-900 peer-checked:text-white"
                  >
                    <div className="flex w-full items-center justify-center">
                      <Text className="text-center text-xs font-semibold">
                        Business Class
                      </Text>
                    </div>
                  </label>
                </li>
                <li className="flex-1">
                  <input
                    type="radio"
                    id="first-class"
                    name="ticket-class"
                    value="First"
                    className="peer hidden"
                    required
                    checked={ticketClass === "First"}
                    onChange={handleTicketClassChange}
                  />
                  <label
                    htmlFor="first-class"
                    className="block w-full cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white p-2 text-zinc-900 hover:bg-gray-800 hover:text-white peer-checked:bg-zinc-900 peer-checked:text-white"
                  >
                    <Text className="text-center text-xs font-semibold">
                      First Class
                    </Text>
                  </label>
                </li>
              </ul>
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-6">
            <Card
              className={cn("w-screen rounded-3xl border-t", className)}
              {...props}
            >
              <CardContent className="grid gap-4">
                <div className=" flex items-center border-b p-4">
                  <div className="flex-1 space-y-1">
                    <Text className="text-md text-start font-semibold text-black">
                      Adult
                    </Text>
                    <Text className="text-muted-foreground text-sm">
                      +12 years old
                    </Text>
                  </div>
                  <form className="mx-auto max-w-xs">
                    <div className="relative flex max-w-[11rem] items-center">
                      <button
                        type="button"
                        onClick={handleAdultDecrement}
                        className="h-11 rounded-full"
                      >
                        <MinusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                      </button>
                      <input
                        type="text"
                        id="adult-seat-input"
                        className="h-11 w-14 text-center text-sm font-medium text-gray-900"
                        placeholder=""
                        value={adultSeat}
                        required
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={handleAdultIncrement}
                        className="h-11 rounded-full"
                      >
                        <PlusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                      </button>
                    </div>
                  </form>
                </div>
                <div className=" flex items-center border-b p-4">
                  <div className="flex-1 space-y-1">
                    <Text className="text-md text-start font-semibold text-black">
                      Child
                    </Text>
                    <Text className="text-muted-foreground text-sm">
                      2 - 12 years old
                    </Text>
                  </div>
                  <form className="mx-auto max-w-xs">
                    <div className="relative flex max-w-[11rem] items-center">
                      <button
                        type="button"
                        onClick={handleChildDecrement}
                        className="h-11 rounded-e-lg"
                      >
                        <MinusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                      </button>
                      <input
                        type="text"
                        id="child-seat-input"
                        className="h-11 w-14 text-center text-sm font-medium text-gray-900"
                        placeholder=""
                        value={childSeat}
                        required
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={handleChildIncrement}
                        className="h-11 rounded-e-lg"
                      >
                        <PlusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                      </button>
                    </div>
                  </form>
                </div>
                <div className=" flex items-center p-4">
                  <div className="flex-1 space-y-1">
                    <Text className="text-md text-start font-semibold text-black">
                      Infant
                    </Text>
                    <Text className="text-muted-foreground text-sm">
                      0 - 23 months old
                    </Text>
                  </div>
                  <form className="mx-auto max-w-xs">
                    <div className="relative flex max-w-[11rem] items-center">
                      <button
                        type="button"
                        onClick={handleInfantDecrement}
                        className="h-11 rounded-e-lg"
                      >
                        <MinusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                      </button>
                      <input
                        type="text"
                        id="infant-seat-input"
                        className="h-11 w-14 text-center text-sm font-medium text-gray-900"
                        placeholder=""
                        value={infantSeat}
                        required
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={handleInfantIncrement}
                        className="h-11 rounded-e-lg"
                      >
                        <PlusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                      </button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
            <DrawerClose>
              <Button variant="primary" className="h-16 w-full">
                <CheckIcon className="mr-2 h-4 w-4" /> Save
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-zinc-900" asChild>
        <Button className="h-15 relative flex w-full flex-col items-start justify-start">
          {totalPassengers > 0 ? (
            <Text className="lg:text-md w-full text-start text-sm font-normal text-white">
              {`${totalPassengers} Passenger${
                totalPassengers > 1 ? "s" : ""
              } - ${ticketClass} Class`}
            </Text>
          ) : (
            <Text className="w-full text-start text-xs font-semibold text-slate-400 lg:text-sm">
              Select seat(s) - Class
            </Text>
          )}

          <ChevronDown
            size={20}
            className="font-base absolute right-2 top-1/4 text-primary-500"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] backdrop-blur-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="pb-4">Select seat type and class</DialogTitle>
          <DialogDescription className="pb-4">
            <ul className="flex w-full flex-row items-center justify-center gap-2">
              <li>
                <input
                  type="radio"
                  id="economy-class"
                  name="ticket-class"
                  value="Economy"
                  className="peer hidden"
                  required
                  checked={ticketClass === "Economy"}
                  onChange={handleTicketClassChange}
                />
                <label
                  htmlFor="economy-class"
                  className="inline-flex w-full min-w-[7.5rem] cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white p-2 text-zinc-900 hover:bg-gray-800 hover:text-white peer-checked:bg-zinc-900 peer-checked:text-white"
                >
                  <Text className="text-center text-xs font-semibold">
                    Economy Class
                  </Text>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="business-class"
                  name="ticket-class"
                  value="Business"
                  className="peer hidden"
                  required
                  checked={ticketClass === "Business"}
                  onChange={handleTicketClassChange}
                />
                <label
                  htmlFor="business-class"
                  className="inline-flex w-full min-w-[7.5rem] cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white p-2 text-zinc-900 hover:bg-gray-800 hover:text-white peer-checked:bg-zinc-900 peer-checked:text-white"
                >
                  <div className="flex w-full items-center justify-center">
                    <Text className="text-xs font-semibold">
                      Business Class
                    </Text>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="first-class"
                  name="ticket-class"
                  value="First"
                  className="peer hidden"
                  required
                  checked={ticketClass === "First"}
                  onChange={handleTicketClassChange}
                />
                <label
                  htmlFor="first-class"
                  className="inline-flex w-full min-w-[7.5rem] cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white p-2 text-zinc-900 hover:bg-gray-800 hover:text-white peer-checked:bg-zinc-900 peer-checked:text-white"
                >
                  <Text className="pl-2 text-xs font-semibold">
                    First Class
                  </Text>
                </label>
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Card
            className={cn("w-[380px] rounded-3xl border", className)}
            {...props}
          >
            <CardContent className="grid gap-4">
              <div className=" flex items-center border-b p-4">
                <div className="flex-1 space-y-1">
                  <Text className="text-md text-start font-semibold text-black">
                    Adult
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    +12 years old
                  </Text>
                </div>
                <form className="mx-auto max-w-xs">
                  <div className="relative flex max-w-[11rem] items-center">
                    <button
                      type="button"
                      onClick={handleAdultDecrement}
                      className="h-11 rounded-e-lg"
                    >
                      <MinusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                    </button>
                    <input
                      type="text"
                      id="adult-seat-input"
                      className="h-11 w-14 text-center text-sm font-medium text-gray-900"
                      placeholder=""
                      value={adultSeat}
                      required
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleAdultIncrement}
                      className="h-11 rounded-e-lg"
                    >
                      <PlusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                    </button>
                  </div>
                </form>
              </div>
              <div className=" flex items-center border-b p-4">
                <div className="flex-1 space-y-1">
                  <Text className="text-md text-start font-semibold text-black">
                    Child
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    2 - 12 years old
                  </Text>
                </div>
                <form className="mx-auto max-w-xs">
                  <div className="relative flex max-w-[11rem] items-center">
                    <button
                      type="button"
                      onClick={handleChildDecrement}
                      className="h-11 rounded-e-lg"
                    >
                      <MinusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                    </button>
                    <input
                      type="text"
                      id="child-seat-input"
                      className="h-11 w-14 text-center text-sm font-medium text-gray-900"
                      placeholder=""
                      value={childSeat}
                      required
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleChildIncrement}
                      className="h-11 rounded-e-lg"
                    >
                      <PlusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                    </button>
                  </div>
                </form>
              </div>
              <div className=" flex items-center border-b p-4">
                <div className="flex-1 space-y-1">
                  <Text className="text-md text-start font-semibold text-black">
                    Infant
                  </Text>
                  <Text className="text-muted-foreground text-sm">
                    0 - 23 months old
                  </Text>
                </div>
                <form className="mx-auto max-w-xs">
                  <div className="relative flex max-w-[11rem] items-center">
                    <button
                      type="button"
                      onClick={handleInfantDecrement}
                      className="h-11 rounded-e-lg"
                    >
                      <MinusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                    </button>
                    <input
                      type="text"
                      id="infant-seat-input"
                      className="h-11 w-14 text-center text-sm font-medium text-gray-900"
                      placeholder=""
                      value={infantSeat}
                      required
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleInfantIncrement}
                      className="h-11 rounded-e-lg"
                    >
                      <PlusCircledIcon className="flex h-6 w-6 items-center rounded-full hover:bg-primary-500 hover:text-white" />
                    </button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
          <DialogClose>
            <Button variant="primary" className="h-16 w-full">
              <CheckIcon className="mr-2 h-4 w-4" /> Save
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectSeatDialog;
