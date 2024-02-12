import {
  ChartSuccess,
  MoneyRemove,
  MoneySend,
  RepeateMusic,
} from "@/assets/svg";
import { Text } from "@mantine/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data } from "@/components/particles/BookingData";
import NoFlightOrder from "./components/NoFlightOrder";
import OrderPage from "./components/OrderPage";

const Order = () => {
  const dataAwaiting = data.filter(data => data.status === null);
  const dataCanceled = data.filter(data => data.status === "expired");
  const dataProcessing = data.filter(data => data.status === "success" && new Date(data.tickets[0].flight.departure.scheduled_time).getTime() > new Date().getTime());
  const dataCompleted = data.filter(data => data.status === "success" && new Date(data.tickets[0].flight.departure.scheduled_time).getTime() < new Date().getTime());
  return (
    <section id="flightOrder">
      <Tabs defaultValue="1">
        <TabsList className=" mb-10 grid lg:grid-cols-4 md:grid-flow-row h-fit p-0 rounded-t-xl bg-white shadow-3xl">
          <TabsTrigger value="1" className="px-2 py-4 bg-white border-r border-b border-gray-200 flex flex-row justify-between text-black data-[state=active]:text-white">
            <div className="flex flex-row gap-1 ">
              <MoneySend />
              <Text className="font-normal text-sm ">Awaiting Payment</Text>
            </div>
            <Text className="text-white text-xs bg-primary-500 px-2 py-[2px] rounded-full">
              {dataAwaiting.length}
            </Text>
          </TabsTrigger>
          <TabsTrigger value="2" className="px-2 py-4 bg-white border-r border-b border-gray-200 flex flex-row justify-between text-black data-[state=active]:text-white">
            <div className="flex flex-row gap-1 ">
              <RepeateMusic />
              <Text className="font-normal text-sm">Processing</Text>
            </div>
            <Text className="text-white text-xs bg-primary-500 px-2 py-[2px] rounded-full">{dataProcessing.length}</Text>
          </TabsTrigger>
          <TabsTrigger value="3" className="px-3 py-4 bg-white border-r border-b border-gray-200 flex flex-row justify-between text-black data-[state=active]:text-white">
            <div className="flex flex-row gap-1 ">
              <ChartSuccess />
              <Text className="font-normal text-sm">Completed</Text>
            </div>
            <Text className="text-white text-xs bg-primary-500 px-2 py-[2px] rounded-full">{dataCompleted.length}</Text>
          </TabsTrigger>
          <TabsTrigger value="4" className="px-3 py-4 bg-white border-b border-gray-200 flex flex-row justify-between text-black data-[state=active]:text-white">
            <div className="flex flex-row gap-1 ">
              <MoneyRemove />
              <Text className="font-normal text-sm">Canceled</Text>
            </div>
            <Text className="text-white text-xs bg-primary-500 px-2 py-[2px] rounded-full">{dataCanceled.length}</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          {dataAwaiting.length > 0 ? 
            (
              <OrderPage order={dataAwaiting} status={"waiting"} />
            )
          : (
            <NoFlightOrder />
          )}
        </TabsContent>
        <TabsContent value="2">
          {dataProcessing.length > 0 ? 
            (
              <OrderPage order={dataProcessing} status={"processing"} />
            )
          : (
            <NoFlightOrder />
          )}
        </TabsContent>
        <TabsContent value="3">
          {dataCompleted.length > 0 ? 
            (
              <OrderPage order={dataCompleted} status={"completed"} />
            )
          : (
            <NoFlightOrder />
          )}
        </TabsContent>
        <TabsContent value="4">
          {dataCanceled.length > 0 ? 
            (
              <OrderPage order={dataCanceled} status={"canceled"} />
            )
          : (
            <NoFlightOrder />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Order;
