import { Text } from "@mantine/core";
import { Button } from "@/components/ui/button";

import PickedTicketCard from "../ui/PickedTicketCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SkeletonCard from "../ui/SkeletonCard";
import { TicketIcon } from "lucide-react";

import { useCartStore } from "@/store/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toaster, toast } from "sonner";

interface props {
  tripType: string;
}

const TicketsHolder = ({ tripType }: props) => {
  const { count, cart } = useCartStore();
  const [effect, setEffect] = useState<boolean>(false);
  const navigate = useNavigate();

  const oneWayTitileArray: string[] = ["Departure"];
  const roundtripTitileArray: string[] = ["Departure", "Return"];

  const handleProceedToBooking = () => {
    if (
      (tripType === "one-way" && count() === 1) ||
      (tripType === "roundtrip" && count() === 2)
    ) {
      navigate("/flight/booking");
    } else {
      setEffect(true);
      toast.error("No Ticket Selected", {
        description: "Please, Select ticket to continue",
      })
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="flex h-full w-full flex-col rounded-lg bg-white px-4 py-8 shadow-lg"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-row items-center justify-between px-4 pb-2">
            <Text className="text-lg font-normal text-black">{`Your Tickets (${count()})`}</Text>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex items-center justify-end pb-4">
            <Button
              onClick={handleProceedToBooking}
              variant="primary"
              className={`${
                effect && "animate-wiggle"
              }flex w-56 gap-3 text-white`}
              onAnimationEnd={() => setEffect(false)}
            >
              Proceed to booking
              <TicketIcon />
            </Button>
            <Toaster />
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            {cart.length ? (
              cart.map((item, index) => (
                <>
                  <PickedTicketCard
                    key={index}
                    ticket={item}
                    ticketId={item.ticket_id}
                    ticketTitle={
                      tripType === "one-way"
                        ? oneWayTitileArray[index]
                        : roundtripTitileArray[index]
                    }
                  />
                </>
              ))
            ) : tripType === "one-way" ? (
              <SkeletonCard cardTitle="Departure" />
            ) : (
              roundtripTitileArray.map((title, index) => (
                <SkeletonCard key={index} cardTitle={title} />
              ))
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TicketsHolder;
