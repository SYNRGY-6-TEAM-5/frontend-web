import ArrowCircle from "../../../../assets/ArrowCircleRight.png";
interface PlaneRoute {
  departure:string,
  departureTime:number,
  desc:string,
  arrival:string,
  arrivalTime:number
}
const Rute = ({departure, departureTime, desc, arrival, arrivalTime}:PlaneRoute) => {
  // const timeTravel = arrivalTime - departureTime;
  return(
    <div className="flex items-center justify-between rounded-[16px] bg-[#111] p-3 ">
      <div className="text-white">
        <div className="text-3xl font-semibold">{departure}</div>
        <div className="text-[14px] font-medium text-[#B9C0D4]">
          0{departureTime} AM
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white">
        <div className="text-sm">
          {/* {timeTravel} */}
          1h 2m
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
          0{arrivalTime} AM
        </div>
      </div>
    </div>
  )
}

export default Rute;