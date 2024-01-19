import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";

interface allertProps {
  variant:string,
  tittle:string,
  desc:string,
}

const Allert = ({variant, tittle, desc}:allertProps) => {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{tittle}</AlertTitle>
      <AlertDescription>
        {desc}
      </AlertDescription>
    </Alert>
  )
}

export default Allert;