import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Text } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import { IPricePassenger } from "@/lib/totalSummarizer";

interface priceDetails {
  summary_data: IPricePassenger[];
}

const TablePrice = ({ summary_data }: priceDetails) => {
  return (
    <>
      {summary_data.map((data, index) => (
        <div key={index}>
          <div className="mb-4 flex space-x-1">
            <Text>{data.departCity}</Text>
            <ArrowRight size={24} className="text-primary-500" />
            <Text>{data.arriveCity}</Text>
          </div>
          <Table className="border border-gray-200">
            <TableHeader className="rounded-lg bg-black text-white hover:bg-white hover:text-black">
              <TableRow>
                <TableHead className="rounded-ss-lg border border-white text-white">
                  Passenger
                </TableHead>
                <TableHead className="rounded-se-lg border border-white text-white">
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(data.passenger).map(([key, value]) => {
                if (value !== 0) {
                  return (
                    <TableRow key={key}>
                      <TableCell>{`${key.charAt(0).toUpperCase()}${key.slice(
                        1,
                      )} (${value})`}</TableCell>
                      <TableCell>
                        IDR {value * parseFloat(data.price)}
                      </TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex items-center justify-center">
                <Text className="text-sm font-semibold">Add Ons</Text>
              </AccordionTrigger>
              <AccordionContent>
                {data.add_ons ? (
                  data.add_ons.map((passenger, index) => (
                    <div className="flex flex-col gap-3" key={index}>
                      <Text>{passenger.passenger_name}</Text>
                      <div className="flex flex-col gap-2 text-xs text-gray-800">
                        <Text>Baggage</Text>
                        {passenger.baggage ? (
                          <div className="flex items-center justify-between">
                            <span>{passenger.baggage.baggage_weight}</span>
                            <span>IDR {passenger.baggage.baggage_price}</span>
                          </div>
                        ) : (
                          <div>No baggage available</div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 text-xs text-gray-800">
                        <Text>Meals</Text>
                        {passenger.meals ? (
                          passenger.meals.map((meal, meal_index) => (
                            <div
                              key={meal_index}
                              className="flex items-center justify-between"
                            >
                              <span>{meal.meal_name}</span>
                              <span>IDR {meal.meal_price}</span>
                            </div>
                          ))
                        ) : (
                          <div>No meals available</div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No meals available</div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
      <div>
        <div className="mb-4 flex space-x-1">
          <Text>Flight Insurance</Text>
        </div>
        <Table className="border border-gray-200">
          <TableHeader className="rounded-lg bg-black text-white hover:bg-white hover:text-black">
            <TableRow>
              <TableHead className="rounded-ss-lg border border-white text-white">
                Type
              </TableHead>
              <TableHead className="rounded-se-lg border border-white text-white">
                Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summary_data[0].trip_insurance.map((insurance) =>
              insurance.type !== "" ? (
                <TableRow>
                  <TableCell>{insurance.type}</TableCell>
                  <TableCell>IDR {insurance.price}</TableCell>
                </TableRow>
              ) : (
                ""
              ),
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TablePrice;
