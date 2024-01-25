import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@mantine/core";
import { ArrowRight } from "lucide-react";

interface passenger {
  name:string,
  extra_baggage : number,
  meal : number,
  flight_delay: string,
  baggage_insurance :string
}

interface flightInterface {
  passengers:passenger[],
  depart:string,
  arrive:string
}

const TabsPassanger = ({passengers, depart, arrive}:flightInterface) => {
  return (
    <Tabs defaultValue="0" className="w-auto p-2">
      <TabsList className="grid grid-cols-2 w-fit gap-4 bg-white mb-8 p-0">
        {passengers.map((p, index) => (
        <TabsTrigger value={String(index)} className="p-3 rounded-xl text-black bg-gray-50 border border-gray-100 data-[state=active]:text-primary-500 data-[state=active]:border-error-500 data-[state=active]:bg-error-50">
          {p.name}
        </TabsTrigger>
        ))}
      </TabsList>
      {passengers.map((p, index) => (
        <TabsContent value={String(index)}>
          <div className="flex space-x-1 mb-4">
            <Text>{depart}</Text>
            <ArrowRight size={24} className="text-primary-500" />
            <Text>{arrive}</Text>
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
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsPassanger;