import { Text } from "@mantine/core";
import Timer from "./components/Timer";

const Payment = () => {
  return(
    <>
      <Text className="text-4xl font-semibold uppercase text-black">Payment Page</Text>
      {/* countDownTime(second) : interval, date: tanggal diambil dari backend */}
      <Timer countDownTime={20} date={new Date().getTime()} />
    </>
  )
}

export default Payment;