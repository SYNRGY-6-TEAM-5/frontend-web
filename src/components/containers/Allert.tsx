import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

interface allertProps {
  variant:"default" | "destructive" | null | undefined,
  tittle:string,
  desc:string,
}

const Allert = ({variant, tittle, desc}:allertProps) => {
  return (
    <div className="absolute top-10 left-10">
      <Alert className="bg-white" variant={variant}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{tittle}</AlertTitle>
        <AlertDescription>
          {desc}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default Allert;