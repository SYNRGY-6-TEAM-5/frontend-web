import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/Image";

import LinkSquare from "../../../../assets/link-square.png";

import { cn } from "@/lib/utils";
import { Text } from "@mantine/core";

type CardProps = React.ComponentProps<typeof Card>;

export function Services({ className, ...props }: CardProps) {
  return (
    <section className="flex flex-col gap-6 px-20 py-20">
      <div className="relative flex w-full flex-row items-center justify-between">
        <Text className="text-color3 w-4/5 text-4xl font-semibold">
          Elevate your experience
        </Text>

        <Text className="w-1/5 text-[11pt] font-normal text-gray-400">
          Embark on a journey where every moment is curated for your delight
        </Text>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
        <Card
          className={cn("flex w-1/3 shrink-0 justify-between", className)}
          {...props}
        >
          <CardContent className="flex w-full flex-col gap-4 p-4">
            <Image
              className="aspect-square h-20 w-20 md:h-20 md:w-20 lg:h-20 lg:w-20"
              image={LinkSquare}
              alt="Hero Background Vector"
            />
            <div className="flex flex-col gap-2 pt-4">
              <Text className="text-color3 w-full text-2xl font-semibold">
                Track & find your flight
              </Text>

              <Text className="text-[11pt] font-normal text-gray-400">
                Effortlessly monitor your flight in real-time, ensuring you're
                always in the know.
              </Text>
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn("flex w-1/3 shrink-0 justify-between", className)}
          {...props}
        >
          <CardContent className="grid w-full gap-4 p-4">
            <Image
              className="aspect-square h-20 w-20 md:h-20 md:w-20 lg:h-20 lg:w-20"
              image={LinkSquare}
              alt="Hero Background Vector"
            />
            <div className="flex flex-col gap-2 pt-4">
              <Text className="text-color3 w-full text-2xl font-semibold">
                Track & find your flight
              </Text>

              <Text className="text-[11pt] font-normal text-gray-400">
                Effortlessly monitor your flight in real-time, ensuring you're
                always in the know.
              </Text>
            </div>
          </CardContent>
        </Card>
        <Card
          className={cn("flex w-1/3 shrink-0 justify-between", className)}
          {...props}
        >
          <CardContent className="grid w-full gap-4 p-4">
            <Image
              className="aspect-square h-20 w-20 md:h-20 md:w-20 lg:h-20 lg:w-20"
              image={LinkSquare}
              alt="Hero Background Vector"
            />
            <div className="flex flex-col gap-2 pt-4">
              <Text className="text-color3 w-full text-2xl font-semibold">
                Track & find your flight
              </Text>

              <Text className="text-[11pt] font-normal text-gray-400">
                Effortlessly monitor your flight in real-time, ensuring you're
                always in the know.
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
