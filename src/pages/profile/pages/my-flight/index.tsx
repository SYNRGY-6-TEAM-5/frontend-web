import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import NoActiveFlight from "./components/NoActiveFlight";
import ActiveOrder from "./components/ActiveOrder";

import { data } from "@/components/particles/BookingData";

const MyFlight = () => {

  if (data !== null) {
    return (
      <section id="order">
        <div className="flex justify-between items-center mb-10">
          <Text>Your Flight</Text>
          <Link to="/" className="text-primary-500">History </Link>
        </div>
        <ActiveOrder BookingUser={data} />
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