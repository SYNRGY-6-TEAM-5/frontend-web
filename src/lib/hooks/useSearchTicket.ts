import { useQuery } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";

export interface FlightSearchParams {
  page?: number;
  size?: number;
  departure_airport: string;
  arrival_airport: string;
  departure_date: string;
}

export const useSearchTicket = (params: FlightSearchParams) => {
  const { data, error, isFetching } = useQuery({
    queryKey: ["searchTicket"],
    queryFn: async () => {
      const response = await axiosFSW.get(`/ticket`, {
        params: params,
      });
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, error, isFetching };
};
