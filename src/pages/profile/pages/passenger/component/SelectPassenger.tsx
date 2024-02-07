import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@mantine/core";
import { ChevronRightIcon } from "@radix-ui/react-icons";

const SelectPassenger = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Passengers</CardTitle>
        <CardDescription>
          Here are list of your saved passengers details
        </CardDescription>
      </CardHeader>

      <CardContent>
        <section className="flex flex-col items-center justify-center gap-6 px-8 pb-12">
          <Button variant="ghost" className="h-16 w-full">
            <div className="mt-1 flex h-full w-full items-center justify-between border-b py-2 pb-4">
              <div className="mt-1 flex w-full flex-col items-start justify-between gap-2">
                <Text className="text-lg font-normal">Bella Hadid</Text>
                <Text className="text-md font-medium text-slate-300">
                  Account Owner
                </Text>
              </div>
              <ChevronRightIcon
                fontSize={12}
                className="h-6 w-6 text-xl font-normal text-primary-500"
              />
            </div>
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default SelectPassenger;
