import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogAddOns from "./components/DialogAddOns";
import addOns from "../../../../assets/add-ons.png";

const TravelAddOns = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Travel Add Ons</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>

      <CardContent>
        <section className="flex flex-col items-center justify-center">
          <div className="mt-1 flex h-full w-full max-w-[756px] items-center justify-center">
            <div className="flex h-[128px] w-[756px] flex-col justify-around rounded-lg bg-white px-4 py-3 shadow-md">
              <div className="flex flex-row justify-between">
                <div className="lead flex-shrink-0 text-base font-medium leading-6">
                  Baggage
                </div>
                <div className="flex-shrink-0">
                  <DialogAddOns image={addOns} type="Baggage" />
                </div>
              </div>
              <div className="flex h-[60px] items-center justify-start rounded-lg bg-[#F9F9FB] px-5">
                <p className="max-w-[250px] text-xs font-normal leading-4 text-[#5D6B98]">
                  Adding baggage here is cheaper than at the airport
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex h-full w-full max-w-[756px] items-center justify-center">
            <div className="flex h-[128px] w-[750px] flex-col justify-around rounded-lg bg-white px-4 py-3 shadow-md">
              <div className="flex flex-row justify-between">
                <div className="lead flex-shrink-0 text-base font-medium leading-6">
                  Meal
                </div>
                <div className="flex-shrink-0">
                  <DialogAddOns image={addOns} type="Meal" />
                </div>
              </div>
              <div className="flex h-[60px] items-center justify-start rounded-lg bg-[#F9F9FB] px-5">
                <p className="max-w-[250px] text-xs font-normal leading-4 text-[#5D6B98]">
                  Don’t let others hear your tummy growl for the whole flight
                </p>
              </div>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TravelAddOns;
