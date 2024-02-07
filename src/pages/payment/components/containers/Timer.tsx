import { Card, CardContent } from "@/components/ui/card";
import useTimer from "@/lib/hooks/useTimer";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

interface timeProps {
  countDown: number;
  onTimerStatusChange: (timerStatus: boolean) => void;
}

const Timer = ({ countDown, onTimerStatusChange }: timeProps) => {
  const { seconds, minutes, hours, runTimer } = useTimer({
    date: countDown,
    countDownTime: countDown,
  });

  useEffect(() => {
    if (!runTimer) {
      toast.error("Transaction Timeout", {
        description: "Please, repeate the procedure",
      });
    }
    onTimerStatusChange(true);
  }, [runTimer, onTimerStatusChange]);

  return (
    <>
      <Card className="h-fit bg-black">
        <CardContent className="grid gap-1 p-2 xs:grid-cols-1 xs:text-center md:grid-cols-3 md:text-left">
          <div className="text-white">Complete payment in</div>
          <div></div>
          <div className="rounded-md bg-white text-center text-error-500">
            {hours}:{minutes}:{seconds}
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
};

export default Timer;
