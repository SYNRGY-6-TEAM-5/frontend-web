import { Button, Text } from "@mantine/core";
import useTimer from "@/lib/hooks/useTimer";
import OrderIcon from "@/assets/order-icon.png";
import Globe from "@/assets/globe.png";
import { ChevronRight } from "lucide-react";

interface order {
  orderId:number,
  status:string
}

interface orderArr {
  orderActive:order[]
}

const ActiveOrder = ({orderActive} : orderArr) => {
  const date = new Date().getTime();
  const countDownTime = 1000;
  const {seconds, minutes, hours} = useTimer({date, countDownTime});

  const filteredOrder = orderActive.filter(order => order.status !== "expired")
    .map(order => {
      return order
    });

    console.log({filteredOrder})

  return(
    <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1">
      {filteredOrder.map((order, index) => (
        <div key={index} className="space-y-3 p-3 bg-white shadow-3xl h-fit">
          <div className="flex justify-between items-center">
            <Text className="text-xs font-normal text-gray-400">Order ID: {order.orderId}</Text>
            <Text className="bg-gray-100 rounded-3xl px-2 py-1 text-primary-500 text-xs font-medium">Roundtrip</Text>
          </div>
          <div className="pt-3 flex justify-between border-b border-gray-100 items-center">
            <div className="grid gap-1 pb-3">
              <Text className="text-xs font-medium text-gray-600">24 Oct, 09:50</Text>
              <Text className="font-medium text-2xl text-gray-900">YIA</Text>
              <Text className="text-xs font-normal text-gray-500">Yogyakarta</Text>
            </div>
            <div className="flex flex-col self-end">
              <img src={OrderIcon} />
              <img src={Globe} />
            </div>
            <div className=" text-right pb-3">
              <Text className="text-xs font-medium text-gray-600">24 Oct, 09:50</Text>
              <Text className="font-medium text-2xl text-gray-900">YIA</Text>
              <Text className="text-xs font-normal text-gray-500">Yogyakarta</Text>
            </div>
          </div>
          {order.status === "waiting" ? (
          <div className="flex justify-between">
            <Text className="font-medium text-sm">Total</Text>
            <Text className="font-semibold text-primary-500">IDR 2,230,900</Text>
          </div>
          ): ""}
          {order.status === "waiting" ? (
            <Button
              type="button"
              className="w-full h-14 rounded-xl bg-primary-500 py-4 text-white font-medium text-sm"
            >Complete the Payment in {hours}:{minutes}:{seconds}</Button>
          ) : (
            <label
              htmlFor="prices"
              className="group flex items-center justify-between"
            >
              <Text className="text-s font-normal text-primary-500">Your e-ticket is available!</Text>
              <input
                type="button"
                id="prices"
                name="prices"
              />
              <ChevronRight size={20} className="font-base text-primary-500" />
            </label>
          )}
        </div>
      ))}
    </div>
  )
}

export default ActiveOrder;