import * as Yup from "yup";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { usePassengerStore } from "@/store/useBookingStore";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import React from "react";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name must not be empty")
    .min(4, "Full Name must be at least 4 characters")
    .max(50, "Full Name must not exceed 50 characters"),
  email: Yup.string()
    .required("Email must not be empty")
    .email("Invalid email format")
    .max(50, "Email must not exceed 50 characters"),
  phone: Yup.string()
    .required("Phone Number must not be empty")
    .min(6, "Phone Number must be at least 6 characters")
    .max(16, "Phone Number must not exceed 16 characters"),
});

interface ContactDetailsFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({ nextStep, prevStep }) => {
  const { updateContactDetails: handleAddToPassengerDetails, contactDetails } = usePassengerStore();

  const formik = useFormik({
    initialValues: {
      fullName: contactDetails.fullName ? contactDetails.fullName : "",
      email: contactDetails.email ? contactDetails.email : "",
      phone: contactDetails.phone ? contactDetails.phone : "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddToPassengerDetails(values);
      nextStep();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8 pt-8">
      <Input
        type="text"
        id="contact-details-full-name"
        name="fullName"
        placeholder="Full Name"
        autoComplete="off"
        className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
        onChange={formik.handleChange}
        value={formik.values.fullName}
        required
      />
      <Input
        type="text"
        id="contact-details-email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
        onChange={formik.handleChange}
        value={formik.values.email}
        required
      />
      <Input
        type="text"
        id="contact-details-phone"
        name="phone"
        placeholder="Phone Number"
        autoComplete="off"
        className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
        onChange={formik.handleChange}
        value={formik.values.phone}
        required
      />

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={prevStep}><ChevronLeftIcon />Back</Button>
        <Button variant="primary" type="submit">Next <ChevronRightIcon /></Button>
      </div>
    </form>
  );
};

export default ContactDetailsForm;
