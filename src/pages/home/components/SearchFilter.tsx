import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  ArrowsLeftRight,
  AirplaneTakeoff,
  AirplaneLanding,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type CardProps = React.ComponentProps<typeof Card>;

export function SearchFilter({ className, ...props }: CardProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <Card className={cn("w-4/5 justify-center", className)} {...props}>
        <CardContent className="grid gap-4 p-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="space-3 bg-slate-500 flex flex-1 flex-row items-center gap-3">
                <div className="flex flex-col bg-white">
                  <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                    <AirplaneTakeoff size={42} className="h-6 w-6" />
                    <label
                      htmlFor="origin"
                      className="text-gray-900 ml-2 block text-sm font-medium dark:text-white"
                    >
                      Origin
                    </label>
                  </div>
                  <Input
                    id="origin"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="rounded-md border-b-2 border-dashed px-0 text-base outline-none"
                    required
                  />
                </div>

                <Button
                  variant="primary"
                  className="relative h-8 w-6 rounded-full"
                >
                  <ArrowsLeftRight size={42} className="absolute h-4 w-4" />
                </Button>

                <div className="flex flex-col bg-white">
                  <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center pr-3 ps-3.5">
                    <AirplaneLanding size={42} className="h-6 w-6" />
                    <label
                      htmlFor="destination"
                      className="text-gray-900 ml-2 block text-sm font-medium dark:text-white"
                    >
                      Destination
                    </label>
                  </div>
                  <Input
                    id="destination"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="rounded-md border-b-2 border-dashed px-0 text-base outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="space-3 bg-slate-500 flex flex-1 flex-row items-center gap-3">
                <div className="flex flex-col bg-white">
                  <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center ps-1">
                    <label
                      htmlFor="departure"
                      className="text-gray-900 block text-sm font-medium dark:text-white"
                    >
                      Departure
                    </label>
                  </div>
                  <Input
                    id="origin"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="rounded-md border-b-2 border-dashed px-0 text-base outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col bg-white">
                  <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center ps-1">
                    <label
                      htmlFor="departure"
                      className="text-gray-900 block text-sm font-medium dark:text-white"
                    >
                      Arrival
                    </label>
                  </div>
                  <Input
                    id="destination"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="rounded-md border-b-2 border-dashed px-0 text-base outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 rounded-md border p-4 w-1/3">
              <div className="space-3 bg-slate-500 flex flex-1 flex-row items-center gap-3">
                <div className="flex flex-col bg-white">
                  <div className="pointer-events-none inset-y-0 start-0 mb-3 flex flex-row items-center ps-1">
                    <label
                      htmlFor="departure"
                      className="text-gray-900 block text-sm font-medium dark:text-white"
                    >
                      Passenger(s) and Cabin Class
                    </label>
                  </div>
                  <Input
                    id="origin"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    className="rounded-md border-b-2 border-dashed px-0 text-base outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex items-center space-x-4 rounded-md border p-4">
              <Button className="w-28">
                <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Cari
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
