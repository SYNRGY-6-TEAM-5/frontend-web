import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import NoActiveFlight from "./components/NoActiveFlight";
import ActiveOrder from "./components/ActiveOrder";
import { useGetUserBooking } from "@/lib/hooks/useProfileBooking";
import LoadingBooking from "./components/containers/LoadingBooking";

const MyFlight = () => {
  const { data, isFetching } = useGetUserBooking();

  return (
    <section id="order" className="mb-8">
      {isFetching ? (
        <LoadingBooking />
      ) : !!data && data.length > 0 ? (
        <>
          <div className="mb-10 flex items-center justify-between">
            <Text>Your Flight</Text>
            <Link to="/" className="text-primary-500">
              History{" "}
            </Link>
          </div>
          <ActiveOrder BookingUser={data} />
        </>
      ) : (
        <NoActiveFlight />
      )}
    </section>
  );
};

export default MyFlight;
