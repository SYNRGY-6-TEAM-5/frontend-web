import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import axiosClient from "./axios";

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

axiosFSW.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = Cookies.get("refreshtoken");
        const response: any = await axiosClient.post('/auth/refresh-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { token: newToken } = response.data;

        Cookies.set('accesstoken', newToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosFSW;
