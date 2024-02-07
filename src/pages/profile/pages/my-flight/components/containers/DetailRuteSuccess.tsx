import { Text } from "@mantine/core";
import Line from "@/assets/Line26.png";

const DetailRuteSuccess = () => {
  return(
    <div className="grid grid-flow-col gap-4">
      <div className="px-4 py-3 space-y-6 shadow-3xl rounded-lg bg-white">
        <div className="pb-3 border-b border-gray-100">
          <Text>Depart</Text>
        </div>
        <div className="flex justify-between text-base font-normal">
          <Text><span className="text-primary-500 font-medium">Depart </span>Tue, 4 Jan 2024 </Text>
          <Text className="text-gray-500 text-xs font-medium px-2 bg-gray-100 rounded-3xl py-1">Non-stop</Text>
        </div>
        <div className="grid grid-cols-4 h-fit w-fit mx-auto">
          <div className="text-right space-y-1 self-start">
              <Text className="font-semibold text-2xl">YIA</Text>
              <Text className="text-sm font-medium text-gray-300">06:25 AM</Text>
          </div>
          <div className="row-span-3 flex justify-center self-center py-3"> <img src={Line} width={3} /> </div>
          <div className="text-left space-y-1 col-span-2 self-start">
              <Text className="text-sm font-medium">Yogyakarta Kulon Progo</Text>
              <Text className="text-xs font-normal">Terminal 1 Domestic</Text>
          </div>
          <Text className="self-center font-medium col-span-2">1h 33m</Text>
          <div className="text-right space-y-1 self-end">
              <Text className="font-semibold text-2xl">CGK</Text>
              <Text className="text-sm font-medium text-gray-300">07:40 AM</Text>
          </div>
          <div className="text-left space-y-1 col-span-2 self-end ">
              <Text className="text-sm font-medium">Soekarno Hatta</Text>
              <Text className="text-xs font-normal">Terminal 3 Domestic</Text>
          </div>
        </div>
        <Text className="text-base font-normal"><span className="text-primary-500 font-medium">Arrived </span>Tue, 4 Jan 2024 </Text>
      </div>
      <div className="px-4 space-y-6 shadow-3xl rounded-lg bg-white">
        <div className="py-3 border-b border-gray-100">
          <Text>Return</Text>
        </div>
        <div className="flex justify-between text-base font-normal">
          <Text><span className="text-primary-500 font-medium">Depart </span>Tue, 4 Jan 2024 </Text>
          <Text className="text-gray-500 text-xs font-medium px-2 bg-gray-100 rounded-3xl py-1">Non-stop</Text>
        </div>
        <div className="grid grid-cols-4 h-fit w-fit mx-auto">
          <div className="text-right space-y-1 self-start">
              <Text className="font-semibold text-2xl">YIA</Text>
              <Text className="text-sm font-medium text-gray-300">06:25 AM</Text>
          </div>
          <div className="row-span-3 flex justify-center self-center py-3"> <img src={Line} width={3} /> </div>
          <div className="text-left space-y-1 col-span-2 self-start">
              <Text className="text-sm font-medium">Yogyakarta Kulon Progo</Text>
              <Text className="text-xs font-normal">Terminal 1 Domestic</Text>
          </div>
          <Text className="self-center font-medium col-span-2">1h 33m</Text>
          <div className="text-right space-y-1 self-end">
              <Text className="font-semibold text-2xl">CGK</Text>
              <Text className="text-sm font-medium text-gray-300">07:40 AM</Text>
          </div>
          <div className="text-left space-y-1 col-span-2 self-end ">
              <Text className="text-sm font-medium">Soekarno Hatta</Text>
              <Text className="text-xs font-normal">Terminal 3 Domestic</Text>
          </div>
        </div>
        <Text className="text-base font-normal"><span className="text-primary-500 font-medium">Arrived </span>Tue, 4 Jan 2024 </Text>
      </div>
    </div>
  )
}

export default DetailRuteSuccess