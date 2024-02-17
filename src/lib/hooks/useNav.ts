import { useState } from "react";
import Cookies from "js-cookie";
import { useProfileUserStore } from "@/store/useProfileUserStore";
import axiosClient from "../axios";

export interface IUser {
    id?: string;
    fullName?: string;
    email?: string;
    phoneNum?: number;
    password?: string;
    roleName?: string;
    imageUrl?: string;
    dob?: number;
    createdAt?: number;
}

export default function useNav() {
    const [userData, setUserData] = useState<IUser>();

    const [isOpen, setOpen] = useState<boolean>(false);

    const {setUserData: setDataStore} = useProfileUserStore()

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const handleLogout = () => {
        Cookies.remove("accesstoken");
        Cookies.remove("refreshtoken");
        window.location.href = "/login";
    };

    const getInitials = (name: string | null | undefined) => {
        if (name) {
            const words = name.trim().split(/\s+/);
            if (words.length >= 2) {
                return `${words[0].charAt(0)}${words[words.length - 1].charAt(0)}`;
            } else {
                return name.charAt(0) || "A";
            }
        } else {
            return "NA";
        }
    };    

    const fetchUserData = async () => {
        try {
            const token = Cookies.get("accesstoken");
            if (!token) {
                return;
            }

            const response = await axiosClient.get(
                "/user/detail-user",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userData: IUser = response.data;
            setDataStore(response.data)
            setUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return {
        userData,
        isOpen,
        handleOpen,
        handleClose,
        handleLogout,
        getInitials,
        fetchUserData
    };
}