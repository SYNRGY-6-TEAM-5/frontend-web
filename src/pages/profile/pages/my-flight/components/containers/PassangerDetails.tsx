import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@mantine/core";

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

const PassangerDetails = () => {
  return(
    <div className="flex gap-3 flex-col">
      <Text>Passenger & Facilities</Text>
      <Tabs defaultValue="0" className="w-auto bg-white p-2 pb-0 rounded-lg shadow-3xl">
        <TabsList className="grid grid-cols-2 w-fit gap-4 bg-white mb-8">
          {passengers.map((p, index) => (
          <TabsTrigger key={String(index)} value={String(index)} className="p-3 rounded-xl text-black bg-gray-50 border border-gray-100 data-[state=active]:text-primary-500 data-[state=active]:border-error-500 data-[state=active]:bg-error-50">
            {p.name}
          </TabsTrigger>
          ))}
        </TabsList>
        {passengers.map((p, index) => (
          <TabsContent value={String(index)} key={String(index)} className="flex gap-3 flex-col">
            {order.map((order, index) => (
              <div key={String(index)} className=" border-t border-dashed border-t-gray-200 pt-3 ">
                <div className="flex space-x-1 mb-4">
                  <Text>{order.departCity}</Text>
                  <ArrowRight size={24} className="text-primary-500" />
                  <Text>{order.arriveCity}</Text>
                </div>
                <Table className="border border-gray-200">
                  <TableHeader className="bg-black text-white rounded-lg hover:bg-white hover:text-black">
                    <TableRow>
                      <TableHead className="border-white border text-white rounded-ss-lg">Add-ons</TableHead>
                      <TableHead className="border-white border text-white rounded-se-lg">Evidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Extra Baggage</TableCell>
                      <TableCell>{p.extra_baggage} kg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Meal</TableCell>
                      <TableCell>{p.meal} Meal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Flight Delay</TableCell>
                      <TableCell>{p.flight_delay}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Baggage Insurance</TableCell>
                      <TableCell>{p.baggage_insurance}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default PassangerDetails;