import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="container relative flex items-center justify-center h-screen">
      <div id="main" className="flex flex-col items-center">
        <div id="header" className="flex flex-col items-center justify-center">
          <img
            src="/src/assets/logo.png"
            alt="logo"
            className="text-center"
          ></img>
          <div className="text-center">Forgot Password?</div>
          <div className="text-center">
            No worries, we'll send you reset <br /> Instructions
          </div>
        </div>
        <div id="body" className="mt-5">
          <div id="email">
            <div>Email</div>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>

          <div className="flex flex-col mt-5 space-y-4">
            <Button className="bg-[#F74E28] text-white hover:bg-[#F74E28]">
              Reset Password
            </Button>
            <Button variant="link">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
