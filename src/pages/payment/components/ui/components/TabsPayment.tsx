import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@mantine/core";
import Rute from "../../containers/Rute";
import TabsPassanger from "./TabsPassanger";

const order = [
  {
    name:"Depart",
    departCity:"Jakarta",
    departTime:"Tue, 2 Jan 2024",
    departAirport:"Soekarno Hatta",
    departTerminal:"Terminal 3 Domestic",
    arriveCity:"Yogyakarta",
    arriveTime:"Tue, 2 Jan 2024",
    arriveAirport:"Yogyakarta Kulon Progo",
    arriveTerminal:"Terminal 1 Domestic"
  },
  {
    name:"Return",
    departTime:"Fri, 5 Jan 2024",
    departCity:"Yogyakarta",
    departAirport:"Yogyakarta Kulon Progo",
    departTerminal:"Terminal 1 Domestic",
    arriveCity:"Jakarta",
    arriveTime:"Fri, 5 Jan 2024",
    arriveAirport:"Soekarno Hatta",
    arriveTerminal:"Terminal 3 Domestic"
  },
];

const passengers = [
  {
    name:"Bella Hadid",
    extra_baggage : 16,
    meal : 1,
    flight_delay: "Insured",
    baggage_insurance :"Insured"
  },
  {
    name:"Jack Harris",
    extra_baggage : 20,
    meal : 1,
    flight_delay: "Insured",
    baggage_insurance :"Insured"
  }
]

const TabsPayment = () => {
  return (
    <Tabs defaultValue="0" className="w-auto">
      <TabsList className="grid grid-cols-2 w-fit bg-white gap-4">
        {order.map((order, index) => (
          <TabsTrigger value={String(index)} className="p-0 text-lg text-gray-300 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:border-b data-[state=active]:border-primary-500">
            {order.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {order.map((order, index) => (
        <TabsContent
          value={String(index)}
          className="flex flex-col gap-8"
        >
          <div className="mt-6 bg-white shadow-3xl py-3 px-4 rounded-xl space-y-6">
            <div>
              <Text className="mb-2"><span className="text-primary-500">Depart</span> {order.departTime}</Text> 
              <Text className="mb-1 text-sm font-medium">{order.departAirport}</Text>
              <Text className="text-xs">{order.departTerminal}</Text>
            </div>
            <Rute departure="YIA" departureTime={6.25} desc="non-stop" arrival="CGK" arrivalTime={7.40} />
            <div>
              <Text className="mb-2"><span className="text-primary-500">Arrived</span> {order.arriveTime}</Text> 
              <Text className="mb-1 text-sm font-medium">{order.arriveAirport}</Text>
              <Text className="text-xs">{order.arriveTerminal}</Text>
            </div>
          </div>
          <div>
            <Text className="mb-6 text-l font-medium">Passenger & Add-ons</Text>
            <TabsPassanger depart={order.departCity} arrive={order.arriveCity} passengers={passengers}/>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsPayment;