import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";

const axiosFSW = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_FSW,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosFSW.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("accesstoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  },
);

export default axiosFSW;
