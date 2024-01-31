export interface AirportDetails {
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

interface Departure {
  departure_id: number;
  airport_id: number;
  terminal: string;
  scheduled_time: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
  airport_details: AirportDetails;
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

export interface Airline {
  airline_id: number;
  name: string;
  iata: string;
  image: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
}

export type Seat = {
  ticket_class: string
  adult_seat: number;
  child_seat: number;
  total_seat: number
  infant_seat: number;
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

export interface Ticket {
  ticket_id: number;
  flight_id: number;
  ticket_type: string;
  ticket_amount: number;
  fare_amount: string;
  valid_until: string;
  created_at: string;
  updated_at: null | string; // Adjust the type accordingly
  flight: Flight;
}

export interface ITripDetails {
  ticket_class: string;
  adult_seat: number;
  infant_seat: number;
  child_seat: number;
  total_seat: number;
  isInternational: boolean;
  trip_type: string;
} 
