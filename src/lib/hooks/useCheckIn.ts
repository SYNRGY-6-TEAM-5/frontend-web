import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosFSW from "../axiosFSW";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ApiError } from "@/types/ApiError";
import { handleApiError } from "../errorApiHandler";

export const useCheckInBooking = (id: string) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["checkInBooking"],
    mutationFn: async () => {
      const response = await axiosFSW.put(`/user/booking/check-in/${id}`);
      return response;
    },
    onSuccess(data) {
      if (data.status === 201) {
        navigate(`/profile/booking/success/${id}`);
        queryClient.invalidateQueries({ queryKey: ["detailUserBooking"] });
      }
    },
    onError: (error: ApiError) => handleApiError(error, toast),
  });

  return { mutateAsync, error, isPending };
};
