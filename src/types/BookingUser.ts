import { Ticket } from "./Ticket";

interface BookingDetails {
  bookingId:number;
  booking_code: string | null;
  totalPassenger: number;
  expiredTime: string;
  totalAmount: number;
  fullProtection: boolean;
  bagInsurance: boolean;
  flightDelay: boolean;
  paymentMethod: string | null;
  status: string;
  createdAt: string;
  updatedAt: null | string;
}

interface TicketDetails {
  booked_ticket: Ticket[];
  expired_time: string
}

interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
}

interface TravelDocs {
  doc_type: string;
  nationality: string;
  document_number: string;
  expire_date: string;
  image_url: string;
}

interface AddOns {
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

interface PassengerDetails {
  id: string;
  nik: string;
  fullName: string;
  dateOfBirth: string;
  courtesy_title: string;
  vaccinated: string;
  travel_docs: TravelDocs[];
  add_ons: AddOns[];
  count: number
}

export interface BookingUser {
  booking_details: BookingDetails;
  ticket_details: TicketDetails;
  contact_details: ContactDetails;
  passenger_details: PassengerDetails[];
}