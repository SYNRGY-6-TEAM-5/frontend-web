import { useEffect, useState } from "react";
import { CheckList } from "@/assets/svg";
import { Text } from "@mantine/core";

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Redirect to home when countdown reaches 0
    if (countdown === 0) {
      clearInterval(redirectTimer);
      window.location.href = "/"; // Replace '/' with your desired home page path
    }

    // Clear the timer when the component unmounts
    return () => clearInterval(redirectTimer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `0:${formattedSeconds}`;
  };

  return (
    <div className="mx-auto w-full px-4 pt-24 text-center xs:w-[430px] md:px-0">
      <CheckList className="mb-6 h-20 w-full" />
      <Text className="mb-8 text-3xl font-semibold text-neutral-900">
        Your payment is succeeded, redirecting to your flight page.
      </Text>
      <Text className="text-sm text-slate-300">
        Redirecting to home in{" "}
        <span className="ml-1 font-medium text-primary-500">
          {formatTime(countdown)}
        </span>
      </Text>
    </div>
  );
};

export default PaymentSuccess;
