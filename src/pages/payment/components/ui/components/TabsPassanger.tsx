import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICompleteBooking } from "@/types/Booking";
import { Text } from "@mantine/core";
import { ArrowRight } from "lucide-react";
interface flightInterface {
  completeBooking: ICompleteBooking,
  depart:string,
  arrive:string
}

const TabsPassanger = ({completeBooking, depart, arrive}:flightInterface) => {
  return (
    <Tabs defaultValue="0" className="w-auto p-2">
      <TabsList className="grid grid-cols-2 w-fit gap-4 bg-white mb-8 p-0">
        {completeBooking.passenger_details.map((p, index) => (
        <TabsTrigger value={String(index)} className="p-3 rounded-xl text-black bg-gray-50 border border-gray-100 data-[state=active]:text-primary-500 data-[state=active]:border-error-500 data-[state=active]:bg-error-50">
          {p.fullName}
        </TabsTrigger>
        ))}
      </TabsList>
      {completeBooking.passenger_addOns.map((p, index) => (
        <TabsContent key={`addon-${index}`} value={String(index)}>
          <div className="flex space-x-1 mb-4">
            <Text>{depart}</Text>
            <ArrowRight size={24} className="text-primary-500" />
            <Text>{arrive}</Text>
          </div>
          <Table className="border border-gray-200">
            <TableHeader className="bg-black text-white hover:bg-black after:bg-black">
              <TableRow>
                <TableHead className="border-white border text-white rounded-ss-lg">Add-ons</TableHead>
                <TableHead className="border-white border text-white rounded-se-lg">Evidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Extra Baggage</TableCell>
                <TableCell>{p.departure.baggage.baggage_weight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Meal</TableCell>
                <TableCell>{p.departure.meals.length} Meal</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Full Insurance</TableCell>
                <TableCell>{completeBooking.trip_insurance.full_insurance.type !== "" ? "Insured" : "Not-insured"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Baggage Insurance</TableCell>
                <TableCell>{completeBooking.trip_insurance.baggage_insurance.type !== "" ? "Insured" : "Not-insured"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Flight Delay</TableCell>
                <TableCell>{completeBooking.trip_insurance.flight_delay_insurance.type !== "" ? "Insured" : "Not-insured"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsPassanger;