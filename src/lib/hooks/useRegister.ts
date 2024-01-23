import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axiosClient from "../axios";
import { useToast } from "@/components/ui/use-toast";

import { ApiError } from "@/types/ApiError";
import Cookies from "js-cookie";
import { handleApiError } from "../errorApiHandler";

interface propsValidateOTP {
  otp: string;
}

interface otpDataTypes {
  expiredOTP: number;
  otp: string;
  success: boolean;
  email: string;
  password?: string;
}

export const useRegisterValidateOTP = ({ otp }: propsValidateOTP) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const otpData = Cookies.get("otpData");
  const parsedData: otpDataTypes = JSON.parse(otpData!);

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["registerValidateOTP"],
    mutationFn: async () => {
      const response = await axiosClient.post(`/auth/signup/validate-otp`, {
        email: parsedData.email,
        password: parsedData.password,
        otp,
      });
      return response;
    },
    onSuccess(data) {
      if (data.status === 200) {
        Cookies.set("otpData", data.data.token);
        navigate("/setup-profile");
      }
    },
    onError: (error: ApiError) => handleApiError(error, toast),
  });

  return { mutateAsync, error, isPending };
};

export const useRegisterUploadImage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const token = Cookies.get("otpData");

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["registerUploadImage"],
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosClient.post(
        `/user/profile-image?name=${file.name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

interface formFillProfile {
  fullName: string;
  dob: Date;
  phoneNumber: number;
}

export const useRegisterFillProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const token = Cookies.get("otpData");

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["registerFillProfile"],
    mutationFn: async (data: formFillProfile) => {
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
