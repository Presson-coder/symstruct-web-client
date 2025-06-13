import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { BACKEND_URL } from "@/constants/connection";
import axiosInstance from "./axiosInstance";

const AuthEventListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = () => {
      axiosInstance
        .post(`${BACKEND_URL}auth/logout`, {})
        .then((response) => {
          console.log("Logout result ::", response.data.message);
          dispatch(logout());
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    };
    window.addEventListener("app-logout", handleLogout);
    return () => window.removeEventListener("app-logout", handleLogout);
  }, [dispatch]);

  return null;
};

export default AuthEventListener;
