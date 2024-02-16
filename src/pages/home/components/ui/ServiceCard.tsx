import { Card, CardContent } from "@/components/ui/card";
import { Image } from "@/components/ui/Image";

import { cn } from "@/lib/utils";
import { Text } from "@mantine/core";

type CardProps = React.ComponentProps<typeof Card>;

interface ServiceCardProps {
  service: {
    image_logo: string;
    title: string;
    excerpt: string;
  };
}

export function ServiceCard(
  { service }: ServiceCardProps,
  { className, ...props }: CardProps,
) {
  return (
    <Card
      className={cn("flex lg:w-1/3 justify-between", className)}
      {...props}
    >
      <CardContent className="flex w-full items-center gap-4 py-4 md:p-4 md:items-start md:flex-col">
        <Image
          className="aspect-square h-14 w-14 md:h-20 md:w-20 lg:h-20 lg:w-20"
          image={service.image_logo}
          alt="Service Logo"
        />
        <div className="flex flex-col gap-2 lg:pt-4">
          <Text className="text-color3 w-full text-lg font-semibold md:text-2xl">
            {service.title}
          </Text>

          <Text className="text-sm font-normal text-gray-400 md:text-[11pt]">
            {service.excerpt}
          </Text>
        </div>
      </CardContent>
    </Card>
  );
}
