import { Text } from "@mantine/core";
import Pregnant from "../../../assets/pregnant.png";
import Baby from "../../../assets/baby.png";
import Stroller from "../../../assets/stroller.png";

const PassengerRequirements = () => {
  return (
    <div className="mt-9">
      <Text className=" w-fit text-base font-medium leading-6">
        Passenger Requirements
      </Text>
      <div className="mt-8 flex flex-row justify-between">
        <img src={Pregnant} alt="" />
        <Text className="max-w-[290px] text-xs">
          Pregnant passengers must check in directly at the airport.
        </Text>
      </div>
      <hr className=" mt-4 border-gray-200" />
      <div className="mt-4 flex flex-row items-center justify-between">
        <img src={Stroller} alt="" />
        <Text className="max-w-[290px] text-xs">
          Passengers with special needs (such as disabled passengers,
          Unaccompanied Minors) must check-in directly at the airport.
        </Text>
      </div>
      <hr className=" mt-4 border-gray-200" />
      <div className="mt-4 flex flex-row items-center justify-between">
        <img src={Baby} alt="" />
        <Text className="max-w-[290px] text-xs">
          Infant passengers can check-in online, but must still report to the
          airport check-in counter before boarding the plane.
        </Text>
      </div>
      <hr className=" mt-4 border-gray-200" />
    </div>
  );
};

export default PassengerRequirements;
