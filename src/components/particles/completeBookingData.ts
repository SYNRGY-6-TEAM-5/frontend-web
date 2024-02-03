export const completeBooking = {
    ticket_details: {
        booked_ticket: [
            {
                ticket_id: 13,
                flight_id: 1,
                ticket_type: "",
                ticket_amount: 20,
                fare_amount: "",
                valid_until: "",
                created_at: "",
                updated_at: null,
                flight: {
                    flight_id: 1,
                    departure_id: 38,
                    arrival_id: 60,
                    airline_id: 15,
                    transit: 0,
                    first_seat: 20,
                    business_seat: 120,
                    economy_seat: 220,
                    flight_status: "",
                    flight_number: "",
                    iata: "",
                    created_at: "",
                    updated_at: null,
                    departure: {
                        departure_id: 38,
                        airport_id: 38,
                        terminal: "",
                        scheduled_time: "",
                        created_at: "",
                        updated_at: null,
                        airport_details: {
                            airport_id: 38,
                            airport_name: "",
                            iata_code: "",
                            gmt: "",
                            city_name: "",
                            city_iata_code: "",
                            country_iso_code: "",
                            country_name: "",
                            created_at: "",
                            updated_at: null
                        }
                    },
                    arrival: {
                        arrival_id: 60,
                        airport_id: 60,
                        terminal: "",
                        scheduled_time: "",
                        created_at: "",
                        updated_at: null,
                        airport_details: {
                            airport_id: 60,
                            airport_name: "",
                            iata_code: "",
                            gmt: "",
                            city_name: "",
                            city_iata_code: "",
                            country_iso_code: "",
                            country_name: "",
                            created_at: "",
                            updated_at: null
                        }
                    },
                    airline: {
                        airline_id: 15,
                        name: "",
                        iata: "",
                        image: "",
                        created_at: "",
                        updated_at: null
                    }
                },
                count: 1
            },
            {
                ticket_id: 10,
                flight_id: 9,
                ticket_type: "",
                ticket_amount: 15,
                fare_amount: "",
                valid_until: "",
                created_at: "",
                updated_at: null,
                flight: {
                    flight_id: 9,
                    departure_id: 51,
                    arrival_id: 78,
                    airline_id: 92,
                    transit: 0,
                    first_seat: 20,
                    business_seat: 120,
                    economy_seat: 220,
                    flight_status: "",
                    flight_number: "",
                    iata: "",
                    created_at: "",
                    updated_at: null,
                    departure: {
                        departure_id: 51,
                        airport_id: 51,
                        terminal: "",
                        scheduled_time: "",
                        created_at: "",
                        updated_at: null,
                        airport_details: {
                            airport_id: 51,
                            airport_name: "",
                            iata_code: "",
                            gmt: "",
                            city_name: "",
                            city_iata_code: "",
                            country_iso_code: "",
                            country_name: "",
                            created_at: "",
                            updated_at: null
                        }
                    },
                    arrival: {
                        arrival_id: 78,
                        airport_id: 78,
                        terminal: "",
                        scheduled_time: "",
                        created_at: "",
                        updated_at: null,
                        airport_details: {
                            airport_id: 78,
                            airport_name: "",
                            iata_code: "",
                            gmt: "",
                            city_name: "",
                            city_iata_code: "",
                            country_iso_code: "",
                            country_name: "",
                            created_at: "",
                            updated_at: null
                        }
                    },
                    airline: {
                        airline_id: 92,
                        name: "",
                        iata: "",
                        image: "",
                        created_at: "",
                        updated_at: null
                    }
                },
                count: 1
            }
        ],
        total_ticket_price: 1400000
    },
    user_data: {
        user_id: "",
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
        full_insurance: {},
        baggage_insurance: {
            type: "",
            price: 0
        },
        flight_delay_insurance: {}
    }
}