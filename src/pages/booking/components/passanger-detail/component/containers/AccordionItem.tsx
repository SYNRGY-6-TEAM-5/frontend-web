"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Text } from "@mantine/core";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import DoBForm from "./DoBForm";
import { FormikValues } from "formik";
import TravelDocForm from "../ui/TravelDocForm";

interface AccordionFormItemProps {
  _index: number;
  _nthPassenger: number;
  _age: string;
  isInternational: boolean;
  formik: FormikValues;
}

interface PassengerData {
  nik: string;
  fullName: string;
  dateOfBirth: Date | null;
  courtesy_title: string;
  vaccinated: string;
}

interface FormValues {
  passengers: {
    adults: Record<string, PassengerData>;
    childs: Record<string, PassengerData>;
    infants: Record<string, PassengerData>;
  };
}

const AccordionFormItem: React.FC<AccordionFormItemProps> = ({
  _index,
  _nthPassenger,
  _age,
  isInternational,
  formik,
}) => {
  const passengerType = `${_age}-${_index + 1}`;
  const nikKey = `${_age}-nik-${
    _index + 1
  }` as keyof FormValues["passengers"]["adults"];
  const fullNameKey = `${_age}-fullName-${
    _index + 1
  }` as keyof FormValues["passengers"]["adults"];
  const dateOfBirthKey = `${_age}-dateOfBirth-${
    _index + 1
  }` as keyof FormValues["passengers"]["adults"];

  return (
    <AccordionItem key={passengerType} value={passengerType}>
      <AccordionTrigger className="text-md font-semibold text-black">
        {`Passenger ${_nthPassenger + 1} (${
          _age.charAt(0).toUpperCase() + _age.slice(1)
        })`}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-8">
          <Input
            type="text"
            id={`${_age}-nik-${_index + 1}`}
            name={`${_age}-nik-${_index + 1}`}
            placeholder="NIK"
            autoComplete="off"
            className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
            onChange={formik.handleChange}
            value={formik.values[nikKey]?.toString()}
            required
          />
          <Input
            type="text"
            id={`${_age}-fullName-${_index + 1}`}
            name={`${_age}-fullName-${_index + 1}`}
            placeholder="fullName"
            autoComplete="off"
            className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
            onChange={formik.handleChange}
            value={formik.values[fullNameKey]?.toString()}
            required
          />
          <DoBForm
            formik={formik}
            _id={`${_age}-dateOfBirth-${_index + 1}`}
            _dobKey={dateOfBirthKey}
          />
          <FormField
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Mr" />
                      </FormControl>
                      <FormLabel className="font-normal">Mr.</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Mrs" />
                      </FormControl>
                      <FormLabel className="font-normal">Mrs.</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Ms" />
                      </FormControl>
                      <FormLabel className="font-normal">Ms.</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isInternational ? (
            <TravelDocForm
              _index={_index}
              _nthPassenger={_nthPassenger}
              _age={_age}
              formik={formik}
            />
          ) : (
            ""
          )}
          <div className="flex flex-col gap-4 pt-2">
            <Text className="text-md font-semibold text-black">
              Are you vaccinated?
            </Text>
            <FormField
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionFormItem;
