import { addDays, subDays } from "date-fns";
import DateButton from "./ui/DateButton";
import { useLocation } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";

interface props {
  tripType: string;
}

const DatePrice = ({ tripType }: props) => {
  const location = useLocation();
  const { cart } = useCartStore();
  const searchParams = new URLSearchParams(location.search);

  const selectedDepartureDate = searchParams.get("dep_date");
  const selectedReturnDate = searchParams.get("ret_date");

  const departDateRange = Array.from({ length: 7 }, (_, index) => {
    const daysOffset = index - 3;
    const date =
      daysOffset < 0
        ? subDays(selectedDepartureDate!, Math.abs(daysOffset))
        : addDays(selectedDepartureDate!, daysOffset);
    return date;
  });

  const returnDateRange = Array.from({ length: 7 }, (_, index) => {
    const daysOffset = index - 3;
    const date =
      daysOffset < 0
        ? subDays(selectedReturnDate!, Math.abs(daysOffset))
        : addDays(selectedReturnDate!, daysOffset);
    return date;
  });

  return (
    <div className="relative mt-10 px-6 md:px-9 lg:px-20 ">
      <section className="flex h-[66px] w-full flex-row items-center justify-between overflow-x-hidden rounded-[8px] bg-gray-100 text-white ">
        {tripType === "one-way" ? (
          <>
            {departDateRange.map((data, index) => (
              <DateButton key={index} date={data} />
            ))}
          </>
        ) : (
          <>
            {cart.length === 0 && (
              <>
                {departDateRange.map((data, index) => (
                  <DateButton key={index} date={data} />
                ))}
              </>
            )}
            {cart.length === 1 && (
              <>
                {returnDateRange.map((data, index) => (
                  <DateButton key={index} date={data} />
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
