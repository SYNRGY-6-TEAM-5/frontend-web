import { Text } from "@mantine/core";
import ArrowCircle from "../../../../assets/ArrowCircleRight.png";
import { ChevronRight } from "lucide-react";

const OrderDetail = () => {
  return(
    <div className="p-4">
      <Text className="text-gray-400 font-normal text-xs mb-6">Order ID: </Text>
      <div className="flex items-center justify-between rounded-[16px] bg-[#111] p-3 ">
        <div className="text-white">
          <div className="text-3xl font-semibold">YIA</div>
          <div className="text-[14px] font-medium text-[#B9C0D4]">
            06:25 AM
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-white">
          <div className="text-sm">1h 2m</div>
          <div>
            <img src={ArrowCircle} alt="" />
          </div>
          <div className="rounded-full bg-white px-2 py-1 text-xs  font-medium text-black">
            non-stop
          </div>
        </div>
        <div className="text-white">
          <div className="text-3xl font-semibold">CGK</div>
          <div className="text-[14px] font-medium text-[#B9C0D4]">
            07:40 AM
          </div>
        </div>
      </div>
      <label
        htmlFor="details"
        className="group flex mt-3 items-center hover:text-primary-200"
      >
        <Text className="grow text-sm">Details</Text>
        <input
          type="button"
          id="details"
          name="details"
        />
        <ChevronRight size={20} className="font-base text-primary-500" />
      </label>
    </div>
  )
}

export default OrderDetail;