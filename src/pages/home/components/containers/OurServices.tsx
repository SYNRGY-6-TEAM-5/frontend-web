import LinkSquare from "../../../../assets/link-square.png";
import Clipboard from "../../../../assets/clipboard.png";
import Screen from "../../../../assets/screen.png";
import { Text } from "@mantine/core";
import { ServiceCard } from "../ui/ServiceCard";

const servicesData = [
  {
    image_logo: LinkSquare,
    title: "Track & find your flight",
    excerpt: "Effortlessly monitor your flight in real-time, ensuring you're always in the know.",
  },
  {
    image_logo: Clipboard,
    title: "Manage all your doc trip",
    excerpt: "Centralize and manage all your travel documents for a stress-free journey.",
  },

  {
    image_logo: Screen,
    title: "Schedulling your flight",
    excerpt: "Easily plan and organize your flights with our user-friendly flight booking.",
  },
];

export function Services() {

  return (
    <section className="flex flex-col gap-14 px-20 py-20">
      <div className="relative flex w-full flex-row items-center justify-between">
        <Text className="text-color3 w-4/5 text-4xl font-semibold">
          Elevate your experience
        </Text>

        <Text className="w-1/5 text-[11pt] font-normal text-gray-400">
          Embark on a journey where every moment is curated for your delight
        </Text>
      </div>

      <div className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service}/>
        ))}
      </div>
    </section>
  );
}
