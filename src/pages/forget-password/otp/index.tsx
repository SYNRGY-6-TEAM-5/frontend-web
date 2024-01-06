import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

const PasswordOTP = () => {
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState({ minutes: 2, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(interval);
      } else {
        setTime((prevTime) => {
          if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  const resendCode = () => {
    setTime({ minutes: 2, seconds: 0 });
  };

  return (
    <div className="mx-auto w-full px-4 pt-24 sm:w-[435px] md:px-0">
      <div className="px-3 py-8 sm:px-8">
        <MainLogo className="mb-6 w-full text-center" />
        <Text className="text-center text-3xl font-medium">
          Verification Code
        </Text>
        <Text className="mb-8 mt-3 text-center text-sm text-[#5D6B98]">
          We have sent the code verification to{" "}
          <span className="font-medium text-[#404968]">test@gmail.com</span>.
          Please input the 4 digits code
        </Text>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={
            <span className="font-semibold text-[#FEEBE6]">-</span>
          }
          skipDefaultStyles={true}
          inputStyle={
            "w-[62px] h-[62px] text-center rounded-xl valid:bg-[#F74E28] valid:text-white bg-[#F9F9FB] px-3 py-2 text-sm focus-visible:outline-none focus-visible:bg-[#EFF1F5] text-base font-semibold placeholder:text-[#111111] placeholder:font-semibold"
          }
          placeholder="----"
          containerStyle={"flex justify-between"}
          inputType={"tel"}
          renderInput={(props) => <input required {...props} />}
        />
        {time.minutes > 0 || time.seconds > 0 ? (
          <Text className="mb-6 mt-9 text-sm text-[#B9C0D4]">
            Resend code after{" "}
            <span className="ml-1 font-medium text-[#F74E28]">
              {formatTime(time.minutes)}:{formatTime(time.seconds)}
            </span>
          </Text>
        ) : (
          <Button
            onClick={resendCode}
            variant={"secondary"}
            className="mb-3 mt-9 h-14 w-full rounded-xl"
          >
            Resend Code
          </Button>
        )}
        <Button variant={"primary"} className="h-14 w-full">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PasswordOTP;
