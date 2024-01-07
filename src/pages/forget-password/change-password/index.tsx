import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { Text } from "@mantine/core";
import { useFormik } from "formik";

interface FormValues {
  password: string;
  rePassword: string;
}

const ChangePassword = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};
      if (values.password !== values.rePassword) {
        errors.rePassword = "Passwords must match";
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      formik.resetForm();
    },
  });

  return (
    <div className="xs:w-[430px] mx-auto w-full px-4 pt-24 md:px-0">
      <div className="px-3 py-8 sm:px-8">
        <MainLogo className="mb-6 h-10 w-full text-center " />
        <Text className="text-center text-3xl font-medium">
          Set new password
        </Text>
        <Text className="mb-8 mt-3 text-center text-sm text-gray-400">
          Your new password must be diffrent from previosly used passwords.
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <PasswordInput
            id="password"
            name="password"
            placeholder="New password"
            className="mb-5"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <PasswordInput
            id="rePassword"
            name="rePassword"
            placeholder="Retype new password"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            error={!!(formik.touched.rePassword && formik.errors.rePassword)}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <Text className="text-red-400">{formik.errors.rePassword}</Text>
          ) : null}
          <Button
            type="submit"
            variant={"primary"}
            className="mt-7 h-14 w-full"
          >
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
