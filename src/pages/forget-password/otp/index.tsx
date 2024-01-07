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

  const verifiedOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(otp);
    setOtp("");
  };

  return (
    <div className="xs:w-[435px] mx-auto w-full px-4 pt-24 md:px-0">
      <div className="xs:px-8 px-3 py-8">
        <MainLogo className="mb-6 w-full text-center" />
        <Text className="text-center text-3xl font-medium">
          Verification Code
        </Text>
        <Text className="text-gray-500 mb-8 mt-3 text-center text-sm">
          We have sent the code verification to{" "}
          <span className="text-gray-700 font-medium">test@gmail.com</span>.
          Please input the 4 digits code
        </Text>
        <form onSubmit={verifiedOtp}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={
              <span className="text-primary-50 font-semibold">-</span>
            }
            skipDefaultStyles={true}
            inputStyle={
              "w-[62px] h-[62px] text-black text-center rounded-xl valid:bg-primary-500 valid:text-white bg-gray-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:bg-gray-100 text-base font-semibold placeholder:text-black placeholder:font-semibold"
            }
            placeholder="----"
            containerStyle={"flex justify-between"}
            inputType={"tel"}
            renderInput={(props) => <input required {...props} />}
          />
          {time.minutes > 0 || time.seconds > 0 ? (
            <Text className="mb-6 mt-9 text-sm text-gray-300">
              Resend code after{" "}
              <span className="ml-1 font-medium text-primary-500">
                {formatTime(time.minutes)}:{formatTime(time.seconds)}
              </span>
            </Text>
          ) : (
            <Button
              type="button"
              onClick={resendCode}
              variant={"secondary"}
              className="mb-3 mt-9 h-14 w-full rounded-xl"
            >
              Resend Code
            </Button>
          )}
          <Button type="submit" variant={"primary"} className="h-14 w-full">
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordOTP;
