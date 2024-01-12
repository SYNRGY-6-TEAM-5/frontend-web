import axios from 'axios';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export
    interface IParams {
    page?: number;
    size?: number;
    search?: string;
    departure_airport?: string;
    arrival_airport?: string;
    departure_date?: string;
}

export interface IApiResponse<T> {
    data: T;
    message: string;
    meta?: {
        page: number;
        size: number;
        totalData: number;
        totalPages: number;
    };
}

export interface IMeta {
    page: number;
    size: number;
    totalData: number;
    totalPages: number;
}

export interface IAirport {
    airport_id: number;
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
    created_at: string;
    updated_at: string | null;
    created_by: number;
    updated_by: number;
    city: {
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
    };

}

type AirportData = Array<IAirport>;

export default function useHome() {
    const [meta, setMeta] = useState<IMeta>();
    const [params, setParams] = useState<IParams>({
        page: 1,
        size: 10,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [airports, setAirports] = useState<AirportData>([]);

    const fetchAirports = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get<IApiResponse<AirportData>>(
                'https://binar-flight-app.fly.dev/api/airport/',
                {
                    params,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },

                }
            );
            console.log("Response hook >>> ", response);
            setAirports(response?.data.data);
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

    const handleSubmit = (data: any) => {
        // Assuming your data structure is available and has the necessary values
        const newParams: IParams = {
            departure_airport: data.origin?.iataCode || '',
            arrival_airport: data.destination?.iataCode || '',
            departure_date: data.date?.departureDate || '',
        };
    
        // Only create a new Date instance if departure_date is not an empty string
        const formattedDate = newParams.departure_date ? new Date(newParams.departure_date) : null;
    
        // Check if formattedDate is not null before calling toLocaleDateString
        const unformattedValue = formattedDate ? formattedDate.toISOString() : '';
        newParams.departure_date = unformattedValue;
    
        // Use the callback form of setParams to ensure you're working with the latest state
        setParams(prevParams => ({
            ...prevParams,
            ...newParams,
        }));
    };

    useEffect(() => {
        fetchAirports();
        console.log(params);
    }, [fetchAirports, params]);

    return {
        airports,
        params,
        loading,
        meta,
        setParams,
        handleSearch,
        handleSubmit,
    };
}