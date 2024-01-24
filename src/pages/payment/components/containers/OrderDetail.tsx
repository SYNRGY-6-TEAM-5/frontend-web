import { Text } from "@mantine/core";
import OrderSummary from "../ui/OrderSummary";
import Rute from "./Rute";

const OrderDetail = () => {
  return(
    <div className="p-4">
      <Text className="text-gray-400 font-normal text-xs mb-6">Order ID: </Text>
      <Rute departure="YIA" departureTime={6.25} desc="non-stop" arrival="CGK" arrivalTime={7.40}/>
      <OrderSummary />
    </div>
  )
}

export default OrderDetail;