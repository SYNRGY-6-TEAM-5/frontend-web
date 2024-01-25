import { addDays, subDays } from "date-fns";
import DateButton from "./ui/DateButton";
import { useLocation } from "react-router-dom";

const DatePrice = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const selectedDate = searchParams.get("date");

  const dateRange = Array.from({ length: 7 }, (_, index) => {
    const daysOffset = index - 3;
    const date = daysOffset < 0 ? subDays(selectedDate!, Math.abs(daysOffset)) : addDays(selectedDate!, daysOffset);
    return date;
  });


  return (
    <div className="relative mt-10 px-6 md:px-9 lg:px-20 ">
      <section className="flex h-[66px] w-full flex-row items-center justify-between overflow-x-hidden rounded-[8px] bg-gray-100 text-white ">
        {dateRange.map((data, index) => (
          <DateButton key={index} date={data} />
        ))}
      </section>
    </div>
  );
};

export default DatePrice;
