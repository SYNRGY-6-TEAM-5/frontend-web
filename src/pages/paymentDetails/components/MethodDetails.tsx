import { Image } from "@/components/ui/Image";
import { Button, Input, Text } from "@mantine/core";
import InputCopy from "@/components/ui/input-copy";
import { AlertTriangle, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BankTexts } from "@/components/particles/DataLists";
import { BankMandiri, Bca, Ocbc } from "@/assets/svg";

const methodData = [
  {
    image_logo: BankMandiri,
    title: "Mandiri Virtual Acount",
    value: "mandiri",
  },
  {
    image_logo: Ocbc,
    title: "OCB Virtual Acount",
    value: "ocbc",
  },
  {
    image_logo: Bca,
    title: "BCA Virtual Acount",
    value: "bca",
  },
];

const MethodDetails = ({bankMethod}:{bankMethod:string}) => {

  const filteredData = methodData.filter(data => data.value === bankMethod)
    .map(dataBank => {
      return dataBank;
    });
  const filteredMethod = BankTexts.filter(banks => banks.value === bankMethod)
    .map(filteredBank => {
      return filteredBank
    });

  return (
    <div className="flex flex-col space-y-10">
      <div>
        <div className="flex flex-row mb-4"> 
          <Image
            className="aspect-square h-6 w-20 md:h-6 md:w-20 lg:h-6 lg:w-20"
            image={filteredData[0].image_logo}
            alt={filteredData[0].title}
          />
          <Text>{filteredData[0].title}</Text>
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
      <div className="space-y-3 px-4 text-base">
        <Text className="font-medium">How To Pay</Text>
        <Accordion type="single" collapsible className="w-full p-2 border rounded-lg text-sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>Transfer via ATM</AccordionTrigger>
            <AccordionContent className="grid gap-2">
              {filteredMethod[0].atm.map((atmMethod, i) => (
                <div className="flex gap-x-3 items-center" key={i}>
                  <Check size={10}/>
                  <Text className="text-sm">{atmMethod}</Text>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Transfer via Internet Banking</AccordionTrigger>
            <AccordionContent className="grid gap-2">
              {filteredMethod[0].internet.map((internetMethod, i) => (
                <div className="flex gap-x-3 items-center" key={i}>
                  <Check size={10}/>
                  <Text className="text-sm">{internetMethod}</Text>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Transfer via Mobile Banking</AccordionTrigger>
            <AccordionContent className="grid gap-2">
              {filteredMethod[0].mobile.map((mobileMethod, i) => (
                <div className="flex gap-x-3 items-center" key={i}>
                  <Check size={10}/>
                  <Text className="text-sm">{mobileMethod}</Text>
                </div>
              ))}
            </AccordionContent>
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