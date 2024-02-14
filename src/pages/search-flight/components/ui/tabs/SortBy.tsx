import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Text } from "@mantine/core";

import useFilter from "@/lib/hooks/useFilter";

type CardProps = React.ComponentProps<typeof Card>;

type SortByTabContentProps = CardProps;

const SortByTabContent: React.FC<SortByTabContentProps> = () => {
  const { filterSort, handleFilterSortChange } = useFilter();

  return (
    <TabsContent value="sort-by" className="w-full">
      <Card>
        <ul className="flex w-full flex-col items-center justify-center gap-2 px-8">
          <li className="flex w-full items-center justify-center">
            <input
              type="radio"
              id="cheapest"
              name="sort-cheapest"
              value="Cheapest"
              className="pz-4 peer hidden h-10 w-full"
              required
              checked={filterSort === "Cheapest"}
              onChange={handleFilterSortChange}
            />
            <label
              htmlFor="cheapest"
              className="inline-flex h-14 w-full cursor-pointer items-center justify-between rounded-md bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
            >
              <div className="flex w-full items-center justify-center">
                <Text className="text-xs font-semibold">Cheapest</Text>
              </div>
            </label>
          </li>
          <li className="flex w-full items-center justify-center">
            <input
              type="radio"
              id="fastest"
              name="sort-fastest"
              value="Fastest"
              className="pz-4 peer hidden h-10 w-full"
              required
              checked={filterSort === "Fastest"}
              onChange={handleFilterSortChange}
            />
            <label
              htmlFor="fastest"
              className="inline-flex h-14 w-full cursor-pointer items-center justify-between rounded-md bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
            >
              <div className="flex w-full items-center justify-center">
                <Text className="text-xs font-semibold">Fastest</Text>
              </div>
            </label>
          </li>
          <li className="flex w-full items-center justify-center">
            <input
              type="radio"
              id="earliest"
              name="sort-earliest"
              value="Earliest"
              className="pz-4 peer hidden h-10 w-full"
              required
              checked={filterSort === "Earliest"}
              onChange={handleFilterSortChange}
            />
            <label
              htmlFor="earliest"
              className="inline-flex h-14 w-full cursor-pointer items-center justify-between rounded-md bg-slate-100 p-2 text-zinc-900 hover:bg-primary-200 hover:text-white peer-checked:bg-primary-500 peer-checked:text-white"
            >
              <div className="flex w-full items-center justify-center">
                <Text className="text-xs font-semibold">Earliest</Text>
              </div>
            </label>
          </li>
        </ul>
      </Card>
    </TabsContent>
  );
};

export default SortByTabContent;