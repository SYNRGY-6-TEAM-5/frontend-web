import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import PasswordInput from "@/components/ui/password-input";
import { useResetChangePassword } from "@/lib/hooks/useResetPassword";
import { Text } from "@mantine/core";
import { useFormik } from "formik";
import { Loader } from "lucide-react";

interface FormValues {
  password: string;
  rePassword: string;
}

const ChangePassword = () => {
  const { mutateAsync, isPending } = useResetChangePassword();

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

      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])(?!.*123)(?!.*321)(?!.*456)(?!.*654)(?!.*789)(?!.*987).{8,}$/;
      if (!passwordRegex.test(values.password)) {
        errors.password =
          "Password must have at least 8 characters, one uppercase letter, one number, and one symbol. It should not contain sequential numbers.";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const data = {
        newPassword: values.password,
        retypePassword: values.rePassword,
      };
      await mutateAsync(data);
      formik.resetForm();
    },
  });

  return (
    <div className="mx-auto w-full px-4 pt-24 xs:w-[430px] md:px-0">
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
            onChange={formik.handleChange}
            value={formik.values.password}
            error={!!(formik.touched.password && formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password ? (
            <Text className="text-sm text-red-400">
              {formik.errors.password}
            </Text>
          ) : null}
          <PasswordInput
            id="rePassword"
            name="rePassword"
            placeholder="Retype new password"
            className="mt-5"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            error={!!(formik.touched.rePassword && formik.errors.rePassword)}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <Text className="text-sm text-red-400">
              {formik.errors.rePassword}
            </Text>
          ) : null}
          <Button
            type="submit"
            variant={"primary"}
            className="mt-7 h-14 w-full"
            disabled={isPending}
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
