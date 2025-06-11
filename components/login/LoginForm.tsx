"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import axios from "axios";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaLock, FaRegEyeSlash } from "react-icons/fa";
import { IoMailOutline, IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/constants/connection";

const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "client",
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleValidation = (): boolean => {
    let valid = true;
    setEmailError("");

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(user.email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    return valid;
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}auth/login`, user);
      console.log("resposne :;", response);
      toast.success(response.data.message || "Login successful!");
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || "Registration failed";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="relative flex min-h-screen items-center justify-center bg-[url('/registerHero.jpg')] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-around relative z-10">
            <div className="flex flex-col items-center justify-center gap-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="z-10 md:flex hidden"
              />
              <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="z-10 md:hidden flex"
              />
              <div>
                <h1 className="text-lg hidden md:flex md:text-xl font-semibold capitalize text-white dark:text-white">
                  Find and Hire the Best Contractors in Zimbabwe
                </h1>
              </div>
            </div>
            <div className="relative w-full max-w-[500px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
              <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[400px] py-10">
                <div className="mx-auto w-full max-w-[400px]">
                  <div className="mb-10">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={100}
                      height={100}
                      className="z-10 md:flex hidden"
                    />
                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                      Login
                    </h1>
                    <p className="text-base font-bold leading-normal text-white-dark capitalize">
                      Enter your details to Login
                    </p>
                  </div>
                  <form
                    action="/api/login"
                    method="POST"
                    onSubmit={submitForm}
                    className="space-y-5 dark:text-white"
                    autoComplete="off"
                  >
                    <div>
                      <label htmlFor="Email">Email</label>
                      <div className="relative text-white-dark">
                        <Input
                          id="Email"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          placeholder="Enter Email"
                          className="border border-gray-500 ps-10 placeholder:text-white-dark"
                          required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IoMailOutline />
                        </span>
                      </div>
                      {emailError && (
                        <p className="text-sm text-red-500">{emailError}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="Password">Password</label>
                      <div className="relative text-white-dark">
                        <Input
                          id="Password"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChange}
                          placeholder="Enter Password"
                          className="border border-gray-500 ps-10 placeholder:text-white-dark"
                          required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <FaLock />
                        </span>
                        <button
                          type="button"
                          onClick={handleToggleShowPassword}
                          className="absolute end-4 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                        </button>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Register"}
                    </Button>
                  </form>
                  <div className="text-center dark:text-white pt-4">
                    Don&apos;t have an account ?&nbsp;
                    <Link
                      href="/register"
                      className="uppercase text-primary underline transition hover:text-black dark:hover:text-white"
                    >
                      REGISTER
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
