import { Image } from "@/components/ui/Image";
import MandiriIcon from "../../../assets/svg/BankMandiri.svg";
import { Button, Input, Text } from "@mantine/core";
import InputCopy from "@/components/ui/input-copy";
import { AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const MethodDetails = () => {
  return (
    <div className="flex flex-col space-y-10">
      <div>
        <div className="flex flex-row mb-4">
          <Image
            className="aspect-square h-6 w-20 md:h-6 md:w-20 lg:h-6 lg:w-20"
            image={MandiriIcon}
            alt="Bank Mandiri"
          />
          <Text>Mandiri Virtual Acount</Text>
        </div>
        <InputCopy
          id="account"
          name="account"
          value="7 800 8291 0221220"
          className="mb-5"/>
        <div className="space-y-4">
          <Text className="font-medium text-base">Total Payment</Text>
          <Input
            disabled
            className="bg-gray-100 rounded-lg text-black font-medium text-sm"
            type="text"
            value="IDR 2,930,900"
          />
          <div className="flex flex-row space-x-1 text-xs">
            <AlertTriangle size={24} className="text-warning-500" />
            <Text className="text-gray-400">Complete the payment and ensure that the amount and recipient are correct</Text>
          </div>
        </div>
      </div>
      <div className="space-y-3 px-4">
        <Text className="font-medium">How To Pay</Text>
        <Accordion type="single" collapsible className="w-full p-2 border rounded-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>Transfer via ATM</AccordionTrigger>
            <AccordionContent>How to Transfer via ATM</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Transfer via Internet Banking</AccordionTrigger>
            <AccordionContent>How to Transfer via Internet Banking</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Transfer via Mobile Banking</AccordionTrigger>
            <AccordionContent>How to Transfer via Mobile Banking</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Text className="text-gray-400 text-xs">Once your payment is verified, your e-ticket and receipt will be sent to registered email address.</Text>
      </div>
      <div className="flex content-end w-full justify-end">
        <Button
          type="button"
          className="h-14 rounded-xl bg-primary-500 w-2/4 py-4 text-white"
        >See Order List</Button>
      </div>
    </div>
  )
}

export default MethodDetails;