import { Text } from "@mantine/core";
import { Image } from "@/components/ui/Image";
import { useState } from "react";
import { Bca, BankMandiri, Ocbc, MasterCard } from "@/assets/svg";

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
  {
    image_logo: MasterCard,
    title: "Master Card",
    value: "debit",
  },
];

const PaymentMethod = ({runTimer}:{runTimer:boolean}) => {
  const [check, setCheck] = useState<string>();
  const handleOnChange = async (method:string) => { 
    setCheck(method);
    localStorage.setItem("bankMethod", method);
  }
  
  console.log({check});

  return(
    <div className="grid gap-4">
      <Text>Payment Method</Text>
      <div className="grid gap-4">
        {methodData.map((method, index) => (
          <label
            key={index}
            htmlFor={String(index)}
            className="group flex items-center border border-gray-200 rounded-2xl p-3 text-gray-300 hover:border-primary-200 hover:text-primary-200 has-[:checked]:border-gray-200 has-[:checked]:text-black"
          >
            <Image
              className="aspect-square h-6 w-20 md:h-6 md:w-20 lg:h-6 lg:w-20"
              image={method.image_logo}
              alt={method.title}
            />
            <Text className="ml-2 grow">{method.title}</Text>
            <input
              onChange={() => {
                handleOnChange(method.value);
              }}
              type="radio"
              id={String(index)}
              className="checked:accent-primary-500"
              name="paymentMethod"
              value={method.value}
              disabled={!runTimer}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export default PaymentMethod;