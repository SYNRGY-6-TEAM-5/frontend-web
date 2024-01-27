import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

import useFilter from "@/lib/hooks/useFilter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type CardProps = React.ComponentProps<typeof Card>;

type LayoverTabContentProps = CardProps;

const LayoverTabContent: React.FC<LayoverTabContentProps> = () => {
  const { layover, setLayover } = useFilter();

  return (
    <TabsContent value="number-of-layovers" className="w-full">
      <Card className="h-full w-full">
        <RadioGroup
          onValueChange={setLayover}
          className="flex h-full w-full flex-col items-start justify-center px-8 py-4"
        >
          <div className="flex h-10 w-full items-center space-x-2">
            <RadioGroupItem
              value="Any"
              id="any-layover"
              checked={layover === "Any"}
            />
            <Label className="text-semibold" htmlFor="any-layover">
              Any
            </Label>
          </div>
          <div className="flex h-10 w-full items-center space-x-2">
            <RadioGroupItem
              value="Non-Stop"
              id="no-layover"
              checked={layover === "Non-Stop"}
            />
            <Label className="text-semibold" htmlFor="no-layover">
              Non-Stop
            </Label>
          </div>
          <div className="flex h-10 w-full items-center space-x-2">
            <RadioGroupItem
              value="one-stop"
              id="one-layover"
              checked={layover === "one-stop"}
            />
            <Label className="text-semibold" htmlFor="one-layover">
              Up to 1 stop
            </Label>
          </div>
          <div className="flex h-10 w-full items-center space-x-2">
            <RadioGroupItem
              value="two-stop"
              id="two-layover"
              checked={layover === "two-stop"}
            />
            <Label className="text-semibold" htmlFor="two-layover">
              Up to 2 stop
            </Label>
          </div>
        </RadioGroup>
      </Card>
    </TabsContent>
  );
};

export default LayoverTabContent;
