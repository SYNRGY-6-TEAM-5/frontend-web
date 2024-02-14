import { Card, CardContent } from "@/components/ui/card";
import { TimeCounter } from 'easytimer.js';

interface timeProps {
  timeValues: TimeCounter;
}

const TimerMyFlight = ({timeValues}:timeProps) => {
  return(
    <Card className="bg-black h-fit">
      <CardContent className="grid p-2 gap-2 text-center">
          <div className="text-white">Complet payment in</div>
          <div className="rounded-md bg-white text-error-500 text-center">
          {timeValues.toString(['hours', 'minutes', 'seconds'])}
          </div>
      </CardContent>
    </Card>
  )
}

export default TimerMyFlight;