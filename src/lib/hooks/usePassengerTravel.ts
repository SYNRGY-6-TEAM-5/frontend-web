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

interface TravelDoc {
  docType: Date;
  nation: string;
  docNum: string;
  expDate: string;
}

interface PassengerData {
  nik: string;
  fullName: string;
  dateOfBirth: Date | null;
  travelDocs: TravelDoc[];
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
      const passengerKey = `adult-${index}`;
      if (!passengers.adults[passengerKey]) {
        passengers.adults[passengerKey] = {
          nik: data[`adult-nik-${index}`],
          fullName: data[`adult-fullName-${index}`],
          dateOfBirth: data[`adult-dateOfBirth-${index}`],
          travelDocs: [],
        };
      }
      if (key.startsWith('adult-doc')) {
        passengers.adults[passengerKey].travelDocs.push({
          expDate: data[`adult-exp-date-${index}`],
          docType: data[key],
          nation: data[`adult-nation-${index}`],
          docNum: data[`adult-doc-num-${index}`],
        });
      }
    } else if (key.includes('child')) {
      const index = key.split('-')[2];
      const passengerKey = `child-${index}`;
      if (!passengers.childs[passengerKey]) {
        passengers.childs[passengerKey] = {
          nik: data[`child-nik-${index}`],
          fullName: data[`child-fullName-${index}`],
          dateOfBirth: data[`child-dateOfBirth-${index}`],
          travelDocs: [],
        };
      }
      if (key.startsWith('child-doc')) {
        passengers.childs[passengerKey].travelDocs.push({
          expDate: data[`child-exp-date-${index}`],
          docType: data[key],
          nation: data[`child-nation-${index}`],
          docNum: data[`child-doc-num-${index}`],
        });
      }
    } else if (key.includes('infant')) {
      const index = key.split('-')[2];
      const passengerKey = `infant-${index}`;
      if (!passengers.infants[passengerKey]) {
        passengers.infants[passengerKey] = {
          nik: data[`infant-nik-${index}`],
          fullName: data[`infant-fullName-${index}`],
          dateOfBirth: data[`infant-dateOfBirth-${index}`],
          travelDocs: [],
        };
      }
      if (key.startsWith('infant-doc')) {
        passengers.infants[passengerKey].travelDocs.push({
          expDate: data[`infant-exp-date-${index}`],
          docType: data[key],
          nation: data[`infant-nation-${index}`],
          docNum: data[`infant-doc-num-${index}`],
        });
      }
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
