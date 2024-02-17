import { ChangeEvent, useCallback, useState } from 'react';

import { IParams, IApiResponse, IMeta } from '@/types/ApiResponse';
import { Airline } from '@/types/Ticket';
import { Seat } from '@/types/Ticket';
import axiosFSW from '../axiosFSW';

type AirlineData = Array<Airline>;

export default function useFilter() {
    const [filterSort, setFilterSort] = useState<string>("");
    const [filterDepartureTime, setFilterDepartureTime] = useState<string>("");
    const [cabinClass, setCabinClass] = useState<string>("Economy");
    const [layover, setLayover] = useState<string>("Any");
    const [sliderValues, setSliderValues] = useState({
        flightDuration: 50,
        stopDuration: 50
    });
    const [filter, setFilter] = useState<Seat>({
        ticket_class: "",
        adult_seat: 0,
        child_seat: 0,
        total_seat: 0,
        infant_seat: 0,
    });

    const [meta, setMeta] = useState<IMeta>();
    const [params, setParams] = useState<IParams>({
        page: 1,
        size: 10,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [airlines, setAirlines] = useState<AirlineData>([]);

    const handleFilterSortChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterSort(event.target.value);
    };

    const handleSliderChange = (name: string, value: number) => {
        setSliderValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };


    const handleFilterDepartureTimeChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        setFilterDepartureTime(event.target.value);
    };

    const fetchAirlines = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosFSW.get<IApiResponse<AirlineData>>(
                '/airline/',
                {
                    params,

                }
            );
            setAirlines(response?.data.data);
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

    const handleApply = (data: any) => {
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
        airlines,
        params,
        loading,
        meta,
        filterSort,
        filterDepartureTime,
        sliderValues,
        cabinClass,
        layover,
        filter, 
        setFilter, 
        setLayover,
        setCabinClass,
        handleSliderChange,
        handleFilterDepartureTimeChange,
        handleFilterSortChange,
        fetchAirlines,
        setParams,
        handleSearch,
        handleApply,
    };
}