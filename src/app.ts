import { getAccessToken, setToken } from "@/lib/Token";
import axios, { AxiosError } from "axios";
import axiosRetry from "axios-retry";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout:2000,
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
 async (error) => {
    const originalRequest = error.config;

    if(error.response.status ===401 && !originalRequest._retry){
      originalRequest._retry=true;
      try{
        const response  = await api.post("/auth/refresh");
        setToken(response.data.accessToken);
        return api(originalRequest);

      }
      catch(refresherror){
        setToken("");
        return Promise.reject(refresherror);
      }
    }
    return Promise.reject(error);
  },
);
export default api;
