import { Card, CardContent } from "@/components/ui/card";

interface timeProps {
  hours:string,
  minutes:string,
  seconds:string,
}

const TimerMyFlight = ({hours, minutes, seconds}:timeProps) => {
  return(
    <Card className="bg-black h-fit">
      <CardContent className="grid p-2 gap-2 text-center">
          <div className="text-white">Complet payment in</div>
          <div className="rounded-md bg-white text-error-500 text-center">
            {hours}:{minutes}:{seconds}
          </div>
      </CardContent>
    </Card>
  )
}

export default TimerMyFlight;