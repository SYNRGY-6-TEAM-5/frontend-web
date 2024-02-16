import FirstCarousel from "../../../../assets/carousel-1.png";
import { Image } from "@/components/ui/Image";
import { Text } from "@mantine/core";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function BestDealsBanner() {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-0 px-2 py-8 md:gap-8 md:px-8 md:pt-28 lg:h-full lg:px-20">
      <div>
        <Text className="text-color3 text-lg font-semibold capitalize md:text-4xl">
          Best deals for you
        </Text>
      </div>
      <Carousel
        className="relative w-full py-4"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="w-full ml-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="w-screen pl-0">
              <div className="w-full p-1">
                <Card>
                  <CardContent className="w-full h-full">
                    <Image
                      className="w-full h-full"
                      objectCover="object-cover rounded-xl"
                      image={FirstCarousel}
                      alt="Hero Background Vector"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2" />
        <CarouselNext className="absolute right-2" />
      </Carousel>
    </div>
  );
}
