import { AirAsia, Citilink, GarudaIndonesia, LionAir, BatikAir } from "@/assets/svg";

const BrandBanner = () => {
  return (
    <div className="hidden md:flex w-full items-center justify-end bg-white pt-20 px-6 lg:justify-between lg:px-20">
      <div className="flex w-full items-center justify-between gap-10">
        <AirAsia className="h-8 md:h-8" />
        <Citilink className="h-8 md:h-8" />
        <GarudaIndonesia className="h-8 md:h-8" />
        <LionAir className="h-8 md:h-8" />
        <BatikAir className="h-8 md:h-8" />
      </div>
    </div>
  );
};

export default BrandBanner;
