export const completeBooking = {
    ticket_details: {
        booked_ticket: [0, 0],
        total_ticket_price: 0,
        expired_time: new Date(),
    },
    user_data: {
        id: "",
        email_address: "",
        imageUrl: "",
        fullName: "",
        password: "",
        dob: 0,
        roleName: "",
        createdAt: 1706180739690
    },
    contact_details: {
        fullName: "",
        email: "",
        phone: "6"
    },
    passenger_details: [
        {
            id: "",
            nik: "",
            fullName: "",
            dateOfBirth: new Date("2024-02-01T17:00:00.000Z"),
            courtesy_title: "",
            vaccinated: "",
            travel_docs: [
                {
                    doc_type: "",
                    nationality: "",
                    document_number: "",
                    expire_date: new Date("2024-02-03T07:20:19.462Z"),
                    image_url: "g"
                }
            ],
            count: 1
        },
    ],
    passenger_addOns: [
        {
            passenger_name: "",
            departure: {
                meals: [
                    {
                        meal_name: "",
                        meal_price: "",
                        meal_img: "",
                        count: 1
                    },
                    {
                        meal_img: "",
                        meal_name: "",
                        meal_price: "",
                        count: 1
                    }
                ],
                baggage: {
                    baggage_weight: "",
                    baggage_price: "0"
                }
            },
            return: {
                meals: [
                    {
                        meal_img: "",
                        meal_name: "",
                        meal_price: "",
                        count: 1
                    }
                ],
                baggage: {
                    baggage_weight: "",
                    baggage_price: "0"
                }
            }
        }
    ],
    trip_insurance: {
        full_insurance: {
            type: "",
            price: 0
        },
        baggage_insurance: {
            type: "",
            price: 0
        },
        flight_delay_insurance: {
            type: "",
            price: 0
        }
    }
}