import { Image } from "@/components/ui/Image";
import { Separator } from "@/components/ui/separator";
import bgImage from "../../../../assets/hero-bg.png";
import { Text } from "@mantine/core";
import { HeroTexts } from "../../../../components/particles/DataLists";

import { SearchFilter } from "./SearchFilter";
import AvatarGroup from "../ui/AvatarGroup";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen justify-end overflow-x-hidden lg:h-screen">
      <Image
        className="absolute -z-10 h-full min-h-screen lg:w-screen"
        image={bgImage}
        objectCover="cover"
        alt="Hero Background Vector"
      />

      <main className="left-0 top-0 flex h-auto w-full flex-col items-center justify-center gap-4  px-2 pt-24 md:gap-20 md:px-8 md:pt-32 lg:absolute lg:h-full lg:flex-row lg:px-20 lg:pt-20">
        <div className="flex flex-1 flex-col justify-center gap-14">
          <div className="hidden flex-row items-center justify-start gap-2 md:flex">
            <div className="flex flex-row items-center justify-start gap-2">
              <AvatarGroup />
              <Text className="text-color1 w-32 text-sm font-normal tracking-widest lg:text-base">
                {HeroTexts.firstText.first}
              </Text>
            </div>

            <Separator
              orientation="vertical"
              className="mx-3 my-2 h-8 bg-primary-500 md:mx-4 md:my-0"
            />

            <Text className="text-justify text-sm font-normal text-gray-400">
              {HeroTexts.firstText.second}
            </Text>
          </div>

          <Text className="text-color3 text-3xl font-medium tracking-tight md:text-5xl md:font-semibold md:uppercase lg:text-7xl">
            {HeroTexts.thirdText}
          </Text>
        </div>
        <div className="flex w-4/12 flex-col items-center justify-center px-4 md:order-2">
          <SearchFilter />
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
