import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { Text } from "@mantine/core";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import UploadImage from "./components/UploadImage";
import CalendarForm from "./components/CalendarForm";
import {
  useRegisterFillProfile,
  useRegisterUploadImage,
} from "@/lib/hooks/useRegister";
import { Loader } from "lucide-react";

interface FormValues {
  fullName: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  image: File | null;
}

const SetupProfile = () => {
  const { mutateAsync, isPending } = useRegisterFillProfile();
  const { mutateAsync: mutateImage, isPending: isImagePending } =
    useRegisterUploadImage();

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      dateOfBirth: null,
      phoneNumber: "",
      image: null,
    },
    validate: (values) => {
      const errors: Partial<{ dateOfBirth: string }> = {};
      if (!values.dateOfBirth) {
        errors.dateOfBirth = "Select your date of birth!";
      }
      return errors;
    },
    onSubmit: async (values) => {
      if (values.image) {
        await mutateImage(values.image);
      }
      const data = {
        fullName: values.fullName,
        dob: values.dateOfBirth!,
        phoneNumber: parseInt(values.phoneNumber, 10),
      };
      await mutateAsync(data);
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
          <UploadImage formik={formik} />
          <Input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            autoComplete="off"
            className="border-b-grey-500 mb-5 rounded-none border-0 border-b px-0 py-2.5 text-base placeholder:text-gray-300"
            onChange={formik.handleChange}
            value={formik.values.fullName}
            required
          />
          <CalendarForm formik={formik} />
          <div className="border-b-grey-500 group mb-5 flex items-center border-b has-[:active]:text-black ">
            <span className="text-gray-300 group-has-[:valid]:text-black">
              +62
            </span>
            <div className="mx-2 text-gray-300">|</div>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              autoComplete="off"
              className="before:content-['+62 |'] rounded-none border-0 px-0 py-2.5 text-base placeholder:text-gray-300"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              required
            />
          </div>
          <Button
            type="submit"
            variant={"primary"}
            className="mt-7 h-14 w-full"
            disabled={isPending || isImagePending}
          >
            {(isPending || isImagePending) && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
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
