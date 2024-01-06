import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { Text } from "@mantine/core";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ChangePasswordMethod = () => {
  return (
    <div className="mx-auto w-full px-4 pt-24 sm:w-fit md:px-0">
      <div className="px-3 py-8 sm:px-8">
        <MainLogo className="mb-6 w-full text-center h-10 " />
        <Text className="text-center text-3xl font-medium">
          Choose verification method
        </Text>
        <Text className="mb-8 mt-3 text-center text-sm text-[#5D6B98]">
          We’ll send you a verification code to reset your password
        </Text>
        <label
          htmlFor="phone"
          className="group flex border-b py-3 text-[#B9C0D4] hover:border-[#FBAE9D] hover:text-[#FBAE9D] has-[:checked]:border-[#F74E28] has-[:checked]:text-[#F74E28]"
        >
          <Phone size={24} />
          <Text className="ml-2 grow">+62-738-****-****</Text>
          <input
            type="radio"
            id="phone"
            className="checked:accent-[#F74E28]"
            name="method"
          />
        </label>
        <label
          htmlFor="email"
          className="group mt-3 flex border-b py-3 text-[#B9C0D4] hover:border-[#FBAE9D] hover:text-[#FBAE9D] has-[:checked]:border-[#F74E28] has-[:checked]:text-[#F74E28]"
        >
          <EnvelopeSimple size={24} />
          <Text className="ml-2 grow">te****@****.com</Text>
          <input
            type="radio"
            id="email"
            className="checked:accent-[#F74E28]"
            name="method"
          />
        </label>
        <Button variant={"primary"} className="mt-7 h-14 w-full">
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
