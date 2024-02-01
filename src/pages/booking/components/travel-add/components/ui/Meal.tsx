import { Text } from "@mantine/core";
import { MealData } from "@/components/particles/AddOnsData";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { Button } from "@/components/ui/button";

const Meal = () => {
  const { addMeals: handleAddMeals, removeMeal: handleRemoveMeal } = useAddOnsStore();

  return (
    <>
      <div className="grid divide-y">
        {MealData.map((meal, index) => (
          <label
            key={index}
            className="relative flex cursor-pointer items-center py-5"
          >
            <img
              className="aspect-[3/2] max-h-16 rounded-lg object-cover"
              src={meal.meal_img}
              alt={`Food ${index + 1}`}
            />
            <div className="flex w-full items-center justify-between">
              <div className="ml-3">
                <Text className="text-base font-medium">{meal.meal_name}</Text>
                <Text className="text-xs">
                  IDR {parseFloat(meal.meal_price).toLocaleString()}/portion
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={() => handleRemoveMeal(meal.meal_name)}
                  className="h-5 w-5 p-3"
                >
                  <Text className="text-sm">-</Text>
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleAddMeals(meal)}
                  className="h-5 w-5 p-3"
                >
                  <Text className="text-sm">+</Text>
                </Button>
              </div>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default Meal;
