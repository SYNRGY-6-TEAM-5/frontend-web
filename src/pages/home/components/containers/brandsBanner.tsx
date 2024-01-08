import { AirAsia, Citilink, GarudaIndonesia, LionAir, BatikAir } from "@/assets/svg";

const BrandBanner = () => {
  return (
    <div className={`md:h-18 flex h-24 w-full items-center justify-end bg-white px-6 md:px-9 lg:justify-between lg:px-20`}>
      <div className="flex w-full items-center justify-between gap-10">
        <AirAsia className="h-8 md:h-8" alt="AirAsia Logo" />
        <Citilink className="h-8 md:h-8" alt="Citilink Logo" />
        <GarudaIndonesia className="h-8 md:h-8" alt="Garuda Indonesia Logo" />
        <LionAir className="h-8 md:h-8" alt="Lion Air Logo" />
        <BatikAir className="h-8 md:h-8" alt="Batik Air Logo" />
      </div>
    </div>
  );
};

export default BrandBanner;
