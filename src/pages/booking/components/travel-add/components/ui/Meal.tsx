import { CheckedBox } from "@/assets/svg";
import { Text } from "@mantine/core";

const Meal = () => {
  return (
    <>
      <div className="grid divide-y">
        <label className="relative flex cursor-pointer items-center py-5">
          <img
            className="aspect-[3/2] max-h-16 rounded-lg object-cover"
            src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Food 1"
          />
          <div className="ml-3">
            <Text className="text-base font-medium">Fried Noodle</Text>
            <Text className="text-xs">IDR 49,000/portion</Text>
          </div>
          <input
            name="baggage"
            value={10}
            type="checkbox"
            className="peer ml-auto h-4 w-4 appearance-none rounded-md border border-primary-200 accent-primary-500"
          />
          <CheckedBox className="absolute right-0 hidden h-4 w-4 peer-checked:block" />
        </label>
        <label className="relative flex cursor-pointer items-center py-5">
          <img
            className="aspect-[3/2] max-h-16 rounded-lg object-cover"
            src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Food 1"
          />
          <div className="ml-3">
            <Text className="text-base font-medium">Salad</Text>
            <Text className="text-xs">IDR 79,000/portion</Text>
          </div>
          <input
            name="baggage"
            value={10}
            type="checkbox"
            className="peer ml-auto h-4 w-4 appearance-none rounded-md border border-primary-200 accent-primary-500"
          />
          <CheckedBox className="absolute right-0 hidden h-4 w-4 peer-checked:block" />
        </label>
        <label className="relative flex cursor-pointer items-center py-5">
          <img
            className="aspect-[3/2] max-h-16 rounded-lg object-cover"
            src="https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Food 1"
          />
          <div className="ml-3">
            <Text className="text-base font-medium">Roasted Chicken</Text>
            <Text className="text-xs">IDR 99,000/portion</Text>
          </div>
          <input
            name="baggage"
            value={10}
            type="checkbox"
            className="peer ml-auto h-4 w-4 appearance-none rounded-md border border-primary-200 accent-primary-500"
          />
          <CheckedBox className="absolute right-0 hidden h-4 w-4 peer-checked:block" />
        </label>
        <label className="relative flex cursor-pointer items-center py-5">
          <img
            className="aspect-[3/2] max-h-16 rounded-lg object-cover"
            src="https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Food 1"
          />
          <div className="ml-3">
            <Text className="text-base font-medium">Hamburger</Text>
            <Text className="text-xs">IDR 119,000/portion</Text>
          </div>
          <input
            name="baggage"
            value={10}
            type="checkbox"
            className="peer ml-auto h-4 w-4 appearance-none rounded-md border border-primary-200 accent-primary-500"
          />
          <CheckedBox className="absolute right-0 hidden h-4 w-4 peer-checked:block" />
        </label>
      </div>
    </>
  );
};

export default Meal;
