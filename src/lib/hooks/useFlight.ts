import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';

interface IParams {
    page?: number;
    size?: number;
    search?: string;
    departure_airport?: string;
    arrival_airport?: string;
    departure_date?: string;
}

interface IApiResponse<T> {
    data: T;
    message: string;
    meta?: {
        page: number;
        size: number;
        totalData: number;
        totalPages: number;
    };
}

interface IMeta {
    page: number;
    size: number;
    totalData: number;
    totalPages: number;
}

interface IAirport {
    airport_id: number;
    city: Object;
    airport_name: string;
    iata_code: string;
    icao_code: string;
    latitude: string;
    longitude: string;
    geoname_id: string;
    timezone: string;
    gmt: string;
    phone_number: string;
    country_name: string;
    country_iso2: string;
    city_iata_code: string;
    created_by: number;
    updated_by: number;
}

interface ICity {
    gmt: number;
    iata_code: Object;
    country_iso2: string;
    geoname_id: string;
    latitude: string;
    longitude: string;
    city_name: string;
    timezone: string;
    created_by: number;
    updated_by: number;
}

interface IDeparture {
    departure_id: number;
    airport_id: number;
    airport: string;
    timezone: string;
    terminal: string;
    gate: string;
    delay: number;
    iata: string;
    icao: string;
    scheduled_time: string;
    estimated_time: string;
    actual_time: string;
    created_by: number;
    updated_by: number;
}

interface IArrival {
    arrival_id: number;
    airport_id: number;
    timezone: string;
    terminal: string;
    gate: string;
    delay: string;
    baggage: string;
    scheduled_time: string;
    estimated_time: string;
    actual_time: string;
    created_by: number;
    updated_by: number;
}

interface IFlight {
    flight_id: number;
    departure_id: number;
    arrival_id: number;
    airline_id: number;
    aircraft_id: number;
    live_id: number;
    flight_status: number;
    flight_date: Date;
    flight_number: string;
    iata: string;
    icao: string;
    created_by: number;
    updated_by: number;
}

interface IAirline {
    airline_id: number;
    name: string;
    iata: string;
    icao: string;
    created_by: number;
    updated_by: number;
}

interface IAircraft {
    aircraft_id: number;
    airplane_id: number;
    registration_number: string;
    iata: string;
    icao: string;
    icao24: string;
}

interface ILiveTracking {
    live_id: number;
    aircraft_id: number;
    updated: string;
    latitude: string;
    longitude: string;
    altitude: string;
    direction: string;
    speed_horizontal: string;
    speed_vertical: string;
    is_ground: string;
}

interface AirportWithCity extends IAirport {
    city: ICity;
}

interface DepartureWithAirport extends IDeparture {
    airport_details: AirportWithCity;
}

interface ArrivalWithAirport extends IArrival {
    airport_details: AirportWithCity;
}

interface FlightWithRelations extends IFlight {
    departure: DepartureWithAirport;
    arrival: ArrivalWithAirport;
    airline: IAirline;
    aircraft: IAircraft;
    live_tracking: ILiveTracking;
}

type FlightData = Array<FlightWithRelations>;

export default function useFlight() {
    const [meta, setMeta] = useState<IMeta>();
    const [params, setParams] = useState<IParams>({
        page: 1,
        size: 10,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [flights, setFlights] = useState<FlightData>([]);

    const fetchFlights = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get<IApiResponse<FlightData>>(
                'https://backend-node-production-df38.up.railway.app/api/flight/',
                {
                    params,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },

                }
            );
            console.log("Response hook >>> ", response);
            setFlights(response?.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoading(false);
        }
    }, [params]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParams({
            ...params,
            search: value,
        });
        console.log(params)
    };

    const handleFilter = (_paramsData: any) => {
        // Assuming your _paramsData structure is available and has the necessary values
        const newParams: IParams = {
            departure_airport: _paramsData.origin?.iataCode,
            arrival_airport: _paramsData.destination?.iataCode,
            departure_date: _paramsData.date.departureDate,
        };

        // Only create a new Date instance if departure_date is not an empty string
        const formattedDate = newParams.departure_date ? new Date(newParams.departure_date) : null;

        // Check if formattedDate is not null before constructing the formatted string
        const unformattedValue = formattedDate
            ? `${formattedDate.getFullYear()}-${String(formattedDate.getMonth() + 1).padStart(2, '0')}-${String(formattedDate.getDate()).padStart(2, '0')}`
            : '';

        setParams(prevParams => ({
            ...prevParams,
            departure_airport: newParams.departure_airport,
            arrival_airport: newParams.arrival_airport,
            departure_date: unformattedValue,
        }));
    };

    return {
        flights,
        params,
        loading,
        meta,
        fetchFlights,
        setParams,
        handleSearch,
        handleFilter
    };
}