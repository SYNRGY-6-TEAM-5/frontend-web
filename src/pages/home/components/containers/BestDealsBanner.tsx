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
    <div className="flex w-full flex-col items-start justify-start gap-8 px-20 py-10">
      <div>
        <Text className="text-color3 text-4xl font-semibold">
          Best deals for you
        </Text>
      </div>
      <Carousel className="w-full py-4">
        <CarouselContent className="w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-auto items-start justify-start">
                    <Image
                      className="w-[100%] md:w-[100%] lg:w-full"
                      image={FirstCarousel}
                      alt="Hero Background Vector"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-4 top-64 -translate-y-1/2 transform" />
        <CarouselNext className="absolute right-1 top-64 -translate-y-1/2 transform" />
      </Carousel>
    </div>
  );
}
