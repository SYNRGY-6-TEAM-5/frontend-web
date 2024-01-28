import OneWayForm from "../ui/form/OneWayForm";
import RoundTripForm from "../ui/form/RoundTripForm";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { useState } from "react";

type CardProps = React.ComponentProps<typeof Card>;

export function SearchFilter({ className, ...props }: CardProps) {
  const [tripType, setTripType] = useState("one-way");

  const handleTabsChange = (value: string) => {
    setTripType(value);
    console.log(tripType);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Card
        className={cn("flex justify-end bg-gray-900", className)}
        {...props}
      >
        <CardContent className="grid gap-4 p-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-md bg-black">
              <Tabs defaultValue="one-way" className="w-[400px]" onValueChange={handleTabsChange}>
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
                  <OneWayForm tripType={tripType} />
                  
                </TabsContent>

                <TabsContent
                  value="roundtrip"
                  className="flex flex-col gap-2 px-4"
                >
                  <RoundTripForm tripType={tripType} />
                </TabsContent>
              </Tabs>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
