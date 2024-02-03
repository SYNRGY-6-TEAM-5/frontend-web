import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogAddOns from "./components/DialogAddOns";
import { usePassengerStore } from "@/store/useBooking";
import { useTicketContext } from "@/context/TicketContext";
import FlightAddOnCard from "./components/ui/FlightAddOnCard";
import { useAddOnsStore } from "@/store/useAddOnsStore";

const TravelAddOns = () => {
  const { tripData } = useTicketContext();
  const { passengerDetails } = usePassengerStore();
  const { mealsAddOn, baggageAddOn } = useAddOnsStore();

  const areAllDetaiilsFilled =
    passengerDetails.length === tripData.total_seat &&
    passengerDetails.length !== 0;

  return (
    <Card
      className={`${
        !areAllDetaiilsFilled ? "pointer-events-none opacity-45" : ""
      } mb-8`}
    >
      <CardHeader>
        <CardTitle>Travel Add Ons</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>

      <CardContent>
        <section className="flex flex-col items-center justify-center gap-8 pb-8">
          <div className="mt-1 flex h-full w-full max-w-[756px] items-center justify-center">
            <div className="flex w-full flex-col justify-around rounded-lg bg-white px-4 py-3 shadow-md">
              <div className="flex flex-row justify-between">
                <div className="lead flex-shrink-0 text-base font-medium leading-6">
                  Baggage
                </div>
                <div className="flex-shrink-0">
                  <DialogAddOns type="Baggage" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start rounded-lg bg-white px-3 py-6">
                {baggageAddOn.baggage_price !== "" ? (
                  <FlightAddOnCard type="Baggage" />
                ) : (
                  <p className="w-full text-xs bg-slate-300 font-normal leading-4 text-slate-600 p-3 rounded-md">
                    Adding baggage here is cheaper than at the airport
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-1 flex h-full w-full max-w-[756px] items-center justify-center">
            <div className="flex w-full flex-col justify-around rounded-lg bg-white px-4 py-3 shadow-md">
              <div className="flex flex-row justify-between">
                <div className="lead flex-shrink-0 text-base font-medium leading-6">
                  Meal
                </div>
                <div className="flex-shrink-0">
                  <DialogAddOns type="Meal" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-start rounded-lg bg-white px-3 py-6">
                {mealsAddOn.length > 0 ? (
                  <FlightAddOnCard type="Meal" />
                ) : (
                  <p className="w-full text-xs bg-slate-300 font-normal leading-4 text-slate-600 p-3 rounded-md">
                    Don’t let others hear your tummy growl for the whole flight
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default TravelAddOns;
