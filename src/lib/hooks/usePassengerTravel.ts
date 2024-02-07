import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import axiosClient from "../axios";
import { useToast } from "@/components/ui/use-toast";

import { ApiError } from "@/types/ApiError";
import Cookies from "js-cookie";
import { handleApiError } from "../errorApiHandler";
import { useState } from "react";
import axiosFSW from "../axiosFSW";
import { FormikValues } from "formik";

interface IBookingData {
  fullName: string;
  dob: Date;
  nik: string;
}

export interface IFileItem {
  url: string;
  secure_url: string;
  width?: number;
  height?: number;
  resourceType?: string;
}

export const useBooking = () => {
  const [loadingCovers, setLoadingCovers] = useState<boolean[]>([]);
  const [fileItems, setFileItems] = useState<IFileItem[]>([]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const token = Cookies.get("accesstoken");

  const handleUploadTravelDoc = async (files: any, formIndex: number, formik: FormikValues) => {
    console.log("selected files >>> ", files);
    if (files && files.length > 0) {
      try {
        setLoadingCovers((prevLoadingCovers) => {
          const updatedLoadingCovers = [...prevLoadingCovers];
          updatedLoadingCovers[formIndex] = true;
          return updatedLoadingCovers;
        });

        const formData = new FormData();
        formData.append('image', files[0]);

        console.log('formData >>> ', formData);

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
        console.log('error > ', error);
      } finally {
        setLoadingCovers((prevLoadingCovers) => {
          const updatedLoadingCovers = [...prevLoadingCovers];
          updatedLoadingCovers[formIndex] = false;
          return updatedLoadingCovers;
        });
      }
    }
  };

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: ["fillPassengerDetails"],
    mutationFn: async (data: IBookingData) => {
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

  return {
    error,
    isPending,
    loadingCovers,
    fileItems,
    mutateAsync,
    handleUploadTravelDoc
  };
};
