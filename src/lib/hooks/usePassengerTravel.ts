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

interface PassengerData {
  nik: string;
  fullName: string;
  dateOfBirth: Date | null;
}

interface PassengerGroup {
  [key: string]: PassengerData;
}

interface FormValues {
  passengers: {
    adults: PassengerGroup;
    childs: PassengerGroup;
    infants: PassengerGroup;
  };
}

export const restructureData = (data: any): FormValues => {
  const passengers: FormValues['passengers'] = {
    adults: {},
    childs: {},
    infants: {},
  };

  for (const key in data) {
    if (key.includes('adult')) {
      const index = key.split('-')[2];
      passengers.adults[`adult-${index}`] = {
        nik: data[`adult-nik-${index}`],
        fullName: data[`adult-fullName-${index}`],
        dateOfBirth: data[`adult-dateOfBirth-${index}`],
      };
    } else if (key.includes('child')) {
      const index = key.split('-')[2];
      passengers.childs[`child-${index}`] = {
        nik: data[`child-nik-${index}`],
        fullName: data[`child-fullName-${index}`],
        dateOfBirth: data[`child-dateOfBirth-${index}`],
      };
    } else if (key.includes('infant')) {
      const index = key.split('-')[2];
      passengers.infants[`infant-${index}`] = {
        nik: data[`infant-nik-${index}`],
        fullName: data[`infant-fullName-${index}`],
        dateOfBirth: data[`infant-dateOfBirth-${index}`],
      };
    }
  }

  return { passengers };
};

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
