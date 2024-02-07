import { IPersonAddOns } from "@/store/useAddOnsStore";
import { TripInsurance } from "@/store/useAddOnsStore";
import { IUser } from "@/lib/hooks/useNav";
import { Ticket } from "./Ticket";

export interface PassengerDetailsItem extends PassengerData {
    count: number;
}

export interface IContactDetails {
    fullName: string;
    email: string;
    phone: string;
}

export interface IMealAddOns {
    meal_img: string;
    meal_name: string;
    meal_price: string;
}

export interface IBaggageAddOns {
    baggage_weight: string;
    baggage_price: string;
}

export interface ITravelDocs {
    doc_type: string;
    nationality: string;
    document_number: string;
    expire_date: Date;
    image_url: string;
}

export interface IAddOns {
    meals: IMealAddOns[];
    baggage: IBaggageAddOns;
}

export interface PassengerData {
    id: string;
    nik: string;
    fullName: string;
    dateOfBirth: Date | null;
    courtesy_title: string;
    vaccinated: string;
    travel_docs: ITravelDocs[];
}

export interface ICompleteBooking {
    ticket_details: {
        booked_ticket: number[];
        total_ticket_price: number;
        expired_time: Date;
    };
    user_data?: IUser;
    contact_details: IContactDetails;
    passenger_details: PassengerDetailsItem[];
    passenger_addOns: IPersonAddOns[];
    trip_insurance: TripInsurance;
}

export interface ICompleteBookingWithTicket {
    ticket_details: {
        booked_ticket: Ticket[];
        total_ticket_price: number;
        expired_time: Date;
    };
    user_data?: IUser;
    contact_details: IContactDetails;
    passenger_details: PassengerDetailsItem[];
    passenger_addOns: IPersonAddOns[];
    trip_insurance: TripInsurance;
}