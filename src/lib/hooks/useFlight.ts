import { ChangeEvent, useCallback, useState } from 'react';
import axiosFSW from '../axiosFSW';

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

export interface IAirport {
    airport_id: number;
    airport_name: string;
    iata_code: string;
    gmt: string;
    city_name: string;
    city_iata_code: string;
    country_name: string;
    country_iso_code: string;
}

export interface IDeparture {
    departure_id: number;
    airport_id: number;
    terminal: string;
    scheduled_time: string;
}

export interface IArrival {
    arrival_id: number;
    airport_id: number;
    terminal: string;
    scheduled_time: string;
}

export interface IAirline {
    airline_id: number;
    name: string;
    iata: string;
    image: string;
}

export interface IFlight {
    flight_id: number;
    departure_id: number;
    arrival_id: number;
    airline_id: number;

    transit: number;
    first_seat: number;
    business_seat: number;
    economy_seat: number;
    flight_status: string;
    flight_number: string;
    iata: string;
}

interface DepartureWithAirport extends IDeparture {
    airport_details: IAirport;
}

interface ArrivalWithAirport extends IArrival {
    airport_details: IAirport;
}

export interface FlightWithRelations extends IFlight {
    departure: DepartureWithAirport;
    arrival: ArrivalWithAirport;
    airline: IAirline;
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
            const response = await axiosFSW.get<IApiResponse<FlightData>>(
                '/flight/',
                {
                    params,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },

                }
            );
            setFlights(response?.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error('error > ', error);
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
    };

    const handleFilter = (_paramsData: any) => {
        const newParams: IParams = {
            departure_airport: _paramsData.origin?.iataCode,
            arrival_airport: _paramsData.destination?.iataCode,
            departure_date: _paramsData.date.departureDate,
        };

        const formattedDate = newParams.departure_date ? new Date(newParams.departure_date) : null;

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