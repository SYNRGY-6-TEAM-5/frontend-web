import React from "react";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Text } from "@mantine/core";
import { Button } from "@/components/ui/button";

import DoBForm from "@/pages/booking/components/passanger-detail/component/ui/DoBForm";

import FormHeader from "../ui/FormHeader";
import { ISavedPassengerData } from "@/types/Booking";
import TravelDocForm from "@/pages/booking/components/passanger-detail/component/ui/TravelDocForm";

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

interface PassengerAddFormProps {
  saved_passenger_id: number;
}

const PassengerAddForm: React.FC<PassengerAddFormProps> = ({ saved_passenger_id }) => {
  const formikHook = useFormik<ISavedPassengerData>({
    initialValues: {
      saved_passenger_id: saved_passenger_id,
      id: `adult-${saved_passenger_id}`,
      NIK: "",
      name: "",
      date_of_birth: null,
      courtesy_title: "Mr",
      vaccinated: "yes",
      travel_docs: [
        {
          doc_type: "",
          nationality: "",
          document_number: "",
          expired_date: new Date(),
          image_url: "",
        },
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Formik Unstructured Log:", values);
    },
  });

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <FormHeader passengerName="Add New Passanger" />
      </CardHeader>

      <CardContent>
        <section className="flex flex-col gap-6 px-16 pb-12">
          <Formik
            initialValues={formikHook.values}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("onSubmit", JSON.stringify(values, null, 2));
              // handleAddToPassengerDetails(values);
              // console.log(passengerDetails);
            }}
            validateOnBlur
          >
            {(formik) => (
              <Form className="space-y-8 pt-8">
                <Input
                  type="text"
                  id={`nik-${saved_passenger_id}`}
                  name={"NIK"}
                  placeholder={"NIK"}
                  autoComplete="off"
                  className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                  onChange={formik.handleChange}
                  value={formik.values.NIK.toString()}
                  required
                />
                {formik.errors.NIK && (
                  <span className="text-red-500">{formik.errors.NIK}</span>
                )}
                <Input
                  type="text"
                  id={`fullName-${saved_passenger_id}`}
                  name="name"
                  placeholder="Full Name"
                  autoComplete="off"
                  className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                  onChange={formik.handleChange}
                  value={formik.values.name.toString()}
                  required
                />
                {formik.errors.name && (
                  <span className="text-red-500">
                    {formik.errors.name}
                  </span>
                )}
                <DoBForm
                  formik={formik}
                  _id={`dateOfBirth-${saved_passenger_id}`}
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
                    <RadioGroupItem
                      value="Mr"
                      id={`title-mr`}
                    />
                    <Label htmlFor={`title-mr`}>Mr.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Mrs"
                      id={`title-mrs`}
                    />
                    <Label htmlFor={`title-mrs`}>Mrs.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Ms"
                      id={`title-ms`}
                    />
                    <Label htmlFor={`title-ms`}>Ms.</Label>
                  </div>
                </RadioGroup>
                  <TravelDocForm
                    _index={saved_passenger_id}
                    _nthPassenger={saved_passenger_id}
                    formik={formik}
                  />
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
                        id={`vaccinated-yes`}
                      />
                      <Label htmlFor={`vaccinated-yes`}>
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="no"
                        id={`vaccinated-no`}
                      />
                      <Label htmlFor={`vaccinated-no`}>
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex justify-betwen items-center gap-10">
                  
                <Button
                  variant="primary"
                  className="mt-7 h-10 w-full bg-primary-200"
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-7 h-10 w-full"
                >
                  Add
                </Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </CardContent>
    </Card>
  );
};

export default PassengerAddForm;
