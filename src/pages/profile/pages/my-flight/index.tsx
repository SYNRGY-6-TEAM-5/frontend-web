import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import NoActiveFlight from "./components/NoActiveFlight";
import ActiveOrder from "./components/ActiveOrder";

const MyFlight = () => {
  // payment apakah sudah dibayar atau belum atau sudah expired
  // checkIn apakah maskapai menyediakan check in lewat web atau tidak
  // checkInStatus apakah check in sudah dapat dilakukan atau belum atau apakah sudah expired 
  const dataOrder = [
    {
      orderId: 12345,
      payment: "waiting",
      checkIn: false,
      checkInStatus: "false"
    },
    {
      orderId: 23456,
      payment: "success",
      checkIn: false,
      checkInStatus: "false"
    },
    {
      orderId: 34567,
      payment: "expired",
      checkIn: false,
      checkInStatus: "false"
    },
    {
      orderId: 45678,
      payment: "success",
      checkIn: true,
      checkInStatus: "true"
    },
    {
      orderId: 45678,
      payment: "success",
      checkIn: true,
      checkInStatus: "false"
    },
    {
      orderId: 45678,
      payment: "success",
      checkIn: true,
      checkInStatus: "expired"
    }
  ];

  if (dataOrder !== null) {
    return (
      <section id="order">
        <div className="flex justify-between items-center mb-10">
          <Text>Your Flight</Text>
          <Link to="/" className="text-primary-500">History </Link>
        </div>
        <ActiveOrder orderActive={dataOrder} />
      </section>
    )
  } else {
    return (
      <section id="order">
        <NoActiveFlight />
      </section>
    )
  }
}

export default MyFlight