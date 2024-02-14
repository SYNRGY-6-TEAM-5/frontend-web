import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";
import { BookingUser } from "@/types/BookingUser";

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

export const useGetUserBooking = () => {
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useQuery<BookingUser[], Error>({
    queryKey: ["userBooking"],
    queryFn: async () => {
      const response = await axiosFSW.get<IApiResponse<BookingUser[]>>(`/user/booking`);
      return response.data.data;
    },
    initialData: () => {
      const cacheData = queryClient.getQueryData<BookingUser[]>([
        "userBooking",
      ]);
      return cacheData ?? undefined;
    },
    staleTime: 60000,
    gcTime: 3600000,
    refetchOnWindowFocus: false,
  });

  return { data, error, isFetching };
};

export const useGetDetailUserBooking = (id?: string) => {
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useQuery<BookingUser, Error>({
    queryKey: ["detailUserBooking", id],
    queryFn: async () => {
      const response = await axiosFSW.get<IApiResponse<BookingUser[]>>(`/user/booking/${id}`);
      return response.data.data[0];
    },
    initialData: () => {
      return queryClient.getQueryData<BookingUser>(["detailUserBooking", id]);
    },
    staleTime: 60000,
    gcTime: 3600000,
    refetchOnWindowFocus: false,
  });

  return { data, error, isFetching };
};
