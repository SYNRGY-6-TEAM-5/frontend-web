import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { TimeCounter } from 'easytimer.js';

interface timeProps {
  isTargetAchieved: boolean;
  timeValues: TimeCounter;
}

const Timer = ({ isTargetAchieved, timeValues }: timeProps) => {
  return (
    <>
      <Card className="h-fit bg-black">
        <CardContent className="grid gap-1 p-2 xs:grid-cols-1 xs:text-center md:grid-cols-3 md:text-left">
          <div className="text-white">Complete payment in</div>
          <div></div>
          {isTargetAchieved ? (
            toast.error("Transaction Timeout", {
              description: "Please, repeat the procedure",
            })
          ) : (
            <div className="rounded-md bg-white text-error-500 text-center">{timeValues.toString(['hours', 'minutes', 'seconds'])}</div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Timer;
