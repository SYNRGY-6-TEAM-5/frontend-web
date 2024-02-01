import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface allertProps {
  variant:"default" | "destructive" | null | undefined,
  tittle:string,
  desc:string,
  position:"top-left" | "center" | null | undefined
}

const Allert = ({variant, tittle, desc, position}:allertProps) => {
  const [visible, setVisible] = useState<boolean>(true);

  setTimeout(() => {
    setVisible(false);
  }, 3000);

  if(visible) {
    if(position == "top-left") {
      return (
        <div className="absolute top-10 left-10 z-100">
          <Alert className="bg-white" variant={variant}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{tittle}</AlertTitle>
            <AlertDescription>
              {desc}
            </AlertDescription>
          </Alert>
        </div>
      )
    } else {
      return (
        <div className="fixed flex w-full h-full content-center justify-center z-100">
          <Alert className="bg-white w-fit h-fit" variant={variant}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{tittle}</AlertTitle>
            <AlertDescription>
              {desc}
            </AlertDescription>
          </Alert>
        </div>
      )
    }
  }  
}

export default Allert;