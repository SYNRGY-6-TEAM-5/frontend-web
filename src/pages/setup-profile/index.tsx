import { MainLogo, ImageProfile } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { Text } from "@mantine/core";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface FormValues {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  image: File | null;
}

const SetupProfile = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      dateOfBirth: "",
      phoneNumber: "",
      image: null,
    },
    validate: () => {
      const errors: Partial<FormValues> = {};
      // Add any validation logic here if needed
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      formik.resetForm();
    },
  });

  return (
    <div className="mx-auto w-full px-4 pt-24 xs:w-[430px] md:px-0">
      <div className="px-3 py-8 sm:px-8">
        <MainLogo className="mb-6 h-10 w-full text-center " />
        <Text className="mb-8 text-center text-3xl font-medium">
          Setup Profile
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <Label htmlFor="imageUpload">
            <ImageProfile className="mb-6 h-20 w-full cursor-pointer text-center" />
            <Text className="mb-6 cursor-pointer text-center font-medium text-primary-500">
              Upload Image
            </Text>
            <Input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={(event) => {
                formik.setFieldValue(
                  "image",
                  event.currentTarget.files?.[0] || null,
                );
              }}
              style={{ display: "none" }}
            />
          </Label>
          {formik.values.image && (
            <Text className="mb-6 text-center text-sm text-gray-500">
              {formik.values.image.name}
            </Text>
          )}
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            className="border-b-grey-500 mb-5 rounded-none border-0 border-b px-0 py-2.5 text-base"
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />

          <Input
            type="text"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="Date of Birth (DD/MM/YYYY)"
            className="border-b-grey-500 mb-5 rounded-none border-0 border-b px-0 py-2.5 text-base"
            onChange={formik.handleChange}
            value={formik.values.dateOfBirth}
          />

          <Input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="+62  |  Phone Number"
            className="border-b-grey-500 mb-5 rounded-none border-0 border-b px-0 py-2.5 text-base"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
          />

          <Button
            type="submit"
            variant={"primary"}
            className="mt-7 h-14 w-full"
          >
            Confirm
          </Button>
        </form>
        <Link
          to="/account-created"
          className="mt-8 flex items-center justify-center text-sm font-semibold text-[#B9C0D4]"
        >
          Skip
        </Link>
      </div>
    </div>
  );
};

export default SetupProfile;
