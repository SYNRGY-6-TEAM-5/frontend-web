import { Card } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Text } from "@mantine/core";

import useFilter from "@/lib/hooks/useFilter";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;
type SliderProps = React.ComponentProps<typeof Slider>;

type DurationTabContentProps = CardProps & SliderProps;

const DurationTabContent: React.FC<DurationTabContentProps> = ({ className, ...props }) => {
  const { sliderValues, handleSliderChange } = useFilter();

  return (
    <TabsContent value="duration" className="w-full">
      <Card className="flex h-full w-full flex-col justify-evenly gap-6 px-6 py-4">
        <div className="flex flex-col gap-2">
          <Text className="text-primary-500">Flight Duration</Text>
          <Slider
            value={[sliderValues.flightDuration]}
            onValueChange={(value) =>
              handleSliderChange("flightDuration", value[0])
            }
            max={100}
            step={1}
            className={cn("w-full", className)}
            {...props}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Text className="text-primary-500">Stop Duration</Text>
          <Slider
            value={[sliderValues.stopDuration]}
            onValueChange={(value) =>
              handleSliderChange("stopDuration", value[0])
            }
            max={100}
            step={1}
            className={cn("w-full", className)}
            {...props}
          />
        </div>
      </Card>
    </TabsContent>
  );
};

export default DurationTabContent;
