import React, { useEffect, useState } from "react";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Text } from "@mantine/core";
import { Button } from "@/components/ui/button";

import FormHeader from "../ui/FormHeader";
import { ISavedPassengerData } from "@/types/Booking";

import { useGetPassenger } from "@/lib/hooks/usePassengerTravel";
import SavedDoBForm from "../ui/SavedDoBForm";
import SavedTravelDocForm from "../ui/SavedTravelDocForm";

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

interface PassengerUpdateFormProps {
  saved_passenger_id: number;
}

const PassengerUpdateForm: React.FC<PassengerUpdateFormProps> = ({
  saved_passenger_id,
}) => {
  const [passengerName, setPassengerName] = useState<string>("");
  const [formikValues, setFormikValues] = useState<ISavedPassengerData>({
    saved_passenger_id: 0,
    id: "",
    NIK: "",
    name: "",
    date_of_birth: new Date(),
    courtesy_title: "",
    vaccinated: "",
    travel_docs: [],
  });

  const { data } = useGetPassenger(saved_passenger_id.toString());

  const formikHook = useFormik<ISavedPassengerData>({
    initialValues: {
      saved_passenger_id: saved_passenger_id,
      id: `adult-${saved_passenger_id}`,
      NIK: formikValues.NIK,
      name: formikValues.name,
      date_of_birth: formikValues.date_of_birth,
      courtesy_title: formikValues.courtesy_title,
      vaccinated: formikValues.vaccinated,
      travel_docs: formikValues.travel_docs,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Formik Unstructured Log:", values);
    },
  });

  useEffect(() => {
    if (data && data[0].name !== undefined) {
      setPassengerName(data[0].name);
      setFormikValues({
        saved_passenger_id: saved_passenger_id,
        id: `adult-${saved_passenger_id}`,
        NIK: data[0].NIK,
        name: data[0].name,
        date_of_birth: data[0].date_of_birth,
        courtesy_title: data[0].courtesy_title,
        vaccinated: data[0].vaccinated,
        travel_docs: data[0].travel_docs.map((doc: any) => ({
          doc_type: doc.doc_type,
          nationality: doc.nationality,
          document_number: doc.doc_number,
          expired_date: new Date(doc.expired_date),
          image_url: doc.file,
        })),
      });
    }
  }, [data]);

  return (
    <Card className="h-full w-full">
      <CardHeader>
        {passengerName && passengerName !== "" && (
          <FormHeader passengerName={passengerName} />
        )}
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-6 px-16 pb-12">
          {data && data[0].name && (
            <Formik
              initialValues={formikHook.values}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("onSubmit", JSON.stringify(values, null, 2));
                // handleAddToPassengerDetails(values);
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
                    onChange={(e) => {
                      formik.setFieldValue("NIK", e.target.value);
                      formik.setFieldTouched("NIK", true);
                    }}
                    value={formik.values.NIK}
                    required
                  />
                  {formik.errors.NIK && (
                    <span className="text-red-500">{formik.errors.NIK}</span>
                  )}
                  <Input
                    type="text"
                    id={`name-${saved_passenger_id}`}
                    name={"name"}
                    placeholder={"Full Name"}
                    autoComplete="off"
                    className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
                    onChange={(e) => {
                      formik.setFieldValue("name", e.target.value);
                      formik.setFieldTouched("name", true);
                    }}
                    value={formik.values.name}
                    required
                  />
                  {formik.errors.name && (
                    <span className="text-red-500">{formik.errors.name}</span>
                  )}
                  <SavedDoBForm
                    data={data[0]}
                    formik={formik}
                    _id={`dateOfBirth-${saved_passenger_id}`}
                  />
                  <RadioGroup
                    onValueChange={(value) => {
                      formik.setFieldValue("courtesy_title", value);
                    }}
                    defaultValue={
                      formik.values.courtesy_title
                        ? formik.values.courtesy_title
                        : data[0].courtesy_title
                    }
                    className="flex flex-row space-x-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Mr" id={`title-mr`} />
                      <Label htmlFor={`title-mr`}>Mr.</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Mrs" id={`title-mrs`} />
                      <Label htmlFor={`title-mrs`}>Mrs.</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ms" id={`title-ms`} />
                      <Label htmlFor={`title-ms`}>Ms.</Label>
                    </div>
                  </RadioGroup>
                  <SavedTravelDocForm data={data[0]} formik={formik} />
                  <div className="flex flex-col gap-4 pt-2">
                    <Text className="text-md font-semibold text-black">
                      Are you vaccinated?
                    </Text>
                    <RadioGroup
                      onValueChange={(value) => {
                        formik.setFieldValue("vaccinated", value);
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
                          checked={formik.values.vaccinated === "yes"}
                          value="yes"
                          id={`vaccinated-yes`}
                        />
                        <Label htmlFor={`vaccinated-yes`}>Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          checked={formik.values.vaccinated === "no"}
                          value="no"
                          id={`vaccinated-no`}
                        />
                        <Label htmlFor={`vaccinated-no`}>No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="justify-betwen flex items-center gap-10">
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
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </section>
      </CardContent>
    </Card>
  );
};

export default PassengerUpdateForm;
