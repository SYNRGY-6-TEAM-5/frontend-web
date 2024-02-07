import { useMutation } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ApiError } from "@/types/ApiError";
import { handleApiError } from "../errorApiHandler";
import { ICompleteBooking } from "@/pages/booking/components/ui/CheckoutButton";

export const useBooking = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
  
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
        if (data.status === 201) {
          navigate("/user/payment");
        }
      },
      onError: (error: ApiError) => handleApiError(error, toast),
    });
  
    return { mutateAsync, error, isPending };
  };
