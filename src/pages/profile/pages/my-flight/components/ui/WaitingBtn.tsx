import useParseTime from "@/lib/hooks/useTimer";
import { Button, Text } from "@mantine/core"
import { differenceInSeconds, isFuture } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTimer from 'easytimer-react-hook';

const WaitingBtn = ({ expiredTime, orderId, total }: { expiredTime: string, orderId: number, total: string }) => {
  const [count_down, setCountDown] = useState<number>(0);
  const [isRunOut, setIsRunOut] = useState<boolean>(false);

  const expiryTime = expiredTime;
  const currentTime = new Date();

  const [timer] = useTimer({ countdown: true });
  const { seconds, minutes, hours } = useParseTime({ countDownTime: count_down });

  const navigate = useNavigate();
  const handleWaiting = (orderId: number) => {
    console.log({ orderId });
    navigate('/profile/payment/', {
      state: {
        orderId: orderId,
      }
    });
  }

  useEffect(() => {
    if (expiryTime && isFuture(new Date(expiryTime))) {
      setCountDown(differenceInSeconds(new Date(expiryTime), currentTime));
      setIsRunOut(false);
    } else {
      setIsRunOut(true);
    }

    timer.start({
      countdown: true,
      startValues: { hours, minutes, seconds },
    });
  }, [seconds, minutes, hours]);

  if (seconds === 0 && minutes === 0 && hours === 0) {
    return (
      <>
        <div className="flex justify-between">
          <Text className="font-medium text-sm">Total</Text>
          <Text className="font-semibold text-primary-500">IDR {total}</Text>
        </div>
        <Button
          type="button"
          className="w-full h-14 rounded-xl bg-gray-300 py-4 text-white font-medium text-sm"
          disabled
        >Complete the Payment in {timer.getTimeValues().toString(['hours', 'minutes', 'seconds'])}</Button>
      </>
    )
  } else {

    return (
      <>
        <div className="flex justify-between">
          <Text className="font-medium text-sm">Total</Text>
          <Text className="font-semibold text-primary-500">IDR {total}</Text>
        </div>
        {!isRunOut && (
          <Button
            type="button"
            onClick={() => handleWaiting(orderId)}
            className="w-full h-14 rounded-xl bg-primary-500 py-4 text-white font-medium text-sm"
          >
            Complete the Payment in {timer.getTimeValues().toString(['hours', 'minutes', 'seconds'])}
          </Button>
        )}
      </>
    )
  }
}

export default WaitingBtn