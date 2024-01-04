import { BellIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";


type CardProps = React.ComponentProps<typeof Card>;

export function SearchFilter({ className, ...props }: CardProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className={cn("w-4/5 justify-center", className)} {...props}>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-muted-foreground text-sm">
                Send notifications to device.
              </p>
            </div>
            <Switch />
            <Button className="w-28">
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Cari
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
