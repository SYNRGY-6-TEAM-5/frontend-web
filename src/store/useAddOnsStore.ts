import { IBaggageAddOns, IMealAddOns } from "@/types/Booking";
import { create } from "zustand";

export interface MealsItem extends IMealAddOns {
  count: number;
}

type AddOnsStore = {
  mealsAddOn: MealsItem[];
  baggageAddOn: IBaggageAddOns;
  isSelecting: boolean;
  type?: string;
  flight?: string;
  addMeals: (meals: IMealAddOns) => void;
  removeMeal: (mealName: string) => void;
  setBaggageAddOn: (baggage: IBaggageAddOns) => void;
  setSelect: (select: boolean) => void;
  setType: (type: string) => void;
  setFlight: (flight: string) => void;
  calculateMealPriceTotal: () => string;
};

export const useAddOnsStore = create<AddOnsStore>((set, get) => ({
  mealsAddOn: [],
  baggageAddOn: {
    baggage_weight: "",
    baggage_price: ""
  },
  isSelecting: false,
  addMeals: (meals: IMealAddOns) => {
    const { mealsAddOn: existingMeals } = get();
    const updatedMeals = updateMeals(meals, existingMeals);
    set({ mealsAddOn: updatedMeals });
  },
  removeMeal: (mealName: string) => {
    const { mealsAddOn: existingMeals } = get();
    const updatedMeals = existingMeals.filter(meal => meal.meal_name !== mealName);
    set({ mealsAddOn: updatedMeals });
  },
  setBaggageAddOn: (baggage: IBaggageAddOns) => {
    set({ baggageAddOn: baggage });
  },
  setSelect: (select) => set({ isSelecting: select }),
  setType: (type) => set({ type }),
  setFlight: (flight) => set({ flight }),
  calculateMealPriceTotal: () => {
    const { mealsAddOn } = get();
    const total = mealsAddOn.reduce((total, meal) => total + (parseFloat(meal.meal_price) * meal.count), 0);
    return total.toString();
  },
}));

function updateMeals(mealsToAdd: IMealAddOns, existingMeals: MealsItem[]): MealsItem[] {
  const existingMealIndex = existingMeals.findIndex(meal => meal.meal_name === mealsToAdd.meal_name);

  if (existingMealIndex !== -1) {
    console.log(`Meal with Name ${mealsToAdd.meal_name} already exists. Adding another.`);
    const updatedMealDetails = [...existingMeals];
    updatedMealDetails.push({ ...mealsToAdd, count: 1 });
    return updatedMealDetails;
  }

  return [...existingMeals, { ...mealsToAdd, count: 1 }];
}