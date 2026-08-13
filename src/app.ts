import { getAccessToken } from "@/lib/Token";
import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
import { error } from "console";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error: AxiosError) =>
    (axiosRetry.isNetworkError(error) ||
      (error.response?.status ?? 0) >= 500)

})
api.interceptors.request.use(
  (config) => {
    const accesstoken = getAccessToken();


    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default api;
