import { Image } from "@/components/ui/Image";
import LogoAirasia from "../../../../assets/airasia.svg";
import LogoCitilink from "../../../../assets/citilink.svg";
import LogoGarudaIndonesia from "../../../../assets/garuda-indonesia.svg";
import LogoLionAir from "../../../../assets/lion-air.svg";
import LogoBatikAir from "../../../../assets/batik-air.svg";

const BrandBanner = () => {
  return (
    <div
      className={`md:h-18 flex h-24 w-full items-center justify-end bg-white px-6 md:px-9 lg:justify-between lg:px-20`}
    >
      <div className="flex w-full items-center justify-between gap-10">
        <Image
          as="a"
          href="/"
          className="h-8 md:h-8"
          image={LogoAirasia}
          alt="Logo"
        />
        <Image
          as="a"
          href="/"
          className="h-8 md:h-8"
          image={LogoCitilink}
          alt="Logo"
        />
        <Image
          as="a"
          href="/"
          className="h-8 md:h-8"
          image={LogoGarudaIndonesia}
          alt="Logo"
        />
        <Image
          as="a"
          href="/"
          className="h-8 md:h-8"
          image={LogoLionAir}
          alt="Logo"
        />
        <Image
          as="a"
          href="/"
          className="h-8 md:h-8"
          image={LogoBatikAir}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default BrandBanner;
