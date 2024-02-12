import {
  ChartSuccess,
  MoneyRemove,
  MoneySend,
  RepeateMusic,
} from "@/assets/svg";
import Globe from "@/assets/globe.png";
import OrderIcon from "@/assets/order-icon.png";
import { Text } from "@mantine/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { data } from "@/components/particles/BookingData";

const Order = () => {
  const dataAwaiting = data.filter(data => data.status === null);
  const dataCanceled = data.filter(data => data.status === "expired");
  const dataProcessing = data.filter(data => data.status === "success" && new Date(data.tickets[0].flight.departure.scheduled_time).getTime() > new Date().getTime());
  const dataCompleted = data.filter(data => data.status === "success" && new Date(data.tickets[0].flight.departure.scheduled_time).getTime() < new Date().getTime());
  return (
    // <div>
    //   <div className="inline-flex h-[54px] w-full items-start justify-start rounded-tl-xl rounded-tr-xl shadow">
    //     <div className="flex h-[54px] shrink grow basis-0 items-center justify-between border-b border-r px-3 py-4">
    //       <div className="flex items-center justify-center gap-3">
    //         <div className="flex h-5 w-5 items-center justify-center">
    //           <MoneySend />
    //         </div>
    //         <Text className="text-sm font-normal">Awaiting Payment</Text>
    //       </div>
    //       <div className="flex h-[22px] items-center justify-center gap-2.5 rounded-[120px] bg-red-500 px-3 py-0.5">
    //         <Text className="text-center text-xs font-medium text-white">
    //           0
    //         </Text>
    //       </div>
    //     </div>
    //     <div className="flex h-[54px] shrink grow basis-0 items-center justify-between border-b border-r border-zinc-200 px-3 py-4">
    //       <div className="flex items-center justify-center gap-3">
    //         <div className="flex h-5 w-5 items-center justify-center">
    //           <RepeateMusic />
    //         </div>
    //         <Text className="text-sm font-normal">Processing</Text>
    //       </div>
    //       <div className="flex h-[22px] items-center justify-center gap-2.5 rounded-[120px] bg-red-500 px-3 py-0.5">
    //         <Text className="text-center text-xs font-medium text-white">
    //           2
    //         </Text>
    //       </div>
    //     </div>
    //     <div className="flex h-[54px] shrink grow basis-0 items-center justify-between border-b border-r border-zinc-200 bg-neutral-900 px-3 py-4">
    //       <div className="flex items-center justify-center gap-3">
    //         <div className="flex h-5 w-5 items-center justify-center">
    //           <ChartSuccess />
    //         </div>
    //         <Text className="text-sm font-normal text-white">Completed</Text>
    //       </div>
    //       <div className="flex h-[22px] items-center justify-center gap-2.5 rounded-[120px] bg-red-500 px-3 py-0.5">
    //         <Text className="text-center text-xs font-medium text-white">
    //           1
    //         </Text>
    //       </div>
    //     </div>
    //     <div className="flex h-[54px] shrink grow basis-0 items-center justify-between border-b border-zinc-200 px-3 py-4">
    //       <div className="flex items-center justify-center gap-3">
    //         <div className="flex h-5 w-5 items-center justify-center">
    //           <MoneyRemove />
    //         </div>
    //         <Text className="text-sm font-normal">Canceled</Text>
    //       </div>
    //       <div className="flex h-[22px] items-center justify-center gap-2.5 rounded-[120px] bg-red-500 px-3 py-0.5">
    //         <Text className="text-center text-xs font-medium text-white">
    //           0
    //         </Text>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-5 lg:grid-cols-2">
    //     <div className="h-fit space-y-3 rounded-xl bg-white p-3 shadow-3xl">
    //       <div className="flex items-center justify-between">
    //         <p className="text-xs font-normal text-gray-400">Order ID: 23456</p>
    //         <p className="rounded-3xl bg-gray-100 px-2 py-1 text-xs font-medium text-primary-500">
    //           Roundtrip
    //         </p>
    //       </div>
    //       <div className="flex items-center justify-between border-b border-gray-100 pt-3">
    //         <div className="grid gap-1 pb-3">
    //           <p className="text-xs font-medium text-gray-600">24 Oct, 09:50</p>
    //           <p className="text-2xl font-medium text-gray-900">YIA</p>
    //           <p className="text-xs font-normal text-gray-500">Yogyakarta</p>
    //         </div>
    //         <div className="flex flex-col self-end">
    //           <img src={OrderIcon} alt="Order Icon" />
    //           <img src={Globe} alt="Globe Icon" />
    //         </div>
    //         <div className="pb-3 text-right">
    //           <p className="text-xs font-medium text-gray-600">24 Oct, 09:50</p>
    //           <p className="text-2xl font-medium text-gray-900">YIA</p>
    //           <p className="text-xs font-normal text-gray-500">Yogyakarta</p>
    //         </div>
    //       </div>
    //       <p className="text-sm font-normal text-slate-400">Completed</p>
    //     </div>
    //   </div>
    // </div>
    <section id="flightOrder">
      <Tabs defaultValue="1">
        <TabsList className="grid lg:grid-cols-4 md:grid-flow-row h-fit p-0 rounded-t-xl bg-white shadow-3xl">
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
            dataAwaiting.map((awaiting, index) => (
              <div key={String(index)}>
                {awaiting.fullName}
              </div>
            ))
          : (
            <div>Tidak ada</div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Order;
