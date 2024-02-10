import { CartItem } from "@/store/useCartStore";
import { Ticket } from "@/types/Ticket";

interface TravelDocument {
    doc_type: string;
    nationality: string;
    document_number: string;
    expire_date: Date;
    image_url: string;
}

interface Meal {
    meal_name: string;
    meal_price: string;
    meal_img: string;
    count: number;
}

interface Baggage {
    baggage_weight: string;
    baggage_price: string;
}

interface PassengerAddOns {
    passenger_name: string;
    departure: {
        meals: Meal[];
        baggage: Baggage;
    };
    return: {
        meals: Meal[];
        baggage: Baggage;
    };
}

interface PassengerDetails {
    id: string;
    nik: string;
    fullName: string;
    dateOfBirth: Date;
    courtesy_title: string;
    vaccinated: string;
    travel_docs: TravelDocument[];
    count: number;
}

interface CompleteBooking {
    ticket_details: {
        booked_ticket: number[];
        total_ticket_price: number;
        expired_time: Date;
    };
    user_data: {
        id: string;
        email_address: string;
        imageUrl: string;
        fullName: string;
        password: string;
        dob: number;
        roleName: string;
        createdAt: number;
    };
    contact_details: {
        fullName: string;
        email: string;
        phone: string;
    };
    passenger_details: PassengerDetails[];
    passenger_addOns: PassengerAddOns[];
    trip_insurance: {
        full_insurance: {
            type: string;
            price: number;
        };
        baggage_insurance: {
            type: string;
            price: number;
        };
        flight_delay_insurance: {
            type: string;
            price: number;
        };
    };
}

const tripInsurance = [
    {
        type: "Full Protection",
        price: 95000
    },
    {
        type: "Baggage Insurance",
        price: 16000
    },
    {
        type: "Flight Delay",
        price: 16000
    }
]

export function transformCartData(data: any): CartItem[] {
    return data.ticket_details.booked_ticket.map((ticket: any) => ({
        ticket_id: ticket.ticket_id,
        flight_id: ticket.flight_id,
        ticket_type: ticket.ticket_type,
        ticket_amount: ticket.ticket_amount,
        fare_amount: ticket.fare_amount,
        valid_until: ticket.valid_until,
        created_at: ticket.created_at,
        updated_at: ticket.updated_at,
        flight: ticket.flight,
        count: 1,
    }));
}

export function formatVirtualAccount(input: string): string {
    const groups = input.match(/(\d{1})(\d{3})(\d{4})(\d{7})(\d{1})/);
    
    if (!groups) {
      throw new Error('Invalid input format');
    }
  
    const formattedString = groups.slice(1).join(' ');
  
    return formattedString;
  }

export function transformData(data: any): CompleteBooking {
    return {
        ticket_details: {
            booked_ticket: data.tickets.map((ticket: Ticket) => ticket),
            total_ticket_price: data.total_amount,
            expired_time: new Date(data.expired_time),
        },
        user_data: {
            id: data.user_id,
            email_address: data.email,
            imageUrl: "", 
            fullName: data.fullName,
            password: "", 
            dob: new Date(data.passengers[0].date_of_birth).getTime(),
            roleName: "", 
            createdAt: new Date(data.created_at).getTime(),
        },
        contact_details: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
        },
        passenger_details: data.passengers.map((passenger: any) => ({
            id: passenger.id,
            nik: passenger.nik,
            fullName: passenger.name,
            dateOfBirth: new Date(passenger.date_of_birth),
            courtesy_title: passenger.courtesy_title,
            vaccinated: passenger.vaccinated,
            travel_docs: passenger.travel_docs.map((doc: any) => ({
                doc_type: doc.doc_type,
                nationality: doc.nationality,
                document_number: doc.doc_number,
                expire_date: new Date(doc.expired_date),
                image_url: doc.file,
            })),
            count: 1, 
        })),
        passenger_addOns: data.passengers.map((passenger: any) => ({
            passenger_name: passenger.name,
            departure: {
                meals: passenger.add_ons.map((addOn: any) => ({
                    meal_name: addOn.meal_name,
                    meal_price: addOn.meal_price,
                    meal_img: addOn.meal_img,
                    count: 1, 
                })),
                baggage: {
                    baggage_weight: passenger.add_ons[0].baggage_weight,
                    baggage_price: passenger.add_ons[0].baggage_price,
                },
            },
            return: {
                meals: [], 
                baggage: { baggage_weight: "", baggage_price: "0" }, 
            },
        })),
        trip_insurance: {
            full_insurance: data.full_protection ? tripInsurance[0] : { type: "", price: 0 }, 
            baggage_insurance: data.bag_insurance ? tripInsurance[1] : { type: "", price: 0 }, 
            flight_delay_insurance: data.flight_delay ? tripInsurance[2] : { type: "", price: 0 }, 
        },
    };
}
