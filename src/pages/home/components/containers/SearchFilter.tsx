import OneWayForm from "../ui/form/OneWayForm";
import RoundTripForm from "../ui/form/RoundTripForm";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type CardProps = React.ComponentProps<typeof Card>;

export function SearchFilter({ className, ...props }: CardProps) {

  return (
    <div className="flex h-full items-center justify-center">
      <Card
        className={cn("flex justify-end bg-gray-900", className)}
        {...props}
      >
        <CardContent className="grid gap-4 p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-md bg-black">
              <Tabs defaultValue="one-way" className="w-[400px]">
                <TabsList className="grid w-72 grid-cols-3 bg-black">
                  <TabsTrigger value="one-way" className="text-white">
                    One-Way
                  </TabsTrigger>
                  <TabsTrigger value="roundtrip" className="text-white">
                    Roundtrip
                  </TabsTrigger>
                  <TabsTrigger value="multi" className="text-white">
                    Multi
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="one-way"
                  className="flex flex-col gap-2 px-4"
                >
                  <OneWayForm />
                  
                </TabsContent>

                <TabsContent
                  value="roundtrip"
                  className="flex flex-col gap-2 px-4"
                >
                  <RoundTripForm />
                </TabsContent>
              </Tabs>
            </div>
            <Button
              variant="primary"
              className="h-12 w-full items-center rounded-md p-4"
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Cari
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
