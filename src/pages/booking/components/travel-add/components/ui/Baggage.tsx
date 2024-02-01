import { BaggageData } from "@/components/particles/AddOnsData";
import { useAddOnsStore } from "@/store/useAddOnsStore";


const Baggage = () => {
  const { setBaggageAddOn: handleSetBaggage, baggageAddOn } = useAddOnsStore();

  return (
    <>
      <div className="mb-5 mt-8 grid gap-4">
        {BaggageData.map((baggage, index) => (
          <label
            key={index}
            className={`flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-3 font-medium ring-1 ring-gray-200 ${
              baggageAddOn.baggage_weight === baggage.baggage_weight
                ? "has-[:checked]:bg-primary-50 has-[:checked]:ring-primary-500"
                : ""
            }`}
          >
            <span>{baggage.baggage_weight}</span>
            <span className="text-xs font-normal">
              IDR {baggage.baggage_price}
            </span>
            <input
              name="baggage"
              value={baggage.baggage_weight}
              type="radio"
              className="hidden"
              checked={baggageAddOn.baggage_weight === baggage.baggage_weight}
              onChange={() => handleSetBaggage(baggage)}
            />
          </label>
        ))}
      </div>
    </>
  );
};

export default Baggage;
