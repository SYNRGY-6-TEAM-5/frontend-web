import { ICompleteBooking } from "@/types/Booking";
import { CartItem } from "@/store/useCartStore";

interface TripInsurance {
  type: string;
  price: number;
}

interface IMeal {
  meal_name: string;
  meal_price: string;
  meal_img: string;
}
interface IBaggage {
  baggage_weight: string;
  baggage_price: string;
}

interface IAddOnsSummary {
  passenger_name: string;
  meals: IMeal[];
  baggage: IBaggage;
}

export interface IPricePassenger {
  route: string;
  price: string;
  departCity: string;
  arriveCity: string;
  passenger: {
    adult: number;
    child: number;
    infant: number;
  };
  add_ons: IAddOnsSummary[];
  trip_insurance: TripInsurance[];
}

export function summarizeBooking(bookingData: ICompleteBooking, cart: CartItem[]): IPricePassenger[] {
  const departureFlight = cart[0];
  const returnFlight = cart[1] ? cart[1] : undefined;
  const passengers = bookingData.passenger_details.reduce((acc, passenger) => {
    if (passenger.id.includes('adult')) acc.adult += passenger.count || 0;
    else if (passenger.id.includes('child')) acc.child += passenger.count || 0;
    else if (passenger.id.includes('infant')) acc.infant += passenger.count || 0;
    return acc;
  }, { adult: 0, child: 0, infant: 0 });

  const departureAddOns = bookingData.passenger_addOns.map(addOn => ({
    passenger_name: addOn.passenger_name,
    meals: addOn.departure.meals,
    baggage: addOn.departure.baggage
  }));
  const returnAddOns = bookingData.passenger_addOns.map(addOn => ({
    passenger_name: addOn.passenger_name,
    meals: addOn.return.meals,
    baggage: addOn.return.baggage
  }));

  return [
    {
      route: 'departure',
      price: departureFlight?.fare_amount || "0",
      departCity: departureFlight?.flight.departure.airport_details.city_name || '',
      arriveCity: departureFlight?.flight.arrival.airport_details.city_name || '',
      passenger: passengers,
      add_ons: departureAddOns,
      trip_insurance: Object.values(bookingData.trip_insurance)
        .filter(insurance => Object.keys(insurance).length > 0),
    },
    {
      route: 'return',
      price: returnFlight?.fare_amount || "0",
      departCity: returnFlight?.flight.departure.airport_details.city_name || '',
      arriveCity: returnFlight?.flight.arrival.airport_details.city_name || '',
      passenger: passengers,
      add_ons: returnAddOns,
      trip_insurance: Object.values(bookingData.trip_insurance)
        .filter(insurance => Object.keys(insurance).length > 0),
    }
  ];
}

export const calculateTotalPrice = (data: IPricePassenger[]) => {
  let totalPrice = 0;

  if (data.length > 1 && data[1]?.departCity !== "") {
    data.forEach((item) => {
      totalPrice +=
        parseFloat(item.price) *
        (item.passenger.adult + item.passenger.child + item.passenger.infant);
      item.add_ons.forEach((addOn) => {
        addOn.meals.forEach((meal) => {
          totalPrice += parseFloat(meal.meal_price);
        });
        totalPrice += parseFloat(addOn.baggage.baggage_price);
      });
    });

    data[0]?.trip_insurance.forEach((insurance) => {
      totalPrice += insurance.price;
    });
  } else if (data.length > 0 && data[0]?.departCity !== "") {
    totalPrice +=
      parseFloat(data[0].price) *
      (data[0].passenger.adult + data[0].passenger.child + data[0].passenger.infant);
    data[0].add_ons.forEach((addOn) => {
      addOn.meals.forEach((meal) => {
        totalPrice += parseFloat(meal.meal_price);
      });
      totalPrice += parseFloat(addOn.baggage.baggage_price);
    });

    data[0]?.trip_insurance.forEach((insurance) => {
      totalPrice += insurance.price;
    });
  }

  return totalPrice;
};
