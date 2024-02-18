import { cn } from "@/lib/utils";
import { useSearchTicketStore } from "@/store/useSearchTicketStore";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

interface props {
  date: Date;
  lowest_price: string;
}

const DateButton = ({ date, lowest_price }: props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const searchParams = new URLSearchParams(location.search);

  const { isFetchedAfterMount } = useSearchTicketStore();

  const selectedDate = searchParams.get("dep_date");
  const active =
    selectedDate && new Date(selectedDate).getTime() === date.getTime();

  const updateUrlParams = (): void => {
    searchParams.set("dep_date", format(date, "yyyy-MM-dd"));
    navigate(`${location.pathname}?${searchParams.toString()}`);
    queryClient.invalidateQueries({ queryKey: ["searchTicket"] });
  };

  return (
    <button
      className={cn(
        "flex h-full flex-1 flex-col items-center justify-center gap-1",
        active
          ? "border-b-2 border-b-primary-500 bg-primary-50 text-primary-500"
          : "bg-gray-100 text-gray-400",
      )}
      onClick={updateUrlParams}
      disabled={isFetchedAfterMount}
    >
      <div className="text-xs font-semibold">{format(date, "d MMMM")}</div>
      <div className="text-sm font-semibold md:text-base">
        {lowest_price !== "0" ? `IDR ${lowest_price}` : "--,---"}
      </div>
    </button>
  );
};

export default DateButton;
