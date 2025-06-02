import { BACKEND_URL } from "@/constants/connection";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
