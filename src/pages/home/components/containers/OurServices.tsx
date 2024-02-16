import LinkSquare from "../../../../assets/link-square.png";
import Clipboard from "../../../../assets/clipboard.png";
import Screen from "../../../../assets/screen.png";
import { Text } from "@mantine/core";
import { ServiceCard } from "../ui/ServiceCard";

const servicesData = [
  {
    image_logo: LinkSquare,
    title: "Track & find your flight",
    excerpt:
      "Effortlessly monitor your flight in real-time, ensuring you're always in the know.",
  },
  {
    image_logo: Clipboard,
    title: "Manage all your doc trip",
    excerpt:
      "Centralize and manage all your travel documents for a stress-free journey.",
  },

  {
    image_logo: Screen,
    title: "Schedulling your flight",
    excerpt:
      "Easily plan and organize your flights with our user-friendly flight booking.",
  },
];

export function Services() {
  return (
    <section className="flex flex-col gap-3 px-2 py-8 md:gap-14 md:p-20 md:px-8 md:pt-20 lg:h-full lg:gap-20 lg:px-20">
      <div className="relative flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <Text className="text-color3 flex-1 text-xl font-semibold md:text-4xl">
          Elevate your experience
        </Text>

        <Text className="mt-3 flex-none text-sm font-normal text-gray-400">
          Embark on a journey where every moment <br /> is curated for your
          delight
        </Text>
      </div>

      <div className="flex w-full flex-col lg:items-center justify-between md:gap-6 md:flex-row">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
}
