import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axiosClient from "@/lib/axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface userData {
  imageUrl: string;
  fullName: string;
  dob: string;
  phoneNum: number;
}

const EditProfile: React.FC = () => {
  const [userData, setUserData] = useState<userData>({
    imageUrl: "",
    fullName: "",
    dob: "",
    phoneNum: 0,
  });

  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosClient.get("/user/detail-user");
        const { imageUrl, fullName, dob, phoneNum } = response.data;
        setUserData({
          imageUrl,
          fullName,
          dob,
          phoneNum,
        });
      } catch (error) {
        handleApiError(error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("userImageUrl");
    if (storedImageUrl) {
      setUserData((prevData) => ({
        ...prevData,
        imageUrl: storedImageUrl,
      }));
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { fullName, dob, phoneNum } = userData;
      await axiosClient.put("/user/profile", {
        fullName,
        dob,
        phoneNumber: phoneNum,
      });

      console.log("Profile updated successfully");
      localStorage.setItem("userImageUrl", userData.imageUrl);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      let response;
      if (userData.imageUrl) {
        response = await axiosClient.put("/user/profile-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${axiosClient.defaults.headers.common.Authorization}`,
          },
        });
      } else {
        response = await axiosClient.post("/user/profile-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${axiosClient.defaults.headers.common.Authorization}`,
          },
        });
      }

      const { urlImage } = response.data;

      setUserData((prevData) => ({
        ...prevData,
        imageUrl: urlImage,
      }));
      setPreviewUrl(null);

      console.log("Profile image updated successfully");
      localStorage.setItem("userImageUrl", urlImage);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error: any) => {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="ml-[140px] flex gap-10">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              className="h-[120px] w-[120px]"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <AvatarImage src={previewUrl || userData.imageUrl} />
              <AvatarFallback>{"NA"}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleUploadImage}
              className="text-sm font-medium text-primary-500"
            >
              Change
            </button>
          </div>
          <div>
            <div className="flex w-[343px] flex-col gap-5">
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleInputChange}
                placeholder="Full name"
                className="border-b border-gray-200 bg-[#FBFBFB] py-3 text-base font-normal text-black placeholder:text-gray-300 focus:outline-none"
              />
              <input
                type="text"
                name="dob"
                value={userData.dob}
                onChange={handleInputChange}
                placeholder="Date of birth (DD/MM/YYYY)"
                className="border-b border-gray-200 bg-[#FBFBFB] py-3 text-base font-normal text-black placeholder:text-gray-300 focus:outline-none"
              />
              <div className="flex gap-3 border-b border-gray-200 py-3 text-base font-normal text-black">
                <p>+62</p>
                <span>|</span>
                <input
                  type="number"
                  name="phoneNum"
                  value={userData.phoneNum}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="bg-[#FBFBFB] text-black [appearance:textfield] placeholder:text-gray-300 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>
              <button
                type="submit"
                className="mt-8 h-14 rounded-xl bg-primary-500 py-4 text-sm font-medium text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
