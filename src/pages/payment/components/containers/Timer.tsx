import { Card, CardContent } from "@/components/ui/card";

interface timeProps {
  hours:string,
  minutes:string,
  seconds:string,
}

const Timer = ({hours, minutes, seconds}:timeProps) => {
  return(
    <Card className="bg-black h-fit">
      <CardContent className="grid p-2 md:grid-cols-3 md:text-left xs:text-center xs:grid-cols-1">
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