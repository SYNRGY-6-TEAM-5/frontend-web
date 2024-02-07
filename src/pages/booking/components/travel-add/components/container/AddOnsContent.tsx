import { format } from "date-fns";

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
import { IPersonAddOns, useAddOnsStore } from "@/store/useAddOnsStore";
import { PassengerDetailsItem } from "@/types/Booking";
import { usePassengerStore } from "@/store/useBookingStore";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormField, FormItem } from "@/components/ui/form";
import { useCartStore } from "@/store/useCartStore";
import { Image } from "@/components/ui/Image";

const formSchema = z.object({
  passengerName: z.string().min(2).max(50),
});

function SelectPassenger({
  passengerDetails,
  onPassengerChange,
}: {
  passengerDetails: PassengerDetailsItem[];
  onPassengerChange: (selectedPassenger: string) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengerName: "",
    },
  });

  const handlePassengerChange = (value: string) => {
    form.setValue("passengerName", value);
    onPassengerChange(value);
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="passengerName"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => handlePassengerChange(value)}
              defaultValue={field.value}
            >
              <SelectTrigger className="mx-auto w-fit border-none text-lg font-medium">
                <SelectValue placeholder="Select a Passenger" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {passengerDetails.map((passenger, index) => (
                    <SelectItem key={index} value={passenger.fullName}>
                      {passenger.fullName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Toaster />
          </FormItem>
        )}
      />
    </Form>
  );
}

interface AccordionSubtotalProps {
  subtotal: string;
  type: string;
}

const AccordionSubtotal: React.FC<AccordionSubtotalProps> = ({
  subtotal,
  type,
}) => {
  const {
    flight,
    mealsAddOn,
    returnMealsAddOn,
    baggageAddOn,
    returnBaggageAddOn,
  } = useAddOnsStore();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-b-0 border-t">
        <AccordionTrigger className="w-fit justify-start decoration-transparent [&>*:last-child]:hidden">
          <span className="flex items-center">Subtotal </span>
          <CaretDown className="ml-2 h-4 w-4 shrink-0 text-primary-500 transition-transform duration-200" />
          <span className="ml-auto font-semibold text-primary-500">
            {`IDR ${subtotal}`}
          </span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2">
          {type === "Meal" ? (
            flight === "Depart" ? (
              mealsAddOn.map((mealAddOn, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs text-gray-300"
                >
                  <span>{`${mealAddOn.meal_name}`}</span>
                  <span>IDR {mealAddOn.meal_price}</span>
                </div>
              ))
            ) : (
              returnMealsAddOn.map((returnMealAddOn, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs text-gray-300"
                >
                  <span>{`${returnMealAddOn.meal_name}`}</span>
                  <span>IDR {returnMealAddOn.meal_price}</span>
                </div>
              ))
            )
          ) : flight === "Depart" ? (
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>{`${type} ${baggageAddOn.baggage_weight}`}</span>
              <span>IDR {baggageAddOn.baggage_price}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>{`${type} ${returnBaggageAddOn.baggage_weight}`}</span>
              <span>IDR {returnBaggageAddOn.baggage_price}</span>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

interface AddOnsContentProps {
  cart_index: number;
}

const AddOnsContent: React.FC<AddOnsContentProps> = ({ cart_index }) => {
  const {
    type,
    flight,
    mealsAddOn,
    returnMealsAddOn,
    baggageAddOn,
    returnBaggageAddOn,
    addPersonAddOns: handleAddPassengersAddOns,
    setSelect,
    calculateMealPriceTotal,
    calculateReturnMealPriceTotal,
  } = useAddOnsStore();

  const { cart } = useCartStore();

  const { passengerDetails } = usePassengerStore();

  const [selectedPassenger, setSelectedPassenger] = useState<string>("");

  const handlePassengerChange = (selectedPassenger: string) => {
    setSelectedPassenger(selectedPassenger);
  };

  const handleSave = () => {
    if (selectedPassenger !== "") {
      setSelect(false);
      const personAddOns: IPersonAddOns = {
        passenger_name: selectedPassenger,
        departure: {
          meals: mealsAddOn,
          baggage: baggageAddOn,
        },
        return: {
          meals: returnMealsAddOn,
          baggage: returnBaggageAddOn,
        },
      };

      console.log(personAddOns);
      handleAddPassengersAddOns(personAddOns);
    } else {
      toast.error("No Passenger Selected", {
        description: "Please, Select passenger to continue",
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Add {flight} {type}
        </DialogTitle>
      </DialogHeader>
      <div className="mt-6 ">
        <SelectPassenger
          passengerDetails={passengerDetails}
          onPassengerChange={handlePassengerChange}
        />
        <Text className="mx-auto w-fit text-xs font-semibold">
          {type === "Meal" ? (
            <>
              {flight === "Depart"
                ? mealsAddOn.length
                : returnMealsAddOn.length}{" "}
              {type}
            </>
          ) : (
            <>
              {flight === "Depart"
                ? baggageAddOn.baggage_weight
                : returnBaggageAddOn.baggage_weight}{" "}
              {type}
            </>
          )}
          {type === "Meal" ? (
            <>
              <span className="font-normal">{` IDR ${
                flight === "Depart"
                  ? parseFloat(calculateMealPriceTotal()).toLocaleString()
                  : parseFloat(calculateReturnMealPriceTotal()).toLocaleString()
              }`}</span>
            </>
          ) : (
            <span className="font-normal">{` IDR ${
              flight === "Depart"
                ? parseFloat(baggageAddOn.baggage_price).toLocaleString()
                : parseFloat(returnBaggageAddOn.baggage_price).toLocaleString()
            }`}</span>
          )}
        </Text>
        <div className="mt-8 rounded-lg px-3 py-4 shadow">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Image
                  className="max-w-12"
                  image={cart[cart_index].flight.airline.image}
                  alt={cart[cart_index].flight.airline.name}
                />
                <Text className="font-medium">
                  {cart[cart_index].flight.iata}
                </Text>
              </div>
              <div className="inline-flex h-6 items-center justify-center rounded-full bg-gray-100 px-2">
                <Text className="text-xs font-medium text-gray-500">
                  {cart[cart_index].flight.transit === 0
                    ? "Non-stop"
                    : `${cart[cart_index].flight.transit} Transit`}
                </Text>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-gray-400">
              {format(
                cart[cart_index].flight.departure.scheduled_time,
                "E, dd MMM",
              )}{" "}
              <Dot className="h-4 w-4 text-black" />
              {`${format(
                cart[cart_index].flight.departure.scheduled_time,
                "HH:mm",
              )} - ${format(
                cart[cart_index].flight.arrival.scheduled_time,
                "HH:mm",
              )}`}
            </div>
          </div>
        </div>
      </div>
      {type === "Baggage" ? (
        <Baggage flight={flight ? flight : ""} />
      ) : (
        <Meal flight={flight ? flight : ""} />
      )}
      {type === "Baggage" ? (
        flight === "Depart" ? (
          <AccordionSubtotal
            subtotal={baggageAddOn.baggage_price}
            type={type}
          />
        ) : (
          <AccordionSubtotal
            subtotal={returnBaggageAddOn.baggage_price}
            type={type}
          />
        )
      ) : flight === "Depart" ? (
        <AccordionSubtotal
          subtotal={parseFloat(calculateMealPriceTotal()).toLocaleString()}
          type="Meal"
        />
      ) : (
        <AccordionSubtotal
          subtotal={parseFloat(
            calculateReturnMealPriceTotal(),
          ).toLocaleString()}
          type="Meal"
        />
      )}
      <Button
        type="button"
        variant="primary"
        className="h-14 w-full rounded-xl"
        onClick={handleSave}
      >
        Save
      </Button>
    </>
  );
};

export default AddOnsContent;
