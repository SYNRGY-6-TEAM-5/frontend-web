"use client";
import { useFormik } from "formik";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import {
  useFillPassenger,
  restructureData,
} from "@/lib/hooks/usePassengerTravel";
import { Button } from "@/components/ui/button";
import AccordionFormItem from "./component/containers/AccordionItem";
import { Form } from "@/components/ui/form";

const ticketDetails: any = {
  ticket_class: "",
  adult_seat: 2,
  infant_seat: 1,
  child_seat: 0,
  total_seat: 0,
  isInternational: false,
};

interface PassengerData {
  nik: string;
  fullName: string;
  dateOfBirth: Date | null;
  courtesy_title: string;
  vaccinated: boolean;
}

interface FormValues {
  passengers: {
    adults: Record<string, PassengerData>;
    childs: Record<string, PassengerData>;
    infants: Record<string, PassengerData>;
  };
}

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const PassangerDetail = () => {
  // const { mutateAsync } = useFillPassenger();

  let passengersData: Record<string, any> = {};
  const { adult_seat, child_seat, infant_seat } = ticketDetails;

  const formik = useFormik<FormValues>({
    initialValues: {
      passengers: {
        adults: {},
        childs: {},
        infants: {},
      },
    },
    validate: (values) => {
      const errors: Partial<{ [key: string]: { dateOfBirth: string } }> = {};

      Object.entries(values.passengers).forEach(
        ([_passengerType, passengerData]) => {
          Object.entries(passengerData).forEach(([passengerKey, passenger]) => {
            if (!passenger.dateOfBirth) {
              errors[passengerKey] = { dateOfBirth: "Select date of birth!" };
            }
          });
        },
      );

      return errors;
    },
    onSubmit: async (values) => {
      const { passengers } = restructureData(values);
      console.log("Formik Log:", passengers);
    },
  });

  const handleSubmit = () => {
    console.log("Basic Log >>> ", passengersData);
  };

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
          isInternational={ticketDetails.isInternational}
          formik={formik}
        />,
      );
      currentnthPassenger++
    }

    for (let i = 0; i < child_seat; i++) {
      items.push(
        <AccordionFormItem
          key={`${i}-child`}
          _index={i}
          _nthPassenger={currentnthPassenger}
          _age="child"
          isInternational={ticketDetails.isInternational}
          formik={formik}
        />,
      );
      currentnthPassenger++
    }

    for (let i = 0; i < infant_seat; i++) {
      items.push(
        <AccordionFormItem
          key={`${i}-infant`}
          _index={i}
          _nthPassenger={currentnthPassenger}
          _age="infant"
          isInternational={ticketDetails.isInternational}
          formik={formik}
        />,
      );
      currentnthPassenger++
    }

    return { items, passengersData };
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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
          {ticketDetails.isInternational ? (
            <div className="flex flex-row items-center justify-between gap-12">
              <CardTitle className="w-full">Your destination requires travel documents</CardTitle>
              <CardDescription className="text-sm w-96 text-slate-900">
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
          <Accordion type="single" collapsible className="w-full">
            <Form {...form}>
              <form onSubmit={formik.handleSubmit}>
                {items}
                <Button type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </form>
            </Form>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

export default PassangerDetail;
