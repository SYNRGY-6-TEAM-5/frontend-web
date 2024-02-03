import { Text } from "@mantine/core";
import { MealData } from "@/components/particles/AddOnsData";
import { useAddOnsStore } from "@/store/useAddOnsStore";
import { Button } from "@/components/ui/button";
import { Trash } from "@phosphor-icons/react";

interface MealProps {
  flight: string;
}

const Meal: React.FC<MealProps> = ({ flight }) => {
  const {
    addMeals: handleAddMeals,
    addReturnMeals: handleAddReturnMeals,
    removeMeal: handleRemoveMeal,
    removeReturnMeal: handleRemoveReturnMeal,
  } = useAddOnsStore();

  return (
    <>
      <div className="grid divide-y">
        {MealData.map((meal, index) => (
          <label
            key={index}
            className="relative flex cursor-pointer items-center gap-2 py-5"
          >
            <Button
              variant="ghost"
              onClick={
                flight === "Depart"
                  ? () => handleRemoveMeal(meal.meal_name)
                  : () => handleRemoveReturnMeal(meal.meal_name)
              }
            >
              <Trash size={22} className="text-slate-400" />
            </Button>
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
              <Button
                variant="primary"
                onClick={
                  flight === "Depart"
                    ? () => handleAddMeals(meal)
                    : () => handleAddReturnMeals(meal)
                }
                className="h-5 w-5 p-3"
              >
                <Text className="text-sm">+</Text>
              </Button>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default Meal;
