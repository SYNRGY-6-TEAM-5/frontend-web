import { Button, Text } from "@mantine/core";
import useTimer from "@/lib/hooks/useTimer";
import OrderIcon from "@/assets/order-icon.png";
import Globe from "@/assets/globe.png";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface order {
  orderId:number,
  payment:string,
  checkIn:boolean,
  checkInStatus:string
}

interface orderArr {
  orderActive:order[]
}

const ActiveOrder = ({orderActive} : orderArr) => {
  const date = new Date().getTime();
  const countDownTime = 1000;
  const {seconds, minutes, hours} = useTimer({date, countDownTime});

  const filteredOrder = orderActive.filter(order => order.payment !== "expired")
    .map(order => {
      return order
    });

  const navigate = useNavigate();
  const handleWaiting = (orderId:number) => {
    console.log({orderId});
    navigate('/profile/order/payment/');
  }

  return(
    <div className="grid lg:grid-cols-2 gap-x-8 gap-y-8 grid-cols-1">
      {filteredOrder.map((order, index) => (
        <div key={index} className="space-y-3 p-3 bg-white shadow-3xl h-fit rounded-xl">
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

          {order.payment === "waiting" ? (
          <div className="flex justify-between">
            <Text className="font-medium text-sm">Total</Text>
            <Text className="font-semibold text-primary-500">IDR 2,230,900</Text>
          </div>
          ): ""}

          {order.payment === "waiting" ? (
            <Button
              type="button"
              onClick={() => handleWaiting(order.orderId)}
              className="w-full h-14 rounded-xl bg-primary-500 py-4 text-white font-medium text-sm"
            >Complete the Payment in {hours}:{minutes}:{seconds}</Button>
          ) : order.checkIn === true && order.checkInStatus === "true" ?(
            <>
              <label
                htmlFor="prices"
                className="group flex items-center justify-between bg-success-500 text-white p-[6px] rounded-lg cursor-pointer"
              >
                <Text className="text-sm font-normal ">You can check-in now</Text>
                <input
                  type="button"
                  id="prices"
                  name="prices"
                />
                <ChevronRight size={20} className="font-base" />
              </label>
              <Text className="text-sm font-normal text-primary-500">Your e-ticket is available!</Text>
            </>
          ) : order.checkIn === true && order.checkInStatus === "expired" ?(
            <>
              <label
                htmlFor="prices"
                className="group flex items-center justify-between bg-gray-300 text-gray-500 p-[6px] rounded-lg cursor-not-allowed"
              >
                <Text className="text-sm font-normal ">Time for check in has expired</Text>
                <input
                  type="button"
                  id="prices"
                  name="prices"
                  disabled
                />
                <ChevronRight size={20} className="font-base" />
              </label>
              <Text className="text-sm font-normal text-primary-500">Your e-ticket is available!</Text>
            </>
          ) : order.checkIn === true && order.checkInStatus === "false" ?(
            <>
              <Text className="text-center text-error-500 bg-error-100 rounded px-1 py-[6px]">Can't check in yet</Text>
              <Text className="text-sm font-normal text-primary-500">Your e-ticket is available!</Text>
            </>
          ) : (
            <label
              htmlFor="eTicket"
              className="group flex items-center justify-between text-primary-500 cursor-pointer"
            >
              <Text className="text-sm font-normal">Your e-ticket is available!</Text>
              <input
                type="button"
                id="eTicket"
                name="eTicket"
              />
              <ChevronRight size={20} className="font-base" />
            </label>
          )}
          
        </div>
      ))}
    </div>
  )
}

export default ActiveOrder;