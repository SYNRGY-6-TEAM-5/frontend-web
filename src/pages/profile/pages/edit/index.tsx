import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import UploadImage from "./component/UploadImage";
import CalendarForm from "./component/CalendarForm";
import {
  useRegisterFillProfile,
  useRegisterUploadImage,
} from "@/lib/hooks/useRegister";

import { useProfileUserStore } from "@/store/useProfileUserStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";

interface FormValues {
  fullName: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  image: File | null;
  imageUrl: string;
}

const EditProfile = () => {
  const { userData } = useProfileUserStore();
  const { mutateAsync, isPending } = useRegisterFillProfile(false);
  const { mutateAsync: mutateImage, isPending: isImagePending } =
    useRegisterUploadImage();

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      dateOfBirth: null,
      phoneNumber: "",
      image: null,
      imageUrl: ""
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
    },
  });

  useEffect(() => {
    if (userData?.dob) {
      formik.setValues({
        fullName: userData.fullName || "",
        dateOfBirth: userData.dob ? new Date(userData.dob) : null,
        phoneNumber: userData.phoneNum ? userData.phoneNum.toString() : "",
        image: null,
        imageUrl: userData.imageUrl,
      });
    }
  }, [userData]);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-start gap-10 pt-8"
      >
        <div className="ml-[140px] flex gap-10">
          <div className="flex flex-col items-center gap-4">
            <UploadImage formik={formik} />
          </div>
        </div>
        <div>
          <div className="flex w-[343px] flex-col gap-5">
            <Input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              autoComplete="off"
              className="border-b border-gray-200 bg-[#FBFBFB] py-3 text-base font-normal text-black placeholder:text-gray-300 focus:outline-none"
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
                className="before:content-['+62 |'] border-b border-gray-200 bg-[#FBFBFB] py-3 text-base font-normal text-black placeholder:text-gray-300 focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                required
              />
            </div>
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
        </div>
      </form>
    </>
  );
};

export default EditProfile;
