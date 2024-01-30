"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@mantine/core";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import DoBForm from "./DoBForm";
import { useFormik } from "formik";
import TravelDocForm from "../ui/TravelDocForm";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nik: Yup.string()
    .required("NIK must not be empty")
    .min(8, "NIK must be at least 8 characters")
    .max(16, "NIK must not exceed 16 characters"),
  fullName: Yup.string()
    .required("Full Name must not be empty")
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name must not exceed 50 characters"),
  // Add validation rules for other fields as needed
  // For dateOfBirth, you can use Yup.date() or Yup.mixed().nullable() if it can be null
  // For courtesy_title and vaccinated, you can define string() schema.
});

interface AccordionFormItemProps {
  _index: number;
  _nthPassenger: number;
  _age: string;
  isInternational: boolean;
}

interface PassengerData {
  id: string;
  nik: string;
  fullName: string;
  dateOfBirth: Date | null;
  courtesy_title: string;
  vaccinated: string;
}

const AccordionFormItem: React.FC<AccordionFormItemProps> = ({
  _index,
  _nthPassenger,
  _age,
  isInternational,
}) => {
  const passengerType = `${_age}-${_index + 1}`;

  const formik = useFormik<PassengerData>({
    initialValues: {
      id: `${passengerType}`,
      nik: "",
      fullName: "",
      dateOfBirth: null,
      courtesy_title: "Mr",
      vaccinated: "yes",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Formik Unstructured Log:", values);
    },
  });

  return (
    <AccordionItem key={passengerType} value={passengerType}>
      <AccordionTrigger className="text-md font-semibold text-black">
        {`Passenger ${_nthPassenger + 1} (${
          _age.charAt(0).toUpperCase() + _age.slice(1)
        })`}
      </AccordionTrigger>
      <AccordionContent>
        <Tabs defaultValue="new-passenger">
          <TabsList className="w-full bg-slate-200 p-1">
            <TabsTrigger
              value="new-passenger"
              className="w-1/2 bg-slate-200 data-[state=active]:bg-white"
            >
              New Passenger
            </TabsTrigger>
            <TabsTrigger
              value="saved-passenger"
              className="w-1/2 bg-slate-200 data-[state=active]:bg-white"
            >
              Saved Passenger
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="new-passenger"
            className="flex flex-col gap-2 px-4"
          >
            <form onSubmit={formik.handleSubmit} className="space-y-8 pt-8">
              <Input
                type="text"
                id={`${_age}-nik-${_index + 1}`}
                name={"nik"}
                placeholder={
                  _age !== "adult" ? "Parent or Provisioning adult NIK" : "NIK"
                }
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values.nik.toString()}
                required
              />
              {formik.errors.nik && (
                <span className="text-red-500">{formik.errors.nik}</span>
              )}
              <Input
                type="text"
                id={`${_age}-fullName-${_index + 1}`}
                name="fullName"
                placeholder="Full Name"
                autoComplete="off"
                className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                onChange={formik.handleChange}
                value={formik.values.fullName.toString()}
                required
              />
              {formik.errors.fullName && (
                <span className="text-red-500">{formik.errors.fullName}</span>
              )}
              <DoBForm
                formik={formik}
                _id={`${_age}-dateOfBirth-${_index + 1}`}
              />
              <RadioGroup
                onValueChange={(value) => {
                  formik.setFieldValue("courtesy_title", value); // Update courtesy_title based on the selected radio button
                }}
                defaultValue={
                  formik.values.courtesy_title
                    ? formik.values.courtesy_title
                    : "Mr"
                }
                className="flex flex-row space-x-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mr" id={`${passengerType}-title-mr`} />
                  <Label htmlFor={`${passengerType}-title-mr`}>Mr.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="Mrs"
                    id={`${passengerType}-title-mrs`}
                  />
                  <Label htmlFor={`${passengerType}-title-mrs`}>Mrs.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ms" id={`${passengerType}-title-ms`} />
                  <Label htmlFor={`${passengerType}-title-ms`}>Ms.</Label>
                </div>
              </RadioGroup>
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
                <RadioGroup
                  onValueChange={(value) => {
                    formik.setFieldValue("vaccinated", value); // Update courtesy_title based on the selected radio button
                  }}
                  defaultValue={
                    formik.values.courtesy_title
                      ? formik.values.vaccinated
                      : "yes"
                  }
                  className="flex flex-col gap-2 space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="yes"
                      id={`${passengerType}-vaccinated-yes`}
                    />
                    <Label htmlFor={`${passengerType}-vaccinated-yes`}>
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no"
                      id={`${passengerType}-vaccinated-no`}
                    />
                    <Label htmlFor={`${passengerType}-vaccinated-no`}>No</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="mt-7 h-14 w-full"
              >
                Submit
              </Button>
            </form>
          </TabsContent>

          <TabsContent
            value="saved-passenger"
            className="flex flex-col gap-2 px-4"
          ></TabsContent>
        </Tabs>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionFormItem;

