interface TravelDocs {
  travel_doc_id: number;
  passenger_id: number;
  doc_type: string;
  nationality: string;
  doc_number: string;
  expired_date: string;
  file: string;
  valid: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface AddOns {
  addon_id: number;
  passenger_id: number;
  trip_type: string;
  meal_name: string;
  meal_price: string;
  meal_img: string;
  meal_count: number;
  baggage_weight: string;
  baggage_price: string;
  created_at: string;
  updated_at: string | null;
}

export interface Passenger {
  passenger_id: number;
  booking_id: number;
  nik: string;
  name: string;
  date_of_birth: string;
  vaccinated: boolean;
  created_at: string;
  updated_at: string | null;
  courtesy_title: string;
  travel_docs: TravelDocs[];
  add_ons: AddOns[];
}

interface MapTicket {
  map_ticket_id: number;
  booking_id: number;
  ticket_id: number;
  boarding_code: string;
}

interface Departure {
  departure_id: number;
  airport_id: number;
  terminal: string;
  scheduled_time: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
  airport_details: AirportDetails;
}

interface AirportDetails {
  airport_id: number;
  airport_name: string;
  iata_code: string;
  gmt: string;
  city_name: string;
  city_iata_code: string;
  country_iso_code: string;
  country_name: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
}

interface Arrival {
  arrival_id: number;
  airport_id: number;
  terminal: string | null;
  scheduled_time: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
  airport_details: AirportDetails;
}

interface Airline {
  airline_id: number;
  name: string;
  iata: string;
  image: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
}

interface Flight {
  flight_id: number;
  departure_id: number;
  arrival_id: number;
  airline_id: number;
  transit: number;
  first_seat: number;
  business_seat: number;
  economy_seat: number;
  flight_status: string;
  flight_number: string;
  iata: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
  departure: Departure;
  arrival: Arrival;
  airline: Airline;
}

interface Benefit {
  benefit_id: number;
  flight_id: number;
  name: string;
  detail: string;
  created_at: string;
  updated_at: string | null;
}

export interface TicketDetail {
  ticket_id: number;
  flight_id: number;
  ticket_type: string;
  ticket_amount: number;
  fare_amount: string;
  valid_until: string;
  created_at: string;
  updated_at: string | null;
  flight: Flight;
  benefits: Benefit[];
}

export interface BookingUser {
  booking_id: number;
  user_id: string;
  booking_code: string | null;
  total_passenger: number;
  expired_time: string;
  total_amount: number;
  full_protection: boolean;
  bag_insurance: boolean;
  flight_delay: boolean;
  payment_method: string | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
  fullName: string;
  email: string;
  phone: string;
  map_ticket: MapTicket[];
  passengers: Passenger[];
  tickets: TicketDetail[];
}
