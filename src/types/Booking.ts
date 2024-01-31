export interface ITravelDocs {
    doc_type: string;
    nationality: string;
    document_number: string;
    expire_date: Date;
    image_url: string;
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