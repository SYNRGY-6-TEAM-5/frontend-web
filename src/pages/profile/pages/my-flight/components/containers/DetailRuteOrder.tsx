import ArrowCircle from "@/assets/ArrowCircleRight.png";
import { GarudaLogo } from "@/assets/svg";
import DetailRuteBtn from "../ui/DetailRuteBtn";
import { Text } from "@mantine/core";

const DetailRuteOrder = () => {
  return(
    <div className="shadow-3xl rounded-lg bg-white">
      <div className="bg-black rounded-t-lg text-white text-center flex justify-center space-x-5 p-1 items-center">
        <Text>YIA</Text>
        <img src={ArrowCircle}/>
        <Text>CGK</Text>
      </div>
      <div>
        <div className="p-3 space-y-3 border-t border-dashed border-gray-300">
          <div className="flex justify-between text-base font-medium">
            <Text className="text-primary-500">Depart</Text>
            <div className="flex flex-row items-center">
              <GarudaLogo className="h-2" />
              <Text>GA207</Text>
            </div>
          </div>
          <div className="flex justify-between font-medium">
            <Text className="text-lg ">Fri, 19 Jan 2024</Text>
            <Text className="text-gray-500 text-sm">06:25 AM</Text>
          </div>
          <DetailRuteBtn />
        </div>
        <div className="p-3 space-y-3 border-t border-dashed border-gray-300">
          <div className="flex justify-between text-base font-medium">
            <Text className="text-primary-500">Return</Text>
            <div className="flex flex-row items-center">
              <GarudaLogo className="h-2" />
              <Text>GA207</Text>
            </div>
          </div>
          <div className="flex justify-between font-medium">
            <Text className="text-lg">Fri, 19 Jan 2024</Text>
            <Text className="text-gray-500 text-sm">06:25 AM</Text>
          </div>
          <DetailRuteBtn />
        </div>
        
      </div>
    </div>
  )
}

export default DetailRuteOrder