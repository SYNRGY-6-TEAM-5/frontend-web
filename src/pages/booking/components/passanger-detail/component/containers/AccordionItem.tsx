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

import DoBForm from "../ui/DoBForm";
import { useFormik, Form, Formik } from "formik";
import TravelDocForm from "../ui/TravelDocForm";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import { PassengerData } from "@/types/Booking";
import { usePassengerStore } from "@/store/useBookingStore";
import { Button } from "@/components/ui/button";
import { useSavedBooking } from "@/lib/hooks/usePayment";
import { useCartStore } from "@/store/useCartStore";

const validationSchema = Yup.object().shape({
  nik: Yup.string()
    .required("NIK must not be empty")
    .min(8, "NIK must be at least 8 characters")
    .max(16, "NIK must not exceed 16 characters"),
  fullName: Yup.string()
    .required("Full Name must not be empty")
    .min(2, "Full Name must be at least 2 characters")
    .max(50, "Full Name must not exceed 50 characters"),



});

interface AccordionFormItemProps {
  _index: number;
  _nthPassenger: number;
  _age: string;
  isInternational: boolean;
}

const AccordionFormItem: React.FC<AccordionFormItemProps> = ({
  _index,
  _nthPassenger,
  _age,
  isInternational,
}) => {
  const { cart } = useCartStore();
  const { passengerDetails, add: handleAddToPassengerDetails, updateCompleteBookingData: handleAddToCompleteBooking } = usePassengerStore();
  const { updatedCompleteBookingData } = useSavedBooking();

  const passengerType = `${_age}-${_index + 1}`;

  const formikHook = useFormik<PassengerData>({
    initialValues: {
      id: `${passengerType}`,
      nik: passengerDetails.length > 0 ? passengerDetails[_nthPassenger].nik : "",
      fullName: passengerDetails.length > 0 ? passengerDetails[_nthPassenger].fullName : "",
      dateOfBirth: passengerDetails.length > 0 ? passengerDetails[_nthPassenger].dateOfBirth : new Date("1900-01-01"),
      courtesy_title: passengerDetails.length > 0 ? passengerDetails[_nthPassenger].courtesy_title : "",
      vaccinated: passengerDetails.length > 0 ? passengerDetails[_nthPassenger].vaccinated : "",
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
    <AccordionItem key={passengerType} value={passengerType}>
      <AccordionTrigger className="text-md font-semibold text-black">
        {`Passenger ${_nthPassenger + 1} (${_age.charAt(0).toUpperCase() + _age.slice(1)
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
              disabled
              className="w-1/2 bg-slate-200 data-[state=active]:bg-white"
            >
              Saved Passenger
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="new-passenger"
            className="flex flex-col gap-2 px-4"
          >
            <Formik
              initialValues={formikHook.values}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log("onSubmit", JSON.stringify(values, null, 2));
                handleAddToPassengerDetails(values);
                handleAddToCompleteBooking(updatedCompleteBookingData, cart);
              }}
              validateOnBlur
            >
              {(formik) => (
                <Form className="space-y-8 pt-8">
                  <Input
                    type="text"
                    id={`${_age}-nik-${_index + 1}`}
                    name={"nik"}
                    placeholder={
                      _age !== "adult"
                        ? "Parent or Provisioning adult NIK"
                        : "NIK"
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
                    <span className="text-red-500">
                      {formik.errors.fullName}
                    </span>
                  )}
                  <DoBForm
                    formik={formik}
                    _id={`${_age}-dateOfBirth-${_index + 1}`}
                  />
                  <RadioGroup
                    onValueChange={(value) => {
                      formik.setFieldValue("courtesy_title", value);
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
                        id={`${passengerType}-title-mr`}
                      />
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
                      <RadioGroupItem
                        value="Ms"
                        id={`${passengerType}-title-ms`}
                      />
                      <Label htmlFor={`${passengerType}-title-ms`}>Ms.</Label>
                    </div>
                  </RadioGroup>
                  {isInternational ? (
                    <TravelDocForm
                      _index={_index}
                      _nthPassenger={_nthPassenger}
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
                        <Label htmlFor={`${passengerType}-vaccinated-no`}>
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex justify-end items-center pt-6">
                    <Button variant="primary" type="submit">Add Passenger</Button>
                  </div>
                </Form>
              )}
            </Formik>
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
