import { Button, Text } from "@mantine/core";
import ArrowCircle from "@/assets/ArrowCircleRight.png";
import { Copy } from "lucide-react";
import { Toaster } from "sonner";
import { toast } from "sonner";
const CodeBooking = () => {

  const handleCopyText = () => {
    navigator.clipboard.writeText("BHJCYAA");
    toast.success("Text Copied", {
    })
  };

  return (
    <div className="shadow-3xl rounded-lg bg-white">
      <div className="bg-black rounded-t-lg text-white text-center flex justify-center space-x-5 p-1 items-center">
        <Text>YIA</Text>
        <img src={ArrowCircle}/>
        <Text>CGK</Text>
      </div>
      <div className="flex justify-between p-3 border-b border-dotted border-gray-100">
        <Text className="text-sm">Your e-ticket is here</Text>
        <Text className="text-sm text-primary-500">See</Text>
      </div>
      <div className="flex justify-between p-3 items-center">
        <Text className="text-sm text-gray-500">Booking code</Text>
        <div className="flex flex-row items-center">
          <Text className="text-sm font-semibold">BHJCYAA</Text>
          <Button
            variant={"link"}
            type="button"
            className="text-primary-500 p-0 pl-2"
            onClick={handleCopyText}
            value="BHJCYAA"
          >
            <Copy size={18} />
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default CodeBooking