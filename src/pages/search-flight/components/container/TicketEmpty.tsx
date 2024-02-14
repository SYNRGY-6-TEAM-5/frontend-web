import { Text } from "@mantine/core";
import { useLocation } from "react-router-dom";
import ArrowCircle from "../../../../assets/arrowCircle.png";
import { format } from "date-fns";

const TicketEmpty = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const paramsData: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    paramsData[key] = value;
  });

  return (
    <div className="mx-auto my-24 w-fit">
      <Text className="max-w-[807px] text-center text-4xl font-medium">
        Flight are not available on{" "}
        {`${format(paramsData.dep_date!, "dd MMMM yyyy")}`}, please select the
        nearest date.
      </Text>
      <div className="mx-auto mt-16 flex max-w-[351px] flex-col justify-center">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-[36px] font-bold text-black">
              {paramsData.origin}
            </div>
            <div className="text-[16px] font-medium text-gray-300">
            {paramsData.o_city}
            </div>
          </div>
          <div className="mx-6">
            <img src={ArrowCircle} alt="" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-[36px] font-bold text-black">
              {paramsData.destination}
            </div>
            <div className="text-[16px] font-medium text-gray-300">{paramsData.d_city}</div>
          </div>
        </div>
        <Text className="mt-8 text-center">
          The selected flight date may not have any available flights.
          Alternatively, you can choose flights on other dates below.
        </Text>
      </div>
    </div>
  );
};

export default TicketEmpty;
