import { Card, CardContent } from "@/components/ui/card";

interface timeProps {
  hours:string,
  minutes:string,
  seconds:string,
}

const Timer = ({hours, minutes, seconds}:timeProps) => {
  return(
    <Card className="bg-black">
      <CardContent className="grid grid-cols-3 gap-4 p-2">
          <div className="text-white">Complet payment in</div>
          <div></div>
          <div className="rounded-md bg-white text-error text-center">
            {hours}:{minutes}:{seconds}
          </div>
      </CardContent>
    </Card>
  )
}

export default Timer;