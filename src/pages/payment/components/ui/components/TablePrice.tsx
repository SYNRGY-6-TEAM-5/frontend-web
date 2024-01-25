import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Text } from "@mantine/core";
import { ArrowRight } from "lucide-react";

interface pricePassenger {
  departCity:string,
  arriveCity:string,
  adult:number,
  child:number
}

interface addOns {
  name:string,
  price:number
}

interface priceDetails {
  routes:pricePassenger[],
  addOns:addOns[]
}

const TablePrice = ({routes, addOns}:priceDetails) => {
  return(
    <>
      {routes.map((route, index) => (
        <div key={index}>
          <div className="flex space-x-1 mb-4">
            <Text>{route.departCity}</Text>
            <ArrowRight size={24} className="text-primary-500" />
            <Text>{route.arriveCity}</Text>
          </div>
          <Table className="border border-gray-200">
            <TableHeader className="bg-black text-white rounded-lg hover:bg-white hover:text-black">
              <TableRow>
                <TableHead className="border-white border text-white rounded-ss-lg">Passenger</TableHead>
                <TableHead className="border-white border text-white rounded-se-lg">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Adult({route.adult})</TableCell>
                <TableCell>IDR {route.adult * 100000}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Child({route.child})</TableCell>
                <TableCell>IDR {route.child *50000}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
      <div>
        <Table className="border border-gray-200">
          <TableHeader className="bg-black text-white rounded-lg hover:bg-white hover:text-black">
            <TableRow>
              <TableHead className="border-white border text-white rounded-ss-lg">Type</TableHead>
              <TableHead className="border-white border text-white rounded-se-lg">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addOns.map((addons) => (
              <TableRow>
                <TableCell>{addons.name}</TableCell>
                <TableCell>IDR {addons.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )

}

export default TablePrice