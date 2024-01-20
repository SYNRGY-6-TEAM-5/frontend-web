import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import axiosClient from "../axios";
import { useToast } from "@/components/ui/use-toast";

import { ApiError } from "@/types/ApiError";
import Cookies from "js-cookie";
import { handleApiError } from "../errorApiHandler";

interface propsSendEmail {
  email: string;
}

interface responseSendEmail {
  expiredOTP: number;
  otp: string;
  success: boolean;
}

export const useResetSendEmail = ({ email }: propsSendEmail) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["resetSendEmail"],
    mutationFn: async () => {
      const response = await axiosClient.post<responseSendEmail>(
        `/auth/forgot-password`,
        {
          email,
        },
      );
      return response;
    },
    onSuccess(data) {
      if (data.status === 200) {
        Cookies.set(
          "forgotData",
          JSON.stringify({ ...data.data, email: email }),
        );
        navigate("/forgot-password/otp");
      }
    },
    onError: (error: ApiError) => handleApiError(error, toast),
  });

  return { mutateAsync, error, isPending };
};

interface propsValidateOTP {
  otp: string;
}

interface forgotDataTypes {
  expiredOTP: number;
  otp: string;
  success: boolean;
  email: string;
}

export const useResetValidateOTP = ({ otp }: propsValidateOTP) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const forgotData = Cookies.get("forgotData");
  const parsedData: forgotDataTypes = JSON.parse(forgotData!);

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["resetValidateOTP"],
    mutationFn: async () => {
      const response = await axiosClient.post(
        `/auth/forgot-password/validate-otp`,
        {
          email: parsedData.email,
          otp,
        },
      );
      return response;
    },
    onSuccess(data) {
      if (data.status === 200) {
        Cookies.set("forgotData", data.data.token);
        location.pathname === "/otp"
          ? navigate("/setup-profile")
          : navigate("/forgot-password/change-password");
      }
    },
    onError: (error: ApiError) => handleApiError(error, toast),
  });

  return { mutateAsync, error, isPending };
};

interface formChangePassword {
  newPassword: string;
  retypePassword: string;
}

export const useResetChangePassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const token = Cookies.get("forgotData");

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["resetChangePassword"],
    mutationFn: async (data: formChangePassword) => {
      const response = await axiosClient.put(
        `/auth/forgot-password/edit-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response;
    },
    onSuccess(data) {
      if (data.status === 200) {
        navigate("/forgot-password/reset");
      }
    },
    onError: (error: ApiError) => handleApiError(error, toast),
  });

  return { mutateAsync, error, isPending };
};
