import useTimer from "@/lib/hooks/useTimer";
import { Button, Text } from "@mantine/core"
import { useNavigate } from "react-router-dom";

const WaitingBtn = ({expiredTime, orderId, total}:{expiredTime:string, orderId:number, total:string}) => {
  const expiredSecond = new Date(expiredTime).getTime();
  const date = new Date().getTime();
  const countDownTime = expiredSecond - date;
  const { seconds, minutes, hours} = useTimer({date, countDownTime});

  const navigate = useNavigate();
  const handleWaiting = (orderId:number) => {
    console.log({orderId});
    navigate('/profile/payment/', {
      state: {
        orderId: orderId,
      }
    });
  }

  if(seconds === "00" && minutes === "00" && hours ==="00") {
    return(
      <>
        <div className="flex justify-between">
          <Text className="font-medium text-sm">Total</Text>
          <Text className="font-semibold text-primary-500">IDR {total}</Text>
        </div>
        <Button
          type="button"
          className="w-full h-14 rounded-xl bg-gray-300 py-4 text-white font-medium text-sm"
          disabled
        >Complete the Payment in {hours}:{minutes}:{seconds}</Button>
      </>
    )
  } else {

    return(
      <>
        <div className="flex justify-between">
          <Text className="font-medium text-sm">Total</Text>
          <Text className="font-semibold text-primary-500">IDR {total}</Text>
        </div>
        <Button
          type="button"
          onClick={() => handleWaiting(orderId)}
          className="w-full h-14 rounded-xl bg-primary-500 py-4 text-white font-medium text-sm"
        >Complete the Payment in {hours}:{minutes}:{seconds}</Button>
      </>
    )
  }
}

export default WaitingBtn