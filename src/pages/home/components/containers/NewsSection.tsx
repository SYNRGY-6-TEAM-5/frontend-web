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
    <section className="flex flex-col gap-14 px-20 py-20">
      <div className="relative flex w-full flex-row items-center justify-between">
        <Text className="text-color3 w-4/5 text-4xl font-semibold">
          News Highlight
        </Text>

        <Button
          type="button"
          className={`hover:border-gray-950 before:bg-color2 relative z-10 border-b-2 shadow-sm px-5 py-1.5 text-base before:absolute before:bottom-0 before:left-0 before:-z-10 before:h-0 before:w-full before:transition-all before:duration-300 before:ease-in before:content-[''] hover:before:h-full`}
        >
          Read More
        </Button>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row">
        <div className="dark:bg-neutral-700 block h-80 w-[50%] rounded-lg bg-white bg-cover shadow-lg">
          <Image
            className="relative h-[100%] w-[100%] md:h-full md:w-[100%] lg:h-full lg:w-full"
            image={NewsCard}
            objectCover="object-cover rounded-xl"
            alt="Hero Background Vector"
          >
            <div className="absolute bottom-0 left-0 p-6">
              <div className="inline-flex h-8 w-32 items-center justify-center gap-2.5 rounded-3xl bg-white bg-opacity-20 px-2 py-1">
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

        <div className="flex w-1/2 flex-col items-center justify-between gap-4">
          <Card
            className={cn("flex shrink-0 justify-between shadow-sm", className)}
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
            className={cn("flex shrink-0 justify-between shadow-sm", className)}
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
