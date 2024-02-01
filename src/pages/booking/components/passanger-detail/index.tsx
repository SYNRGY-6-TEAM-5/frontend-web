"use client";

import { Text } from "@mantine/core";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";

import AccordionFormItem from "./component/containers/AccordionItem";
import { useTicketContext } from "@/context/TicketContext";

const PassangerDetail = () => {
  // const { mutateAsync } = useFillPassenger();
  const { tripData } = useTicketContext();

  let passengersData: Record<string, any> = {};
  const { adult_seat, child_seat, infant_seat, isInternational } = tripData;

  console.log(tripData);

  const generatePassengerAccordionItems = () => {
    const items: JSX.Element[] = [];
    let currentnthPassenger = 0;

    for (let i = 0; i < adult_seat; i++) {
      items.push(
        <AccordionFormItem
          key={`${i}-adult`}
          _index={i}
          _nthPassenger={currentnthPassenger}
          _age="adult"
          isInternational={isInternational}
        />,
      );
      currentnthPassenger++;
    }

    for (let i = 0; i < child_seat; i++) {
      items.push(
        <AccordionFormItem
          key={`${i}-child`}
          _index={i}
          _nthPassenger={currentnthPassenger}
          _age="child"
          isInternational={isInternational}
        />,
      );
      currentnthPassenger++;
    }

    for (let i = 0; i < infant_seat; i++) {
      items.push(
        <AccordionFormItem
          key={`${i}-infant`}
          _index={i}
          _nthPassenger={currentnthPassenger}
          _age="infant"
          isInternational={isInternational}
        />,
      );
      currentnthPassenger++;
    }

    return { items, passengersData };
  };

  const { items } = generatePassengerAccordionItems();

  return (
    <section className="flex flex-col gap-2">
      <div className="px-2">
        <Text className="pb-2 text-lg font-normal text-black">
          Passenger Details
        </Text>
        <Text className="text-sm font-normal text-slate-500">
          Covid-19 has caused widespread disruption to international travel. See
          all the latest Covid-19 restrictions on our Covid-19 infopage
        </Text>
      </div>
      <Card className="mb-8">
        <CardHeader className="flex flex-col gap-6">
          {isInternational ? (
            <div className="flex flex-row items-center justify-between gap-12 pt-2">
              <CardTitle className="w-full">
                Your destination requires travel documents
              </CardTitle>
              <CardDescription className="w-96 text-right text-sm text-slate-900">
                Please prepare the documents, you will need to enter the
                details.
              </CardDescription>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-row items-center justify-between">
            <CardDescription className="text-sm text-slate-400">
              Same as contact details
            </CardDescription>
            <Switch className="data-[state=checked]:bg-primary-500" />
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Accordion type="multiple" className="w-full">
            {items}
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

export default PassangerDetail;
