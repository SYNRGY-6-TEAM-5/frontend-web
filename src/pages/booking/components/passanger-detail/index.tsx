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
import { usePassengerStore } from "@/store/useBookingStore";
import { useSearchTicketStore } from "@/store/useSearchTicketStore";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import React from "react";

interface PassangerDetailProps {
  nextStep: () => void;
  prevStep: () => void;
}

const PassangerDetail: React.FC<PassangerDetailProps> = ({ nextStep, prevStep }) => {
  const { tripDetails } = useSearchTicketStore();

  let passengersData: Record<string, any> = {};
  const { adult_seat, child_seat, infant_seat, isInternational } = tripDetails;

  const { contactDetails, passengerDetails } = usePassengerStore();

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

  const areContactDetailsFilled =
    contactDetails &&
    Object.values(contactDetails).every(
      (value) => typeof value === "string" && value.trim() !== "",
    );

  const areAllDetaiilsFilled =
    passengerDetails.length === tripDetails.total_seat &&
    passengerDetails.length !== 0;

  console.log("isInternational:", isInternational);

  return (
    <section className={`flex flex-col gap-2 mb-8 ${!areContactDetailsFilled ? "opacity-45 pointer-events-none" : ""}`}>
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
          <div className="flex justify-between items-center pt-6">
            <Button onClick={prevStep} variant="ghost"><ChevronLeftIcon />Back</Button>
            <Button
              onClick={nextStep}
              variant="primary"
              disabled={!areAllDetaiilsFilled}
              type="submit" className={`${!areAllDetaiilsFilled ? "pointer-events-none opacity-45" : ""}`}
            >
              Next <ChevronRightIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PassangerDetail;
