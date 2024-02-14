import {
  ChartSuccess,
  MoneyRemove,
  MoneySend,
  RepeateMusic,
} from "@/assets/svg";
import { Text } from "@mantine/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoFlightOrder from "./components/NoFlightOrder";
import OrderPage from "./components/OrderPage";
import { useGetUserBooking } from "@/lib/hooks/useProfileBooking";
import { useEffect, useState } from "react";
import { BookingUser } from "@/types/BookingUser";
import SkeletonOrder from "./components/SkeletonOrder";

interface DataState {
  wait: BookingUser[];
  cancel: BookingUser[];
  process: BookingUser[];
  complete: BookingUser[];
}

const Order = () => {
  const [dataState, setDataState] = useState<DataState>({
    wait: [],
    cancel: [],
    process: [],
    complete: [],
  });

  const { data, isFetching } = useGetUserBooking();

  useEffect(() => {
    if (data) {
      const filteredData = data.reduce(
        (acc: DataState, cur) => {
          if (cur.status === "PENDING") {
            acc.wait.push(cur);
          } else if (cur.status === "FAILED") {
            acc.cancel.push(cur);
          } else {
            const departureTime = new Date(
              cur.tickets[0].flight.arrival.scheduled_time,
            ).getTime();
            if (departureTime > new Date().getTime()) {
              acc.process.push(cur);
            } else {
              acc.complete.push(cur);
            }
          }
          return acc;
        },
        { wait: [], cancel: [], process: [], complete: [] },
      );

      setDataState(filteredData);
    }
  }, [data]);

  return (
    <section id="flightOrder">
      {isFetching ? (
        <SkeletonOrder />
      ) : (
        <Tabs defaultValue="1">
          <TabsList className=" md:grid-flows-4 mb-10 grid h-fit rounded-t-xl bg-white p-0 shadow-3xl md:w-full lg:grid-cols-4">
            <TabsTrigger
              value="1"
              className="flex flex-row justify-between border-b border-r border-gray-200 bg-white px-2 py-4 text-black data-[state=active]:text-white md:w-full"
            >
              <div className="flex flex-row gap-1 ">
                <MoneySend />
                <Text className="text-sm font-normal ">Awaiting Payment</Text>
              </div>
              <Text className="rounded-full bg-primary-500 px-2 py-[2px] text-xs text-white">
                {dataState.wait.length}
              </Text>
            </TabsTrigger>
            <TabsTrigger
              value="2"
              className="flex flex-row justify-between border-b border-r border-gray-200 bg-white px-2 py-4 text-black data-[state=active]:text-white md:w-full"
            >
              <div className="flex flex-row gap-1 ">
                <RepeateMusic />
                <Text className="text-sm font-normal">Processing</Text>
              </div>
              <Text className="rounded-full bg-primary-500 px-2 py-[2px] text-xs text-white">
                {dataState.process.length}
              </Text>
            </TabsTrigger>
            <TabsTrigger
              value="3"
              className="flex flex-row justify-between border-b border-r border-gray-200 bg-white px-2 py-4 text-black data-[state=active]:text-white md:w-full"
            >
              <div className="flex flex-row gap-1 ">
                <ChartSuccess />
                <Text className="text-sm font-normal">Completed</Text>
              </div>
              <Text className="rounded-full bg-primary-500 px-2 py-[2px] text-xs text-white">
                {dataState.complete.length}
              </Text>
            </TabsTrigger>
            <TabsTrigger
              value="4"
              className="flex flex-row justify-between border-b border-gray-200 bg-white px-2 py-4 text-black data-[state=active]:text-white md:w-full"
            >
              <div className="flex flex-row gap-1 ">
                <MoneyRemove />
                <Text className="text-sm font-normal">Canceled</Text>
              </div>
              <Text className="rounded-full bg-primary-500 px-2 py-[2px] text-xs text-white">
                {dataState.cancel.length}
              </Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            {dataState.wait.length > 0 ? (
              <OrderPage order={dataState.wait} status={"waiting"} />
            ) : (
              <NoFlightOrder />
            )}
          </TabsContent>
          <TabsContent value="2">
            {dataState.process.length > 0 ? (
              <OrderPage order={dataState.process} status={"processing"} />
            ) : (
              <NoFlightOrder />
            )}
          </TabsContent>
          <TabsContent value="3">
            {dataState.complete.length > 0 ? (
              <OrderPage order={dataState.complete} status={"completed"} />
            ) : (
              <NoFlightOrder />
            )}
          </TabsContent>
          <TabsContent value="4">
            {dataState.cancel.length > 0 ? (
              <OrderPage order={dataState.cancel} status={"canceled"} />
            ) : (
              <NoFlightOrder />
            )}
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
};

export default Order;
