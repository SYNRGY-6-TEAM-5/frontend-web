import { Text } from "@mantine/core";

const ImportantInformation = () => {
  return (
    <div className="mt-2">
      <Text className=" w-fit text-base font-medium leading-6">
        Important Information
      </Text>
      <div className="mt-4 rounded-2xl border border-orange-500 px-2 py-4">
        <div className="flex items-start">
          <span className="ml-2 text-xs">&#8226;</span>
          <Text className="ml-2 text-xs">
            To board the plane, you must print your boarding pass, or pick it up
            at the airport check-in counter.
          </Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="ml-2 text-xs">&#8226;</span>
          <Text className="ml-2 text-xs">
            Check-in counters will close 30 minutes before your departure time.
          </Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="ml-2 text-xs">&#8226;</span>
          <Text className="ml-2 text-xs">
            Passengers must check in their baggage at the check-in counter or
            baggage handling counter at the airport within the specified time
            limit.
          </Text>
        </div>
        <div className="mt-2 flex items-start">
          <span className="ml-2 text-xs">&#8226;</span>
          <Text className="ml-2 text-xs">
            Refunds and rescheduling cannot be done after check-in.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ImportantInformation;
