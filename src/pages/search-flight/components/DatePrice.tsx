import { addDays, subDays } from "date-fns";
import DateButton from "./ui/DateButton";
import { useLocation } from "react-router-dom";

const DatePrice = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedDepartureDate = searchParams.get("dep_date");
  const selectedReturnDate = searchParams.get("ret_date");

  console.log(selectedDepartureDate);
  console.log(selectedReturnDate);

  const departDateRange = Array.from({ length: 7 }, (_, index) => {
    const daysOffset = index - 3;
    const date = daysOffset < 0 ? subDays(selectedDepartureDate!, Math.abs(daysOffset)) : addDays(selectedDepartureDate!, daysOffset);
    return date;
  });

  const returnDateRange = Array.from({ length: 7 }, (_, index) => {
    const daysOffset = index - 3;
    const date = daysOffset < 0 ? subDays(selectedReturnDate!, Math.abs(daysOffset)) : addDays(selectedReturnDate!, daysOffset);
    return date;
  });

  console.log(departDateRange);
  console.log(returnDateRange);

  return (
    <div className="relative mt-10 px-6 md:px-9 lg:px-20 ">
      <section className="flex h-[66px] w-full flex-row items-center justify-between overflow-x-hidden rounded-[8px] bg-gray-100 text-white ">
        {departDateRange.map((data, index) => (
          <DateButton key={index} date={data} />
        ))}
      </section>
    </div>
  );
};

export default DatePrice;
