import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/Image";

import NewsCard from "../../../../assets/news-card.png";

import { cn } from "@/lib/utils";
import { Text } from "@mantine/core";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

type CardProps = React.ComponentProps<typeof Card>;

export function NewsSection({ className, ...props }: CardProps) {
  return (
    <section className="flex flex-col gap-6 px-2 py-8 md:gap-10 md:p-20 md:px-8 md:pt-20 lg:h-full lg:gap-20 lg:px-20">
      <div className="flex w-full flex-row items-center justify-between">
        <Text className="flex-1 text-xl font-semibold text-zinc-900 md:text-4xl">
          News Highlight
        </Text>

        <Button
          type="button"
          variant="transparent"
          className="flex-none border border-gray-900 px-5 text-sm shadow-sm"
        >
          Read More
        </Button>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row">
        <div className="block h-80 rounded-lg bg-white bg-cover shadow-lg md:w-[50%] dark:bg-neutral-700">
          <Image
            className="relative h-[100%] w-[100%] md:h-full md:w-[100%] lg:h-full lg:w-full"
            image={NewsCard}
            objectCover="object-cover rounded-xl"
            alt="Hero Background Vector"
          >
            <div className="absolute bottom-0 left-0 p-6">
              <div className="inline-flex h-8 items-center justify-center gap-2.5 rounded-3xl bg-white bg-opacity-20 px-3 py-1">
                <div className="text-base font-medium leading-normal text-white">
                  1 January 2023
                </div>
              </div>
              <div className="w-full text-lg font-bold leading-loose text-white">
                FAA Grounds Some Boeing 737 MAX 9 Jets Following Emergency
                Landing
              </div>
            </div>
          </Image>
        </div>

        <div className="hidden w-1/2 flex-col items-center justify-between gap-4 md:flex">
          <Card
            className={cn("flex shrink-0 justify-between", className)}
            {...props}
          >
            <CardContent className="grid w-full gap-4 p-4">
              <div className="flex flex-col gap-2 pt-4">
                <Text className="text-base font-normal text-gray-400">
                  3 January 2023
                </Text>
                <Text className="text-color3 text-xl font-bold">
                  Wizz Air's Market Share Growth Poised to Disrupt Airline
                  Industry
                </Text>
              </div>
              <Separator
                orientation="horizontal"
                className="my-2 h-[0.5px] bg-gray-400 md:my-0"
              />
            </CardContent>
          </Card>

          <Card
            className={cn("flex shrink-0 justify-between", className)}
            {...props}
          >
            <CardContent className="grid w-full gap-4 p-4">
              <div className="flex flex-col gap-2 pt-4">
                <Text className="text-base font-normal text-gray-400">
                  3 January 2023
                </Text>
                <Text className="text-color3 text-xl font-bold">
                  Wizz Air's Market Share Growth Poised to Disrupt Airline
                  Industry
                </Text>
              </div>
              <Separator
                orientation="horizontal"
                className="my-2 h-[0.5px] bg-gray-400 md:my-0"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
