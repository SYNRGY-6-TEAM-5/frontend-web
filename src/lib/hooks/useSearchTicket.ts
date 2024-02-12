import { useQuery } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";

export interface FlightSearchParams {
  page?: number;
  size?: number;
  departure_airport: string;
  arrival_airport: string;
  departure_date?: string;
  return_date?: string;
  trip_type?: string;
}

export interface LowestFare {
  scheduled_time: string;
  lowest_fare: number;
}

export const useSearchTicket = (params: FlightSearchParams) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["searchTicket", params],
    queryFn: async () => {
      const response = await axiosFSW.get(`/ticket`, {
        params: params,
      });
      return { data: response.data.data, count: response.data.meta.totalData };
    },
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  return { data, error, isFetching };
};

export const useFetchLowestFare = (params: FlightSearchParams) => {
  const { data, error, isFetching } = useQuery<LowestFare[], Error>({
    queryKey: ["fetchLowestFare"],
    queryFn: async () => {
      const response = await axiosFSW.get(`/ticket/lowest-fare`, {
        params: params,
      });
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, error, isFetching };
};

export const useFindTicket = (ticket_id: number) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["findTicket"],
    queryFn: async () => {
      const response = await axiosFSW.get(`/ticket/${ticket_id}`);
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, error, isFetching };
};
