import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { Text } from "@mantine/core";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ChangePasswordMethod = () => {
  const navigate = useNavigate();

  const submit = () => {
    navigate("/forgot-password/otp");
  };

  return (
    <div className="mx-auto w-full px-4 pt-24 xs:w-fit md:px-0">
      <div className="px-3 py-8 xs:px-8">
        <MainLogo className="mb-6 h-10 w-full text-center " />
        <Text className="text-center text-3xl font-medium">
          Choose verification method
        </Text>
        <Text className="mb-8 mt-3 text-center text-sm text-gray-500">
          We’ll send you a verification code to reset your password
        </Text>
        <label
          htmlFor="phone"
          className="group flex border-b py-3 text-gray-300 hover:border-primary-200 hover:text-primary-200 has-[:checked]:border-primary-500 has-[:checked]:text-primary-500"
        >
          <Phone size={24} />
          <Text className="ml-2 grow">+62-738-****-****</Text>
          <input
            type="radio"
            id="phone"
            className="checked:accent-primary-500"
            name="method"
          />
        </label>
        <label
          htmlFor="email"
          className="group mt-3 flex border-b py-3 text-gray-300 hover:border-primary-200 hover:text-primary-200 has-[:checked]:border-primary-500 has-[:checked]:text-primary-500"
        >
          <EnvelopeSimple size={24} />
          <Text className="ml-2 grow">te****@****.com</Text>
          <input
            type="radio"
            id="email"
            className="checked:accent-primary-500"
            name="method"
          />
        </label>
        <Button
          onClick={submit}
          variant={"primary"}
          className="mt-7 h-14 w-full"
        >
          Next
        </Button>
        <Link
          to="/forgot-password"
          className="mt-8 flex items-center justify-center text-sm font-semibold text-[#475467]"
        >
          <ArrowLeft size={20} className="mr-2" />
          Change email
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordMethod;
