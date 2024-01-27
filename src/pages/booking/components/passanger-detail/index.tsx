"use client";
import { useFormik } from "formik";

import { Label } from "@/components/ui/label";
import { Text } from "@mantine/core";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import DoBForm from "./component/DoBForm";
import {
  useFillPassenger,
  restructureData,
} from "@/lib/hooks/usePassengerTravel";
import { Button } from "@/components/ui/button";

const ticketDetails: any = {
  ticket_class: "",
  adult_seat: 2,
  child_seat: 0,
  total_seat: 0,
  infant_seat: 1,
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

const PassangerDetail = () => {
  const { mutateAsync } = useFillPassenger();

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

    for (let i = 0; i < adult_seat; i++) {
      const passengerType = `adult-${i + 1}`;
      const nikKey = `adult-nik-${i + 1}` as keyof FormValues;
      const fullNameKey = `adult-fullName-${i + 1}` as keyof FormValues;
      const dateOfBirthKey = `adult-dateOfBirth-${i + 1}` as keyof FormValues;

      passengersData.adults = {
        ...passengersData,
        [passengerType]: {
          nik: formik.values[nikKey],
          fullName: formik.values[fullNameKey],
          dateOfBirth: formik.values[dateOfBirthKey],
        },
      };

      items.push(
        <AccordionItem key={`adult-${i + 1}`} value={`adult-${i + 1}`}>
          <AccordionTrigger className="text-sm font-semibold text-black">{`Passenger ${
            i + 1
          } (Adult)`}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-8">
              <Input
                type="text"
                id={`adult-nik-${i + 1}`}
                name={`adult-nik-${i + 1}`}
                placeholder="NIK"
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values[nikKey]?.toString()}
                required
              />
              <Input
                type="text"
                id={`adult-fullName-${i + 1}`}
                name={`adult-fullName-${i + 1}`}
                placeholder="fullName"
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values[fullNameKey]?.toString()}
                required
              />
              <DoBForm
                formik={formik}
                _id={`adult-dateOfBirth-${i + 1}`}
                _dobKey={dateOfBirthKey}
              />
              <RadioGroup defaultValue="comfortable" className="flex flex-row gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Default</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r3" />
                  <Label htmlFor="r3">Compact</Label>
                </div>
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>,
      );
    }

    for (let i = 0; i < child_seat; i++) {
      const passengerType = `child-${i + 1}`;
      const nikKey = `child-nik-${i + 1}` as keyof FormValues;
      const fullNameKey = `child-fullName-${i + 1}` as keyof FormValues;
      const dateOfBirthKey = `child-dateOfBirth-${i + 1}` as keyof FormValues;

      passengersData = {
        ...passengersData,
        [passengerType]: {
          nik: formik.values[nikKey],
          fullName: formik.values[fullNameKey],
          dateOfBirth: formik.values[dateOfBirthKey],
        },
      };

      items.push(
        <AccordionItem key={`child-${i + 1}`} value={`child-${i + 1}`}>
          <AccordionTrigger className="text-sm font-semibold text-black">{`Passenger ${
            i + 1
          } (Child)`}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-8">
              <Input
                type="text"
                id={`child-nik-${i + 1}`}
                name={`child-nik-${i + 1}`}
                placeholder="Parent or Provisioning Adult NIK"
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values[nikKey]?.toString()}
                required
              />
              <Input
                type="text"
                id={`child-fullName-${i + 1}`}
                name={`child-fullName-${i + 1}`}
                placeholder="fullName"
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values[fullNameKey]?.toString()}
                required
              />
              <DoBForm
                formik={formik}
                _id={`child-dateOfBirth-${i + 1}`}
                _dobKey={dateOfBirthKey}
              />
            </div>
          </AccordionContent>
        </AccordionItem>,
      );
    }

    for (let i = 0; i < infant_seat; i++) {
      const passengerType = `infant-${i + 1}`;
      const nikKey = `infant-nik-${i + 1}` as keyof FormValues;
      const fullNameKey = `infant-fullName-${i + 1}` as keyof FormValues;
      const dateOfBirthKey = `infant-dateOfBirth-${i + 1}` as keyof FormValues;

      passengersData = {
        ...passengersData,
        [passengerType]: {
          nik: formik.values[nikKey],
          fullName: formik.values[fullNameKey],
          dateOfBirth: formik.values[dateOfBirthKey],
        },
      };

      items.push(
        <AccordionItem key={`infant-${i + 1}`} value={`infant-${i + 1}`}>
          <AccordionTrigger className="text-sm font-semibold text-black">{`Passenger ${
            i + 1
          } (Infant)`}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-8">
              <Input
                type="text"
                id={`infant-nik-${i + 1}`}
                name={`infant-nik-${i + 1}`}
                placeholder="Parent or Provisioning Adult NIK"
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values[nikKey]?.toString()}
                required
              />
              <Input
                type="text"
                id={`infant-fullName-${i + 1}`}
                name={`infant-fullName-${i + 1}`}
                placeholder="fullName"
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values[fullNameKey]?.toString()}
                required
              />
              <DoBForm
                formik={formik}
                _id={`infant-dateOfBirth-${i + 1}`}
                _dobKey={dateOfBirthKey}
              />
            </div>
          </AccordionContent>
        </AccordionItem>,
      );
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardDescription className="text-xs text-slate-400">
            Same as contact details
          </CardDescription>
          <Switch className="data-[state=checked]:bg-primary-500" />
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Accordion type="single" collapsible className="w-full">
            <form onSubmit={formik.handleSubmit}>
              {items}
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
          </Accordion>
        </CardContent>
      </Card>
    </section>
  );
};

export default PassangerDetail;
