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
