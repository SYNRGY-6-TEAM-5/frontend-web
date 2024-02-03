import { IBaggageAddOns, IMealAddOns, IAddOns } from "@/types/Booking";
import { create } from "zustand";

export interface IPersonAddOns {
  passenger_name: string;
  departure: IAddOns;
  return: IAddOns;
}

export interface MealsItem extends IMealAddOns {
  count: number;
}

type AddOnsStore = {
  personAddOns: IPersonAddOns[];
  mealsAddOn: MealsItem[];
  baggageAddOn: IBaggageAddOns;
  returnMealsAddOn: MealsItem[];
  returnBaggageAddOn: IBaggageAddOns;
  isSelecting: boolean;
  type?: string;
  flight?: string;
  selectedFlightIndex: number;
  setSelectedFlightIndex: (flight_index: number) => void;
  addPersonAddOns: (personAddOns: IPersonAddOns) => void;
  addMeals: (meals: IMealAddOns) => void;
  removeMeal: (mealName: string) => void;
  setBaggageAddOn: (baggage: IBaggageAddOns) => void;
  addReturnMeals: (meals: IMealAddOns) => void;
  removeReturnMeal: (mealName: string) => void;
  setReturnBaggageAddOn: (baggage: IBaggageAddOns) => void;
  setSelect: (select: boolean) => void;
  setType: (type: string) => void;
  setFlight: (flight: string) => void;
  calculateMealPriceTotal: () => string;
  calculateReturnMealPriceTotal: () => string;
};

export const useAddOnsStore = create<AddOnsStore>((set, get) => ({
  personAddOns: [],
  mealsAddOn: [],
  baggageAddOn: {
    baggage_weight: "",
    baggage_price: ""
  },
  returnMealsAddOn: [],
  returnBaggageAddOn: {
    baggage_weight: "",
    baggage_price: ""
  },
  isSelecting: false,
  selectedFlightIndex: 0,
  setSelectedFlightIndex: (selectedFlightIndex) => set({ selectedFlightIndex }),
  addPersonAddOns: (personAddOns: IPersonAddOns) => {
    const { personAddOns: existingPersonAddOns } = get();
    const personIndex = existingPersonAddOns.findIndex(person => person.passenger_name === personAddOns.passenger_name);

    if (personIndex !== -1) {
      console.log(`Person with Name ${personAddOns.passenger_name} already exists. Updating.`);
      const updatedPersonAddOns = [...existingPersonAddOns];
      updatedPersonAddOns[personIndex] = personAddOns;
      set({ personAddOns: updatedPersonAddOns });
    } else {
      console.log(`Adding person with Name ${personAddOns.passenger_name}.`);
      set({ personAddOns: [...existingPersonAddOns, personAddOns] });
    }
  },
  addMeals: (meals: IMealAddOns) => {
    const { mealsAddOn: existingMeals } = get();
    const mealExists = existingMeals.some(meal => meal.meal_name === meals.meal_name);

    if (mealExists) {
      console.log(`Meal with Name ${meals.meal_name} already exists. Cannot add another.`);
      return;
    }

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
  addReturnMeals: (meals: IMealAddOns) => {
    const { returnMealsAddOn: existingMeals } = get();
    const mealExists = existingMeals.some(meal => meal.meal_name === meals.meal_name);

    if (mealExists) {
      console.log(`Meal with Name ${meals.meal_name} already exists. Cannot add another.`);
      return;
    }

    const updatedMeals = updateMeals(meals, existingMeals);
    set({ returnMealsAddOn: updatedMeals });
  },
  removeReturnMeal: (mealName: string) => {
    const { returnMealsAddOn: existingMeals } = get();
    const updatedMeals = existingMeals.filter(meal => meal.meal_name !== mealName);
    set({ returnMealsAddOn: updatedMeals });
  },
  setReturnBaggageAddOn: (baggage: IBaggageAddOns) => {
    set({ returnBaggageAddOn: baggage });
  },
  setSelect: (select) => set({ isSelecting: select }),
  setType: (type) => set({ type }),
  setFlight: (flight) => set({ flight }),
  calculateMealPriceTotal: () => {
    const { mealsAddOn } = get();
    const total = mealsAddOn.reduce((total, meal) => total + (parseFloat(meal.meal_price) * meal.count), 0);
    return total.toString();
  },
  calculateReturnMealPriceTotal: () => {
    const { returnMealsAddOn } = get();
    const total = returnMealsAddOn.reduce((total, meal) => total + (parseFloat(meal.meal_price) * meal.count), 0);
    return total.toString();
  },
}));

function updateMeals(mealsToAdd: IMealAddOns, existingMeals: MealsItem[]): MealsItem[] {
  const existingMealIndex = existingMeals.findIndex(meal => meal.meal_name === mealsToAdd.meal_name);

  if (existingMealIndex !== -1) {
    console.log(`Meal with Name ${mealsToAdd.meal_name} already exists. Adding another.`);
    return existingMeals;
  }

  return [...existingMeals, { ...mealsToAdd, count: 1 }];
}