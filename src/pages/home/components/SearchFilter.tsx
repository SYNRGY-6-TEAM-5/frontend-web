import { BellIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  ArrowsLeftRight,
  AirplaneTakeoff,
  AirplaneLanding,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

type CardProps = React.ComponentProps<typeof Card>;

export function SearchFilter({ className, ...props }: CardProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className={cn("w-4/5 justify-center", className)} {...props}>
        <CardContent className="grid gap-4 p-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="space-3 flex flex-1 flex-row items-center gap-3 bg-slate-500">
                <div className="flex flex-row bg-white">
                  <div className="pointer-events-none inset-y-0 start-0 flex items-center pr-3 ps-3.5">
                    <AirplaneTakeoff size={42} className="h-4 w-4" />
                  </div>
                  <Input
                    id="from"
                    placeholder="From"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="rounded-md border-none px-0 text-base outline-none"
                    required
                  />
                </div>

                <Button className="relative h-6 w-6 rounded-full">
                  <ArrowsLeftRight size={42} className="absolute h-4 w-4" />
                </Button>

                <div className="flex flex-row bg-white">
                  <div className="pointer-events-none inset-y-0 start-0 flex items-center pr-3 ps-3.5">
                    <AirplaneLanding size={42} className="h-4 w-4" />
                  </div>
                  <Input
                    id="to"
                    placeholder="To"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="rounded-md border-none px-0 text-base outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md border p-4">
              <Switch />
              <Button className="w-28">
                <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Cari
              </Button>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
