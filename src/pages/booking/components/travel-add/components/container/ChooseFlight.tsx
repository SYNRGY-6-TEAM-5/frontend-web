import { ArrowCircleRight } from "@/assets/svg";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { useCartStore } from "@/store/useCart";
import { Text } from "@mantine/core";

const ChooseFlight = () => {
  const { cart } = useCartStore();
  const { type, personAddOns, setSelect, setFlight, setSelectedFlightIndex } = useAddOnsStore();

  const pickFlight = (flight: string, flight_index: number) => {
    setSelectedFlightIndex(flight_index);
    setSelect(true);
    setFlight(flight);
  };

  console.log("Person Add On  >>> ", personAddOns);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Select Depart and Return</DialogTitle>
      </DialogHeader>
      {cart.map((cartItem, index) => (
        <div key={index} className="mt-6">
          <Text className="font-medium">
            {index === 0 ? "Depart" : "Return"}
          </Text>
          <div className="mt-3 rounded-lg px-3 py-4 shadow">
            <div className="flex justify-between">
              <Text className="text-3xl font-semibold">
                {cartItem.flight.departure.airport_details.iata_code}
              </Text>
              <ArrowCircleRight />
              <Text className="text-3xl font-semibold">
                {cartItem.flight.arrival.airport_details.iata_code}
              </Text>
              <Text
                className="cursor-pointer text-xs font-medium text-primary-500"
                onClick={() => pickFlight(index === 0 ? "Depart" : "Return", index)}
              >
                Select
              </Text>
            </div>
            <div className="my-3 h-px w-full bg-gray-200"></div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-2">
                  <img
                    className="aspect-[3/2] max-h-8 rounded-sm object-contain"
                    src={cartItem.flight.airline.image}
                    alt={cartItem.flight.airline.name}
                  />
                  <Text className="font-medium">{cartItem.flight.iata}</Text>
                </div>
                <div className="inline-flex h-6 items-center justify-center rounded-full bg-gray-100 px-2">
                  <Text className="text-xs font-medium text-gray-500">
                    {cartItem.flight.transit === 0
                      ? "Non-stop"
                      : `${cartItem.flight.transit} Transit`}
                  </Text>
                </div>
              </div>
              {index === 0
                ? personAddOns.map((personAddOn, addOn_index) => (
                    <div
                      className="flex h-8 items-center justify-between rounded-md bg-slate-200 px-3 py-1"
                      key={addOn_index}
                    >
                      {type === "Meal" ? (
                        <>
                          <Text className="text-sm font-medium">
                            {personAddOn.passenger_name}
                          </Text>
                          <Text className="text-sm font-medium">{`${personAddOn.departure.meals.length} Meal`}</Text>
                        </>
                      ) : (
                        <>
                          <Text className="text-sm font-medium">
                            {personAddOn.passenger_name}
                          </Text>
                          <Text className="text-sm font-medium">{`${personAddOn.departure.baggage.baggage_weight}`}</Text>
                        </>
                      )}
                    </div>
                  ))
                : personAddOns.map((ret_personAddOn, ret_addOn_index) => (
                    <div
                      className="flex h-8 items-center justify-between rounded-md bg-slate-200 px-3 py-1"
                      key={ret_addOn_index}
                    >
                      {type === "Meal" ? (
                        <>
                          <Text className="text-sm font-medium">
                            {ret_personAddOn.passenger_name}
                          </Text>
                          <Text className="text-sm font-medium">{`${ret_personAddOn.return?.meals.length} Meal`}</Text>
                        </>
                      ) : (
                        <>
                          <Text className="text-sm font-medium">
                            {ret_personAddOn.passenger_name}
                          </Text>
                          <Text className="text-sm font-medium">{`${ret_personAddOn.return?.baggage.baggage_weight}`}</Text>
                        </>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      ))}
      <DialogClose asChild>
        <Button
          type="button"
          variant="primary"
          className="mt-8 h-14 w-full rounded-xl"
        >
          Done Selecting
        </Button>
      </DialogClose>
    </>
  );
};

export default ChooseFlight;
