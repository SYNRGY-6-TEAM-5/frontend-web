import { Text } from "@mantine/core";
import NoFlight from "@/assets/noflight.png";

const NoFlightOrder = () => {
  return(
    <div className="flex flex-col w-80 m-auto justify-center items-center gap-10">
      <img src={NoFlight} alt="No Active Flight" />
      <div className="flex flex-col gap-3 text-center">
        <Text className="font-medium text-2xl">No Flight</Text>
      </div>
    </div>
  )
}

export default NoFlightOrder