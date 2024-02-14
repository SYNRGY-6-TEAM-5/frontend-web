import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Text } from "@mantine/core";

import useFilter from "@/lib/hooks/useFilter";

type CardProps = React.ComponentProps<typeof Card>;

type DepartureTimeTabContentProps = CardProps;

const DepartureTimeTabContent: React.FC<DepartureTimeTabContentProps> = () => {
  const { filterDepartureTime, handleFilterDepartureTimeChange } = useFilter();

  return (
    <TabsContent value="departure-time" className="w-full">
      <Card>
        <ul className="flex w-full flex-col items-center justify-between gap-2 px-8">
          <li className="flex w-full items-center justify-center">
            <input
              type="radio"
              id="early"
              name="departure-time-early"
              value="00:00 AM - 06:00 AM"
              className="pz-4 peer hidden h-10 w-full"
              required
              checked={filterDepartureTime === "00:00 AM - 06:00 AM"}
              onChange={handleFilterDepartureTimeChange}
            />
            <label
              htmlFor="early"
              className="inline-flex h-14 w-full cursor-pointer items-center justify-between rounded-md bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <Text className="text-xs font-semibold">Early Morning</Text>
                <Text className="text-xs font-semibold">
                  00:00 AM - 06:00 AM
                </Text>
              </div>
            </label>
          </li>
          <li className="flex w-full items-center justify-center">
            <input
              type="radio"
              id="morning"
              name="departure-time-morning"
              value="06:00 AM - 12:00 PM"
              className="pz-4 peer hidden h-10 w-full"
              required
              checked={filterDepartureTime === "06:00 AM - 12:00 PM"}
              onChange={handleFilterDepartureTimeChange}
            />
            <label
              htmlFor="morning"
              className="inline-flex h-14 w-full cursor-pointer items-center justify-between rounded-md bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <Text className="text-xs font-semibold">Morning</Text>
                <Text className="text-xs font-semibold">
                  06:00 AM - 12:00 PM
                </Text>
              </div>
            </label>
          </li>
          <li className="flex w-full items-center justify-center">
            <input
              type="radio"
              id="evening"
              name="departure-time-evening"
              value="06:00 PM - 00:00 AM"
              className="pz-4 peer hidden h-10 w-full"
              required
              checked={filterDepartureTime === "06:00 PM - 00:00 AM"}
              onChange={handleFilterDepartureTimeChange}
            />
            <label
              htmlFor="evening"
              className="inline-flex h-14 w-full cursor-pointer items-center justify-between rounded-md bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <Text className="text-xs font-semibold">Evening</Text>
                <Text className="text-xs font-semibold">
                  06:00 PM - 00:00 AM
                </Text>
              </div>
            </label>
          </li>
          <li className="flex w-full items-center justify-center">
            <input
              type="radio"
              id="afternoon"
              name="departure-time-afternoon"
              value="12:00 PM - 06:00 PM"
              className="pz-4 peer hidden h-10 w-full"
              required
              checked={filterDepartureTime === "12:00 PM - 06:00 PM"}
              onChange={handleFilterDepartureTimeChange}
            />
            <label
              htmlFor="afternoon"
              className="inline-flex h-14 w-full cursor-pointer items-center justify-between rounded-md bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
            >
              <div className="flex w-full flex-col items-center justify-center gap-1">
                <Text className="text-xs font-semibold">Afternoon</Text>
                <Text className="text-xs font-semibold">
                  12:00 PM - 06:00 PM
                </Text>
              </div>
            </label>
          </li>
        </ul>
      </Card>
    </TabsContent>
  );
};

export default DepartureTimeTabContent;
