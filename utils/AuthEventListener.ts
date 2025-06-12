import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

const AuthEventListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = () => {
      dispatch(logout());
      window.location.href = "/login";
    };
    window.addEventListener("app-logout", handleLogout);
    return () => window.removeEventListener("app-logout", handleLogout);
  }, [dispatch]);

  return null;
};

export default AuthEventListener;
