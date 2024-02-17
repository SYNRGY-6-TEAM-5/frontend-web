import { ChangeEvent, useCallback, useState } from 'react';

import { IParams, IApiResponse, IMeta } from '@/types/ApiResponse';
import { AirportDetails } from '@/types/Ticket';
import axiosFSW from '../axiosFSW';

type AirportData = Array<AirportDetails>;

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
            const response = await axiosFSW.get<IApiResponse<AirportData>>(
                '/airport/',
                {
                    params,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },

                }
            );
            setAirports(response?.data.data);
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

    return {
        airports,
        params,
        loading,
        meta,
        fetchAirports,
        setParams,
        handleSearch,
        handleSubmit,
    };
}