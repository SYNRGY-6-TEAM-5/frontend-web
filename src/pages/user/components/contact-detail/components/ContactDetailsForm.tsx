"use client";
import { useFormik } from "formik";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
}

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
});

const ContactDetailsForm = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
    },
    validate: (values) => {
        const errors: Partial<FormValues> = {};
  
        if (!values.fullName) {
          errors.fullName = "Full name is required";
        }
  
        if (!values.email) {
          errors.email = "Email is required";
        } else if (values.email) {
          errors.email = "Invalid email address";
        }
  
        if (!values.phone) {
          errors.phone = "Phone number is required";
        } else if (values.phone) {
          errors.phone = "Invalid phone number";
        }
  
        return errors;
    },
    onSubmit: async (values) => {
      console.log("Formik Unstructured Log:", values);
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-8">
          <Input
            type="text"
            id="contact-details-full-name"
            name="full-name"
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
            name="contact-details-email"
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
            name="contact-details-phone"
            placeholder="Phone Number"
            autoComplete="off"
            className="border-b px-0 py-2.5 text-base placeholder:text-gray-300"
            onChange={formik.handleChange}
            value={formik.values.phone}
            required
          />
        </div>
      </form>
    </Form>
  );
};

export default ContactDetailsForm;
