import { differenceInMinutes, format } from "date-fns";
import ArrowCircle from "../../../../assets/ArrowCircleRight.png";
interface PlaneRoute {
  departure:string,
  departureTime:string,
  desc:string,
  arrival:string,
  arrivalTime:string
}
const Rute = ({departure, departureTime, desc, arrival, arrivalTime}:PlaneRoute) => {

  const formattedTime = (timeString: string) => {
    const date = new Date(timeString);
    const formatted = format(date, 'hh:mm a');
  
    return formatted;
  };

  const timeDifference = (depart: string, arrive: string) => {
    const startDate = new Date(depart);
    const endDate = new Date(arrive);

    const differenceInMinutesValue = differenceInMinutes(endDate, startDate);

    const hours = Math.floor(differenceInMinutesValue / 60);
    const minutes = differenceInMinutesValue % 60;

    const formattedDifference = format(
      new Date(0, 0, 0, hours, minutes),
      "H'h' m'm'",
    );

    return formattedDifference;
  };

  const timeData = {
    departureTime: formattedTime(departureTime),
    arrivalTime: formattedTime(arrivalTime),
    timeTravel: timeDifference(departureTime, arrivalTime)
  };

  return(
    <div className="flex items-center justify-between rounded-[16px] bg-[#111] p-3 ">
      <div className="text-white">
        <div className="text-3xl font-semibold">{departure}</div>
        <div className="text-[14px] font-medium text-[#B9C0D4]">
          {timeData.departureTime}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="text-sm">
          {timeData.timeTravel}
        </div>
        <div>
          <img src={ArrowCircle} alt="" />
        </div>
        <div className="rounded-full bg-white px-2 py-1 text-xs  font-medium text-black">
          {desc}
        </div>
      </div>
      <div className="text-white">
        <div className="text-3xl font-semibold">{arrival}</div>
        <div className="text-[14px] font-medium text-[#B9C0D4]">
          {timeData.arrivalTime}
        </div>
      </div>
    </div>
  )
}

export default Rute;