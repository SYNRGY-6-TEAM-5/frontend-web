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

export function ServiceCard({ service }: ServiceCardProps, { className, ...props }: CardProps) {
  return (
    <Card className={cn("flex w-96 shrink-0 justify-between", className)} {...props}>
      <CardContent className="flex w-full flex-col gap-4 p-4">
        <Image
          className="aspect-square h-20 w-20 md:h-20 md:w-20 lg:h-20 lg:w-20"
          image={service.image_logo}
          alt="Service Logo"
        />
        <div className="flex flex-col gap-2 pt-4">
          <Text className="text-color3 w-full text-2xl font-semibold">
            {service.title}
          </Text>

          <Text className="text-[11pt] font-normal text-gray-400">
            {service.excerpt}
          </Text>
        </div>
      </CardContent>
    </Card>
  );
}
