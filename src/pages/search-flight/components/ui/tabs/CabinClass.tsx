import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

import useFilter from "@/lib/hooks/useFilter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type CardProps = React.ComponentProps<typeof Card>;

type CabinClassTabContentProps = CardProps;

const CabinClassTabContent: React.FC<CabinClassTabContentProps> = () => {
  const { cabinClass, setCabinClass } = useFilter();

  return (
    <TabsContent value="cabin-class" className="w-full">
      <Card className="h-full w-full">
        <RadioGroup
          onValueChange={setCabinClass}
          className="flex h-full w-full flex-col items-start justify-center px-8 py-4"
        >
          <div className="flex h-14 w-full items-center space-x-2">
            <RadioGroupItem
              value="Economy"
              id="economy-class"
              checked={cabinClass === "Economy"}
            />
            <Label className="text-semibold" htmlFor="economy-class">
              Economy
            </Label>
          </div>
          <div className="flex h-14 w-full items-center space-x-2">
            <RadioGroupItem
              value="Business"
              id="business-class"
              checked={cabinClass === "Business"}
            />
            <Label className="text-semibold" htmlFor="business-class">
              Business
            </Label>
          </div>
          <div className="flex h-14 w-full items-center space-x-2">
            <RadioGroupItem
              value="First Class"
              id="first-class"
              checked={cabinClass === "First Class"}
            />
            <Label className="text-semibold" htmlFor="first-class">
              First Class
            </Label>
          </div>
        </RadioGroup>
      </Card>
    </TabsContent>
  );
};

export default CabinClassTabContent;
