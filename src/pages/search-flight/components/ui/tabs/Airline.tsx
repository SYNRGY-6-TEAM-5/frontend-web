import { Text } from "@mantine/core";
import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

import useFilter from "@/lib/hooks/useFilter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type CardProps = React.ComponentProps<typeof Card>;

type AirlineTabContentProps = CardProps;

const AirlineTabContent: React.FC<AirlineTabContentProps> = () => {
  const { airlines, cabinClass, setCabinClass, fetchAirlines } = useFilter();

  useEffect(() => {
    if (airlines.length === 0) {
      fetchAirlines();
    }
  }, []);

  console.log(airlines);

  return (
    <TabsContent value="airline" className="w-full">
      <Card className="h-full w-full">
        <RadioGroup
          onValueChange={setCabinClass}
          className="flex h-full w-full flex-col items-start justify-start px-8 py-4"
        >
          <div className="flex h-9 w-full items-center space-x-2">
            <RadioGroupItem
              value="all-carriers"
              id="all-carriers"
              checked={cabinClass === "all-carriers"}
            />
            <Label className="text-semibold" htmlFor="all-carriers">
              All Carriers
            </Label>
          </div>
          {airlines.slice(0, 4).map((airline) => (
            <div
              key={airline.airline_id}
              className="flex h-9 w-full items-center space-x-2"
            >
              <RadioGroupItem
                value={airline.name}
                id={airline.name}
                checked={cabinClass === airline.name}
              />
              <Label className="text-semibold" htmlFor={airline.name}>
                {airline.name}
              </Label>
            </div>
          ))}
          <Button variant="ghost" className="flex flex-row gap-1">
            <Text className="text-xs font-normal text-primary-500">
              Show More
            </Text>
            <ChevronDownIcon className="text-primary-500" />
          </Button>
        </RadioGroup>
      </Card>
    </TabsContent>
  );
};

export default AirlineTabContent;
