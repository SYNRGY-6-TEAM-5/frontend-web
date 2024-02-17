import { useQuery } from "@tanstack/react-query";

import Cookies from "js-cookie";
import { useState } from "react";
import axiosFSW from "../axiosFSW";
import { FormikValues } from "formik";

import { ISavedPassengerData } from "@/types/Booking";

export interface IFileItem {
  url: string;
  secure_url: string;
  width?: number;
  height?: number;
  resourceType?: string;
}

export const usePassengerTravel = () => {
  const [loadingCovers, setLoadingCovers] = useState<boolean[]>([]);
  const [fileItems, setFileItems] = useState<IFileItem[]>([]);

  const token = Cookies.get("accesstoken");

  const handleUploadTravelDoc = async (files: any, formIndex: number, formik: FormikValues) => {
    if (files && files.length > 0) {
      try {
        setLoadingCovers((prevLoadingCovers) => {
          const updatedLoadingCovers = [...prevLoadingCovers];
          updatedLoadingCovers[formIndex] = true;
          return updatedLoadingCovers;
        });

        const formData = new FormData();
        formData.append('image', files[0]);
        const response = await axiosFSW.post(
          `/travel-docs/user/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data', // Ensure correct content type
            },
          }
        );

        formik.setFieldValue(`travel_docs.${formIndex}.image_url`, response.data.data.secure_url);
        setFileItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[formIndex] = response.data.data;
          return updatedItems;
        });
      } catch (error) {
        console.error('error > ', error);
      } finally {
        setLoadingCovers((prevLoadingCovers) => {
          const updatedLoadingCovers = [...prevLoadingCovers];
          updatedLoadingCovers[formIndex] = false;
          return updatedLoadingCovers;
        });
      }
    }
  };

  return {
    loadingCovers,
    fileItems,
    handleUploadTravelDoc
  };
};

export const useListPassenger = () => {
  const token = Cookies.get("accesstoken");
  
  const { data, error, isFetching } = useQuery({
    queryKey: ["listSavedPassengerDetails"],
    queryFn: async () => {
      const response = await axiosFSW.get(`/passenger/user/saved-passenger`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, error, isFetching };
};

export const useGetPassenger = (saved_passenger_id: string) => {
  const token = Cookies.get("accesstoken");

  const { data, error, isFetching } = useQuery<ISavedPassengerData[], Error>({
    queryKey: ["getOneSavedPassengerDetails"],
    queryFn: async () => {
      const response = await axiosFSW.get(`/passenger/user/saved-passenger/${saved_passenger_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { data, error, isFetching };
};