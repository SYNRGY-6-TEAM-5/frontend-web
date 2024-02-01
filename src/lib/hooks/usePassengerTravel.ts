import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axiosClient from "../axios";
import { useToast } from "@/components/ui/use-toast";

import { ApiError } from "@/types/ApiError";
import Cookies from "js-cookie";
import { handleApiError } from "../errorApiHandler";

interface formFillPassenger {
  fullName: string;
  dob: Date;
  nik: string;
}

export const useFillPassenger = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const token = Cookies.get("accesstoken");

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["fillPassengerDetails"],
    mutationFn: async (data: formFillPassenger) => {
      const response = await axiosClient.put(`/user/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    onSuccess(data) {
      if (data.status === 200) {
        navigate("/account-created");
      }
    },
    onError: (error: ApiError) => handleApiError(error, toast),
  });

  return { mutateAsync, error, isPending };
};
