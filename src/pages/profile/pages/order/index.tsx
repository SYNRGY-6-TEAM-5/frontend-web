import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import NoActiveFlight from "./components/NoActiveFlight";
import ActiveOrder from "./components/ActiveOrder";

const Order = () => {
  const dataOrder = [
    {
      orderId: 12345,
      status: "waiting"
    },
    {
      orderId: 23456,
      status: "active"
    },
    {
      orderId: 54353,
      status: "expired"
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

export default Order