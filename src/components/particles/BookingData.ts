import { BookingUser } from "@/types/BookingUser";

export const data: BookingUser[] = [
    {
        "booking_id": 2,
        "user_id": "06b9d4a3-09cd-440f-ab18-2423f62fadb5",
        "booking_code": "BHJCYAA",
        "total_passenger": 2,
        "expired_time": "2024-02-14T21:00:00.000Z",
        "total_amount": 200000,
        "full_protection": true,
        "bag_insurance": true,
        "flight_delay": true,
        "payment_method": null,
        "status": "expired",
        "created_at": "2024-02-06T05:01:32.166Z",
        "updated_at": null,
        "fullName": "Saifulloh Fadli",
        "email": "saifulloh.fadli@gmail.com",
        "phone": "2323231231",
        "map_ticket": [
            {
                "map_ticket_id": 1,
                "booking_id": 2,
                "ticket_id": 1
            }
        ],
        "passengers": [
            {
                "passenger_id": 41,
                "booking_id": 2,
                "nik": "2323223123",
                "name": "Saifulloh Fadli",
                "date_of_birth": "2024-01-31T17:00:00.000Z",
                "vaccinated": true,
                "created_at": "2024-02-06T05:01:33.230Z",
                "updated_at": null,
                "courtesy_title": "Mr",
                "travel_docs": [
                    {
                        "travel_doc_id": 1,
                        "passenger_id": 41,
                        "doc_type": "passport",
                        "nationality": "Indonesia",
                        "doc_number": "1232132323",
                        "expired_date": "2024-02-06T04:53:23.787Z",
                        "file": "https://res.cloudinary.com/ddpriosuk/image/upload/v1707195574/wpgh1fzlebgjfwhue2kp.png",
                        "valid": false,
                        "created_at": "2024-02-06T05:01:33.298Z",
                        "updated_at": null
                    }
                ],
                "add_ons": [
                    {
                        "addon_id": 1,
                        "passenger_id": 41,
                        "trip_type": "departure",
                        "meal_name": "Fried Noodle",
                        "meal_price": "49000.00",
                        "meal_img": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.362Z",
                        "updated_at": null
                    },
                    {
                        "addon_id": 3,
                        "passenger_id": 41,
                        "trip_type": "departure",
                        "meal_name": "Salad",
                        "meal_price": "79000.00",
                        "meal_img": "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.397Z",
                        "updated_at": null
                    }
                ]
            },
            {
                "passenger_id": 42,
                "booking_id": 2,
                "nik": "23522687883",
                "name": "Bella Hadid",
                "date_of_birth": "2024-01-31T17:00:00.000Z",
                "vaccinated": true,
                "created_at": "2024-02-06T05:01:33.230Z",
                "updated_at": null,
                "courtesy_title": "Mr",
                "travel_docs": [
                    {
                        "travel_doc_id": 2,
                        "passenger_id": 42,
                        "doc_type": "passport",
                        "nationality": "Indonesia",
                        "doc_number": "23522687883",
                        "expired_date": "2024-02-06T04:53:23.796Z",
                        "file": "https://res.cloudinary.com/ddpriosuk/image/upload/v1707195617/bcgaym48nqolqyd8hk78.png",
                        "valid": false,
                        "created_at": "2024-02-06T05:01:33.304Z",
                        "updated_at": null
                    }
                ],
                "add_ons": [
                    {
                        "addon_id": 2,
                        "passenger_id": 42,
                        "trip_type": "departure",
                        "meal_name": "Fried Noodle",
                        "meal_price": "49000.00",
                        "meal_img": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.366Z",
                        "updated_at": null
                    },
                    {
                        "addon_id": 4,
                        "passenger_id": 42,
                        "trip_type": "departure",
                        "meal_name": "Salad",
                        "meal_price": "79000.00",
                        "meal_img": "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.426Z",
                        "updated_at": null
                    }
                ]
            }
        ],
        "tickets": [
            {
                "ticket_id": 1,
                "flight_id": 1,
                "ticket_type": "first-class",
                "ticket_amount": 120,
                "fare_amount": "200000.00",
                "valid_until": "2024-02-21T17:00:00.000Z",
                "created_at": "2024-02-05T15:58:42.729Z",
                "updated_at": null,
                "flight": {
                    "flight_id": 1,
                    "departure_id": 10,
                    "arrival_id": 23,
                    "airline_id": 1,
                    "transit": 0,
                    "first_seat": 20,
                    "business_seat": 50,
                    "economy_seat": 100,
                    "flight_status": "scheduled",
                    "flight_number": "1132",
                    "iata": "GI1132",
                    "created_at": "2024-02-05T15:56:24.371Z",
                    "updated_at": null,
                    "departure": {
                        "departure_id": 10,
                        "airport_id": 1,
                        "terminal": "1",
                        "scheduled_time": "2024-02-28T01:05:00.000Z",
                        "created_at": "2023-12-09T09:05:20.986Z",
                        "updated_at": "2024-02-05T16:11:25.524Z",
                        "airport_details": {
                            "airport_id": 1,
                            "airport_name": "Anaa",
                            "iata_code": "AAA",
                            "gmt": "-10",
                            "city_name": "Anaa",
                            "city_iata_code": "AAA",
                            "country_iso_code": "PF",
                            "country_name": "French Polynesia",
                            "created_at": "2023-12-09T09:05:20.986Z",
                            "updated_at": null
                        }
                    },
                    "arrival": {
                        "arrival_id": 23,
                        "airport_id": 23,
                        "terminal": "4",
                        "scheduled_time": "2024-01-06T07:30:00.000Z",
                        "created_at": "2023-12-09T09:05:20.986Z",
                        "updated_at": null,
                        "airport_details": {
                            "airport_id": 23,
                            "airport_name": "Lehigh Valley International",
                            "iata_code": "ABE",
                            "gmt": "-5",
                            "city_name": "Al Ghaydah",
                            "city_iata_code": "ABE",
                            "country_iso_code": "US",
                            "country_name": "United States",
                            "created_at": "2023-12-09T09:05:20.986Z",
                            "updated_at": null
                        }
                    },
                    "airline": {
                        "airline_id": 1,
                        "name": "Garuda Indonesia",
                        "iata": "GA",
                        "image": "https://res.cloudinary.com/ddpriosuk/image/upload/v1707197918/ex0qaklj98rebalftwiu.png",
                        "created_at": "2024-02-05T15:36:11.708Z",
                        "updated_at": "2024-02-06T05:39:10.535Z"
                    }
                },
                "benefits": [
                    {
                        "benefit_id": 1,
                        "flight_id": 1,
                        "name": "Meals",
                        "detail": "Meals are included for free",
                        "created_at": "2024-02-05T15:56:54.371Z",
                        "updated_at": null
                    },
                    {
                        "benefit_id": 2,
                        "flight_id": 1,
                        "name": "Baggage",
                        "detail": "Certain weight of baggage are allowed for free",
                        "created_at": "2024-02-05T15:57:25.967Z",
                        "updated_at": null
                    }
                ]
            }
        ]
    },
    {
        "booking_id": 3,
        "user_id": "06b9d4a3-09cd-440f-ab18-2423f62fadb5",
        "booking_code": "BHJCYBB",
        "total_passenger": 2,
        "expired_time": "2024-02-16T21:00:00.000Z",
        "total_amount": 200000,
        "full_protection": true,
        "bag_insurance": true,
        "flight_delay": true,
        "payment_method": null,
        "status": null,
        "created_at": "2024-02-06T05:01:32.166Z",
        "updated_at": null,
        "fullName": "Saifulloh Fadli",
        "email": "saifulloh.fadli@gmail.com",
        "phone": "2323231231",
        "map_ticket": [
            {
                "map_ticket_id": 1,
                "booking_id": 2,
                "ticket_id": 1
            }
        ],
        "passengers": [
            {
                "passenger_id": 41,
                "booking_id": 2,
                "nik": "2323223123",
                "name": "Saifulloh Fadli",
                "date_of_birth": "2024-01-31T17:00:00.000Z",
                "vaccinated": true,
                "created_at": "2024-02-06T05:01:33.230Z",
                "updated_at": null,
                "courtesy_title": "Mr",
                "travel_docs": [
                    {
                        "travel_doc_id": 1,
                        "passenger_id": 41,
                        "doc_type": "passport",
                        "nationality": "Indonesia",
                        "doc_number": "1232132323",
                        "expired_date": "2024-02-06T04:53:23.787Z",
                        "file": "https://res.cloudinary.com/ddpriosuk/image/upload/v1707195574/wpgh1fzlebgjfwhue2kp.png",
                        "valid": false,
                        "created_at": "2024-02-06T05:01:33.298Z",
                        "updated_at": null
                    }
                ],
                "add_ons": [
                    {
                        "addon_id": 1,
                        "passenger_id": 41,
                        "trip_type": "departure",
                        "meal_name": "Fried Noodle",
                        "meal_price": "49000.00",
                        "meal_img": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.362Z",
                        "updated_at": null
                    },
                    {
                        "addon_id": 3,
                        "passenger_id": 41,
                        "trip_type": "departure",
                        "meal_name": "Salad",
                        "meal_price": "79000.00",
                        "meal_img": "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.397Z",
                        "updated_at": null
                    }
                ]
            },
            {
                "passenger_id": 42,
                "booking_id": 2,
                "nik": "23522687883",
                "name": "Bella Hadid",
                "date_of_birth": "2024-01-31T17:00:00.000Z",
                "vaccinated": true,
                "created_at": "2024-02-06T05:01:33.230Z",
                "updated_at": null,
                "courtesy_title": "Mr",
                "travel_docs": [
                    {
                        "travel_doc_id": 2,
                        "passenger_id": 42,
                        "doc_type": "passport",
                        "nationality": "Indonesia",
                        "doc_number": "23522687883",
                        "expired_date": "2024-02-06T04:53:23.796Z",
                        "file": "https://res.cloudinary.com/ddpriosuk/image/upload/v1707195617/bcgaym48nqolqyd8hk78.png",
                        "valid": false,
                        "created_at": "2024-02-06T05:01:33.304Z",
                        "updated_at": null
                    }
                ],
                "add_ons": [
                    {
                        "addon_id": 2,
                        "passenger_id": 42,
                        "trip_type": "departure",
                        "meal_name": "Fried Noodle",
                        "meal_price": "49000.00",
                        "meal_img": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.366Z",
                        "updated_at": null
                    },
                    {
                        "addon_id": 4,
                        "passenger_id": 42,
                        "trip_type": "departure",
                        "meal_name": "Salad",
                        "meal_price": "79000.00",
                        "meal_img": "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600",
                        "meal_count": 1,
                        "baggage_weight": "24 KG",
                        "baggage_price": "299000.00",
                        "created_at": "2024-02-06T05:01:33.426Z",
                        "updated_at": null
                    }
                ]
            }
        ],
        "tickets": [
            {
                "ticket_id": 1,
                "flight_id": 1,
                "ticket_type": "first-class",
                "ticket_amount": 120,
                "fare_amount": "200000.00",
                "valid_until": "2024-02-21T17:00:00.000Z",
                "created_at": "2024-02-05T15:58:42.729Z",
                "updated_at": null,
                "flight": {
                    "flight_id": 1,
                    "departure_id": 10,
                    "arrival_id": 23,
                    "airline_id": 1,
                    "transit": 0,
                    "first_seat": 20,
                    "business_seat": 50,
                    "economy_seat": 100,
                    "flight_status": "scheduled",
                    "flight_number": "1132",
                    "iata": "GI1132",
                    "created_at": "2024-02-05T15:56:24.371Z",
                    "updated_at": null,
                    "departure": {
                        "departure_id": 10,
                        "airport_id": 1,
                        "terminal": "1",
                        "scheduled_time": "2024-02-28T01:05:00.000Z",
                        "created_at": "2023-12-09T09:05:20.986Z",
                        "updated_at": "2024-02-05T16:11:25.524Z",
                        "airport_details": {
                            "airport_id": 1,
                            "airport_name": "Anaa",
                            "iata_code": "AAA",
                            "gmt": "-10",
                            "city_name": "Anaa",
                            "city_iata_code": "AAA",
                            "country_iso_code": "PF",
                            "country_name": "French Polynesia",
                            "created_at": "2023-12-09T09:05:20.986Z",
                            "updated_at": null
                        }
                    },
                    "arrival": {
                        "arrival_id": 23,
                        "airport_id": 23,
                        "terminal": "4",
                        "scheduled_time": "2024-01-06T07:30:00.000Z",
                        "created_at": "2023-12-09T09:05:20.986Z",
                        "updated_at": null,
                        "airport_details": {
                            "airport_id": 23,
                            "airport_name": "Lehigh Valley International",
                            "iata_code": "ABE",
                            "gmt": "-5",
                            "city_name": "Al Ghaydah",
                            "city_iata_code": "ABE",
                            "country_iso_code": "US",
                            "country_name": "United States",
                            "created_at": "2023-12-09T09:05:20.986Z",
                            "updated_at": null
                        }
                    },
                    "airline": {
                        "airline_id": 1,
                        "name": "Garuda Indonesia",
                        "iata": "GA",
                        "image": "https://res.cloudinary.com/ddpriosuk/image/upload/v1707197918/ex0qaklj98rebalftwiu.png",
                        "created_at": "2024-02-05T15:36:11.708Z",
                        "updated_at": "2024-02-06T05:39:10.535Z"
                    }
                },
                "benefits": [
                    {
                        "benefit_id": 1,
                        "flight_id": 1,
                        "name": "Meals",
                        "detail": "Meals are included for free",
                        "created_at": "2024-02-05T15:56:54.371Z",
                        "updated_at": null
                    },
                    {
                        "benefit_id": 2,
                        "flight_id": 1,
                        "name": "Baggage",
                        "detail": "Certain weight of baggage are allowed for free",
                        "created_at": "2024-02-05T15:57:25.967Z",
                        "updated_at": null
                    }
                ]
            }
        ]
    }
]