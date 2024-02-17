import { ArrowCircleRight } from "@/assets/svg";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { useCartStore } from "@/store/useCartStore";
import { Text } from "@mantine/core";
import React from "react";

interface FlightAddOnCardProps {
    type: string;
}

const FlightAddOnCard: React.FC<FlightAddOnCardProps> = ({ type }) => {
  const { cart } = useCartStore();
  const { personAddOns } = useAddOnsStore();

  return (
    <div className="w-full ">
      {cart.map((cartItem, index) => (
        <div key={index} className="mt-6 bg-slate-100 rounded-lg px-3 py-4 shadow">
          <Text className="font-medium">
            {index === 0 ? "Depart" : "Return"}
          </Text>
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex items-center justify-center gap-10">
              <Text className="text-3xl font-semibold">
                {cartItem.flight.departure.airport_details.iata_code}
              </Text>
              <ArrowCircleRight />
              <Text className="text-3xl font-semibold">
                {cartItem.flight.arrival.airport_details.iata_code}
              </Text>
            </div>
            <div className="flex flex-col gap-2">
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
    </div>
  );
};

export default FlightAddOnCard;
