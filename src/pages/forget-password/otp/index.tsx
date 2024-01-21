import { MainLogo } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import {
  useResetSendEmail,
  useResetValidateOTP,
} from "@/lib/hooks/useResetPassword";
import { Text } from "@mantine/core";
import { differenceInSeconds } from "date-fns";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

interface forgotDataTypes {
  expiredOTP: number;
  otp: string;
  success: boolean;
  email: string;
}

const restTime = (time: number) => {
  const expTime = differenceInSeconds(time, Date.now());
  const minutes = Math.floor(expTime / 60);
  const seconds = expTime % 60;

  return { minutes, seconds };
};

const PasswordOTP = () => {
  const forgotData = Cookies.get("forgotData");
  const parsedData: forgotDataTypes = JSON.parse(forgotData ?? "{}");

  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(
    restTime(parsedData.expiredOTP) ?? { minutes: 5, seconds: 0 },
  );

  const { mutateAsync, isPending } = useResetValidateOTP({ otp });
  const { mutateAsync: mutateResend, isPending: isPendingResend } =
    useResetSendEmail({ email: parsedData.email });

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

  const resendCode = async () => {
    await mutateResend();
    setTime({ minutes: 5, seconds: 0 });
  };

  const verifiedOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync();
    setOtp("");
  };

  return (
    <div className="mx-auto w-full px-4 pt-24 xs:w-[435px] md:px-0">
      <div className="px-3 py-8 xs:px-8">
        <MainLogo className="mb-6 w-full text-center" />
        <Text className="text-center text-3xl font-medium">
          Verification Code
        </Text>
        <Text className="mb-8 mt-3 text-center text-sm text-gray-500">
          We have sent the code verification to{" "}
          <span className="font-medium text-gray-700">{parsedData?.email}</span>
          . Please input the 4 digits code
        </Text>
        <form onSubmit={verifiedOtp}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={
              <span className="font-semibold text-primary-50">-</span>
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
              disabled={isPendingResend}
              className="mb-3 mt-9 h-14 w-full rounded-xl"
            >
              {isPendingResend && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Resend Code
            </Button>
          )}
          <Button
            type="submit"
            variant={"primary"}
            className="h-14 w-full"
            disabled={isPending}
          >
            {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            Next
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordOTP;
