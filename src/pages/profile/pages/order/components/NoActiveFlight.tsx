import { Text } from "@mantine/core";
import NoFlight from "@/assets/noflight.png";

const NoActiveFlight = () => {
  return(
    <div className="flex flex-col w-80 m-auto justify-center items-center gap-10">
      <img src={NoFlight} alt="No Active Flight" />
      <div className="flex flex-col gap-3 text-center">
        <Text className="font-medium text-2xl">No Active Flight</Text>
        <Text className="text-xs font-normal">You can see all your e-tickets from previous orders on this page. Let’s plan your unforgettable trip with us!</Text>
      </div>
    </div>
  )
}

export default NoActiveFlight