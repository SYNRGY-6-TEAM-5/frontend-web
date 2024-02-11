import { useEffect, useState } from "react";

interface countDown {
  countDownTime: number,
}

const useParseTime = ({countDownTime}:countDown) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (countDownTime > 1) {
      const secondsRemaining = Math.floor(countDownTime % 60);
      const minutesRemaining = Math.floor((countDownTime / 60) % 60);
      const hoursRemaining = Math.floor(countDownTime / 3600);

      setSeconds(secondsRemaining);
      setMinutes(minutesRemaining);
      setHours(hoursRemaining);
    }
  }, [countDownTime]);

  return { seconds, minutes, hours };
}

export default useParseTime;