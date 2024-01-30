import { Ticket } from "@/types/Ticket";

export const ret_data: Ticket[] = [
    {
        ticket_id: 13,
        flight_id: 1,
        ticket_type: "first",
        ticket_amount: 20,
        fare_amount: "200000.00",
        valid_until: "2024-01-27T05:00:00.000Z",
        created_at: "2024-01-26T13:02:48.153Z",
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
            flight_status: "scheduled",
            flight_number: "6811",
            iata: "AA6811",
            created_at: "2023-12-09T09:05:20.986Z",
            updated_at: null,
            departure: {
                departure_id: 38,
                airport_id: 38,
                terminal: "3",
                scheduled_time: "2024-01-06T09:00:00.000Z",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null,
                airport_details: {
                    airport_id: 38,
                    airport_name: "Dougherty County",
                    iata_code: "ABY",
                    gmt: "-5",
                    city_name: "Albina",
                    city_iata_code: "ABY",
                    country_iso_code: "US",
                    country_name: "United States",
                    created_at: "2023-12-09T09:05:20.986Z",
                    updated_at: null
                }
            },
            arrival: {
                arrival_id: 60,
                airport_id: 60,
                terminal: "1",
                scheduled_time: "2024-01-06T15:05:00.000Z",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null,
                airport_details: {
                    airport_id: 60,
                    airport_name: "Aden International Airport",
                    iata_code: "ADE",
                    gmt: "3",
                    city_name: "Aguaclara",
                    city_iata_code: "ADE",
                    country_iso_code: "YE",
                    country_name: "Yemen",
                    created_at: "2023-12-09T09:05:20.986Z",
                    updated_at: null
                }
            },
            airline: {
                airline_id: 15,
                name: "Iberia",
                iata: "IB",
                image: "https://res.cloudinary.com/ddpriosuk/image/upload/v1694179155/icon_24hrs_bmttbd.png",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null
            }
        }
    },
    {
        ticket_id: 12,
        flight_id: 10,
        ticket_type: "first",
        ticket_amount: 50,
        fare_amount: "1500000.00",
        valid_until: "2024-01-30T17:00:00.000Z",
        created_at: "2024-01-24T17:04:22.710Z",
        updated_at: null,
        flight: {
            flight_id: 10,
            departure_id: 62,
            arrival_id: 54,
            airline_id: 77,
            transit: 0,
            first_seat: 20,
            business_seat: 120,
            economy_seat: 220,
            flight_status: "scheduled",
            flight_number: "6300",
            iata: "X16300",
            created_at: "2023-12-09T09:05:20.986Z",
            updated_at: null,
            departure: {
                departure_id: 62,
                airport_id: 62,
                terminal: "2",
                scheduled_time: "2024-01-06T08:55:00.000Z",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null,
                airport_details: {
                    airport_id: 62,
                    airport_name: "Lenawee County",
                    iata_code: "ADG",
                    gmt: "-5",
                    city_name: "Acuna",
                    city_iata_code: "ADG",
                    country_iso_code: "US",
                    country_name: "United States",
                    created_at: "2023-12-09T09:05:20.986Z",
                    updated_at: null
                }
            },
            arrival: {
                arrival_id: 54,
                airport_id: 54,
                terminal: "8",
                scheduled_time: "2024-01-06T12:00:00.000Z",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null,
                airport_details: {
                    airport_id: 54,
                    airport_name: "Arcata",
                    iata_code: "ACV",
                    gmt: "-8",
                    city_name: "Acandi",
                    city_iata_code: "ACV",
                    country_iso_code: "US",
                    country_name: "United States",
                    created_at: "2023-12-09T09:05:20.986Z",
                    updated_at: null
                }
            },
            airline: {
                airline_id: 77,
                name: "Sichuan Airlines",
                iata: "3U",
                image: "https://res.cloudinary.com/ddpriosuk/image/upload/v1694179155/icon_24hrs_bmttbd.png",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null
            }
        }
    },
    {
        ticket_id: 10,
        flight_id: 9,
        ticket_type: "first",
        ticket_amount: 15,
        fare_amount: "1200000.00",
        valid_until: "2024-01-29T17:00:00.000Z",
        created_at: "2024-01-24T17:02:50.031Z",
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
            flight_status: "scheduled",
            flight_number: "8387",
            iata: "G58387",
            created_at: "2023-12-09T09:05:20.986Z",
            updated_at: null,
            departure: {
                departure_id: 51,
                airport_id: 51,
                terminal: "8",
                scheduled_time: "2024-01-06T14:55:00.000Z",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null,
                airport_details: {
                    airport_id: 51,
                    airport_name: "Araracuara",
                    iata_code: "ACR",
                    gmt: "-5",
                    city_name: "Acapulco",
                    city_iata_code: "ACR",
                    country_iso_code: "CO",
                    country_name: "Colombia",
                    created_at: "2023-12-09T09:05:20.986Z",
                    updated_at: null
                }
            },
            arrival: {
                arrival_id: 78,
                airport_id: 78,
                terminal: "I",
                scheduled_time: "2024-01-06T14:15:00.000Z",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null,
                airport_details: {
                    airport_id: 78,
                    airport_name: "Abemama Atoll",
                    iata_code: "AEA",
                    gmt: "12",
                    city_name: "Arandis",
                    city_iata_code: "AEA",
                    country_iso_code: "KI",
                    country_name: "Kiribati",
                    created_at: "2023-12-09T09:05:20.986Z",
                    updated_at: null
                }
            },
            airline: {
                airline_id: 92,
                name: "Shandong Airlines",
                iata: "SC",
                image: "https://res.cloudinary.com/ddpriosuk/image/upload/v1694179155/icon_24hrs_bmttbd.png",
                created_at: "2023-12-09T09:05:20.986Z",
                updated_at: null
            }
        }
    },
  ];