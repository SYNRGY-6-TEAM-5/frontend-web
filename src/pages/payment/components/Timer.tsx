import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface timeProps {
  date:number,
  countDownTime:number
}

const Timer = ({date, countDownTime}:timeProps) => {
  const deadline = date + countDownTime;
  const timeDiffrence = deadline - date;
  
  const [count, setCount] = useState<number>(timeDiffrence);
  const [runTimer, setRunTimer] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let interval:any;
  
  useEffect(() => {
    if (runTimer) {
      interval = setInterval(() => {
          setCount((count) => count - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [runTimer]);

  useEffect(() => {
    if (count < 0 && runTimer) {
      console.log("expired");
      setRunTimer(false);
      setCount(0);
    }
  }, [count, runTimer]);

  const seconds = (count % 60).toString().padStart(2, "0");
  const minutes = (Math.floor(count / 60)).toString().padStart(2, "0");
  const hours = (Math.floor(count / 360)).toString().padStart(2, "0");

  return(
    <Card className="bg-black m-3 text-center">
      <CardHeader className="text-white">
        <CardTitle>Complet payment in</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
          <div className="rounded-md bg-white text-error">
            {hours}:{minutes}:{seconds}
          </div>
      </CardContent>
    </Card>
  )
}

export default Timer;