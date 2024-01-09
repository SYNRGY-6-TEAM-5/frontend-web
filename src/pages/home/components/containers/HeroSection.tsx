import { Image } from "@/components/ui/Image";
import { Separator } from "@/components/ui/separator"
import bgImage from "../../../../assets/hero-bg.png";
import { Text } from "@mantine/core";
import { HeroTexts } from "../../../../components/particles/DataLists";

import { SearchFilter } from "./SearchFilter";
import AvatarGroup from "../ui/AvatarGroup";

const HeroSection = () => {
  return (
    <section className="relative flex h-[100vh] w-full justify-end overflow-x-hidden md:h-[550px] lg:h-screen">
      <Image
        className="h-[100%] w-[100%] md:h-[50vh] md:w-[100%] lg:h-[100vh] lg:w-full"
        image={bgImage}
        objectCover="cover"
        alt="Hero Background Vector"
      />
      <main className="absolute left-0 top-0 flex h-auto w-full flex-col items-center justify-center gap-20 pt-24 md:px-8 md:pt-32 lg:h-full lg:flex-row lg:px-20 lg:pt-20">
        <div className="flex flex-1 flex-col justify-center gap-2 md:gap-3">
          <div className="flex flex-row items-center gap-2 justify-start">
            <div className="flex flex-row items-center justify-start gap-2">
              <AvatarGroup />
              <Text className="text-color1 w-32 text-sm font-normal tracking-widest lg:text-base">
                {HeroTexts.firstText.first}
              </Text>
            </div>

            <Separator orientation="vertical" className="bg-primary-500 h-8 my-2 mx-3 md:my-0 md:mx-4" />

            <Text className="text-gray-400 text-justify text-sm font-normal">
              {HeroTexts.firstText.second}
            </Text>
          </div>

          <Text className="text-color3 text-3xl font-semibold md:text-5xl lg:text-7xl">
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
