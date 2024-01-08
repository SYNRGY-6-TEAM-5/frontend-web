import { SuccesReset } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const continueLogin = () => {
    navigate("/login");
  };

  return (
    <div className="mx-auto w-full px-4 pt-24 xs:w-fit md:px-0">
      <div className="px-3 py-8 xs:px-8">
        <SuccesReset className="mb-6 h-20 w-full text-center " />
        <Text className="text-center text-3xl font-medium">Password reset</Text>
        <Text className="mb-5 mt-3 text-center text-sm text-gray-500">
          Your password has been successfully reset. <br />
          Click below to sign in.
        </Text>

        <Button
          variant={"primary"}
          className={`mt-2 h-14 w-full`}
          onClick={continueLogin}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
