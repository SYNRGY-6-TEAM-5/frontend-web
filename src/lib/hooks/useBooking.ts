import { useMutation } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ApiError } from "@/types/ApiError";
import { handleApiError } from "../errorApiHandler";
import { ICompleteBooking } from "@/types/Booking";
import { useEffect } from "react";
import useNav from "./useNav";

export const useBooking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userData, fetchUserData } = useNav();

  useEffect(() => {
    fetchUserData(); // Trigger fetching user data
  }, []);

  const token = Cookies.get("accesstoken");

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["userBooking"],
    mutationFn: async (data: ICompleteBooking) => {
      const response = await axiosFSW.post(`/user/booking`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    onSuccess(data) {
      console.log("data", data);
      if (data.status === 201) {
        const returnedBookingId = data.data.data.booking_data.bookingId;
        if (userData) {
          navigate(`/user/payment/${userData.id}/${parseInt(returnedBookingId, 10)}`);
        }
      }
    },
    onError: (error: ApiError) => handleApiError(error, toast),
  });

  return { mutateAsync, error, isPending };
};
