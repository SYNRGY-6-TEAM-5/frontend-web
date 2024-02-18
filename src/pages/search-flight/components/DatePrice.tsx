import { addDays, isSameDay, subDays } from "date-fns";
import DateButton from "./ui/DateButton";
import { useLocation } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import {
  FlightSearchParams,
  LowestFare,
  useFetchLowestFare,
} from "@/lib/hooks/useSearchTicket";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface props {
  tripType: string;
}

const DatePrice = ({ tripType }: props) => {
  const location = useLocation();
  const { cart } = useCartStore();
  const searchParams = new URLSearchParams(location.search);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const range = isDesktop ? 7 : 3
  const sideRange = isDesktop ? 3 : 1

  const selectedDepartureDate = searchParams.get("dep_date");
  const selectedReturnDate = searchParams.get("ret_date");

  const paramsData: FlightSearchParams = {
    departure_airport: searchParams.get("origin") || "",
    arrival_airport: searchParams.get("destination") || "",
  };

  const returnParamsData: FlightSearchParams = {
    departure_airport: searchParams.get("destination") || "",
    arrival_airport: searchParams.get("origin") || "",
  };

  const { data: depLowFareData } = useFetchLowestFare(paramsData);
  const { data: retLowFareData } = useFetchLowestFare(returnParamsData);

  const departDateRange = Array.from({ length: range }, (_, index) => {
    const daysOffset = index - sideRange;
    const date =
      daysOffset < 0
        ? subDays(selectedDepartureDate!, Math.abs(daysOffset))
        : addDays(selectedDepartureDate!, daysOffset);
    return date;
  });

  const returnDateRange = Array.from({ length: range }, (_, index) => {
    const daysOffset = index - sideRange;
    const date =
      daysOffset < 0
        ? subDays(selectedReturnDate!, Math.abs(daysOffset))
        : addDays(selectedReturnDate!, daysOffset);
    return date;
  });

  if (!depLowFareData) {
    return <div>Loading...</div>;
  }

  const updatedDepartDateRange: LowestFare[] = departDateRange.map((date) => {
    const matchingObj = depLowFareData.find((obj) =>
      isSameDay(new Date(obj.scheduled_time), date),
    );
    return {
      scheduled_time: date.toISOString(),
      lowest_fare: matchingObj ? matchingObj.lowest_fare : 0,
    };
  });

  if (!retLowFareData) {
    return (
      <div className="relative mt-10 max-h-24 px-6 md:px-9 lg:px-20 ">
        <div>Loading...</div>
      </div>
    );
  }

  const updatedReturnDateRange: LowestFare[] = returnDateRange.map((date) => {
    const matchingObj = retLowFareData.find((obj) =>
      isSameDay(new Date(obj.scheduled_time), date),
    );
    return {
      scheduled_time: date.toISOString(),
      lowest_fare: matchingObj ? matchingObj.lowest_fare : 0,
    };
  });

  return (
    <div className="relative mt-10 max-h-24 px-6 md:px-9 lg:px-20 ">
      <section className="flex h-[66px] w-full flex-row items-center justify-between overflow-x-auto md:overflow-x-hidden rounded-[8px] bg-gray-100 text-white ">
        {tripType === "one-way" ? (
          <>
            {updatedDepartDateRange.map((data, index) => (
              <DateButton
                key={index}
                date={new Date(data.scheduled_time)}
                lowest_price={data.lowest_fare.toLocaleString()}
              />
            ))}
          </>
        ) : (
          <>
            {cart.length === 0 && (
              <>
                {updatedDepartDateRange.map((data, index) => (
                  <DateButton
                    key={index}
                    date={new Date(data.scheduled_time)}
                    lowest_price={data.lowest_fare.toLocaleString()}
                  />
                ))}
              </>
            )}
            {cart.length === 1 && (
              <>
                {updatedReturnDateRange.map((data, index) => (
                  <DateButton
                    key={index}
                    date={new Date(data.scheduled_time)}
                    lowest_price={data.lowest_fare.toLocaleString()}
                  />
                ))}
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default DatePrice;
