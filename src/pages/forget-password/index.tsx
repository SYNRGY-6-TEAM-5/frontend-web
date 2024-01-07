import { useState } from "react";
import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = (inputEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const submitEmail = () => {
    if (isValidEmail) {
      navigate("/forgot-password/method");
    }
  };

  return (
    <div className="mx-auto w-full px-4 pt-24 xs:w-fit md:px-0">
      <div className="px-3 py-8 xs:px-8">
        <MainLogo className="mb-6 h-10 w-full text-center " />
        <Text className="text-center text-3xl font-medium">
          Password recovery
        </Text>
        <Text className="mb-8 mt-3 text-center text-sm text-gray-500">
          Enter your registered email address to <br />
          recover your password
        </Text>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <div
            className={cn(
              "flex flex-row border-b border-gray-200",
              isValidEmail ? "border-green-400" : "border-red-400",
            )}
          >
            <Input
              type={"text"}
              placeholder={"Enter your email"}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              className={cn(
                "rounded-none border-0 px-0 py-2.5 text-base text-slate-700 placeholder:text-gray-300",
              )}
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Button
              variant={"link"}
              type="button"
              className={cn(isValidEmail ? "text-green-400" : "text-red-400")}
            ></Button>
          </div>
        </div>

        <Button
          variant={"primary"}
          className={`mt-7 h-14 w-full ${
            !isValidEmail && "cursor-not-allowed"
          }`}
          onClick={submitEmail}
          disabled={!isValidEmail}
        >
          Next
        </Button>
        <Link
          to="/login"
          className="mt-8 flex items-center justify-center text-sm font-semibold text-[#475467]"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to log in
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
