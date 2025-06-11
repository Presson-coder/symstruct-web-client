"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import Image from "next/image";
import { Button } from "../ui/button";
import { FaLock } from "react-icons/fa"; 
import { IoMailOutline } from "react-icons/io5";

const RegisterForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone: string) => {
    setUser({ ...user, phone });
  };

  const handleEmailValidation = (email: string) => {
    // Add your validation logic here
    setEmailError(""); // or set error message
  };

  const handlePhoneNumberValidation = (phone: string) => {
    // Add your validation logic here
    setPhoneNumberError(""); // or set error message
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/register", user);
      // handle success (e.g., redirect or show message)
    } catch (err) {
      // handle error (e.g., show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="relative flex min-h-screen items-center justify-center bg-[url('/homeHero.jpg')] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-around relative z-10">
            <div className="flex flex-col items-center justify-center gap-4 md:mb-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="z-10"
              />
              <div>
                <h1 className="text-lg hidden md:flex md:text-xl font-semibold capitalize text-white dark:text-white">
                  Find and Hire the Best Contractors in Zimbabwe
                </h1>
              </div>
            </div>
            <div className="relative w-full max-w-[600px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
              <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-10">
                <div className="mx-auto w-full max-w-[440px]">
                  <div className="mb-10">
                    <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                      Register
                    </h1>
                    <p className="text-base font-bold leading-normal text-white-dark">
                      Enter your details to register
                    </p>
                  </div>
                  <form
                    action="/api/register"
                    method="POST"
                    onSubmit={submitForm}
                    className="space-y-5 dark:text-white"
                    autoComplete="off"
                  >
                    <div>
                      <label htmlFor="Name">First Name</label>
                      <div className="relative text-white-dark">
                        <Input
                          id="Name"
                          name="firstName"
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter Name"
                          className="border border-gray-500  placeholder:text-white-dark"
                          required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          {/* <IconUser fill={true} /> */}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="LastName">Last Name</label>
                      <div className="relative text-white-dark">
                        <Input
                          id="LastName"
                          name="lastName"
                          onChange={handleChange}
                          type="text"
                          placeholder="Enter Last Name"
                          className="border border-gray-500  placeholder:text-white-dark"
                          required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          {/* <IconUser fill={true} /> */}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="Phone">Phone Number</label>
                      <div className="relative text-white-dark">
                        <PhoneInput
                          id="Phone"
                          name="phone"
                          onChange={handlePhoneChange}
                          onBlur={() => handlePhoneNumberValidation(user.phone)}
                          placeholder="Enter Phone Number"
                          defaultCountry="ZW"
                          className="border border-gray-500 placeholder:text-white-dark rounded-sm p-1.5"
                          required
                        />
                        <p className="text-sm text-red-500">
                          {phoneNumberError}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="Email">Email</label>
                      <div className="relative text-white-dark">
                        <Input
                          id="Email"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={(e) => handleEmailValidation(e.target.value)}
                          placeholder="Enter Email"
                          className="border border-gray-500 ps-10 placeholder:text-white-dark"
                          required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <IoMailOutline />
                        </span>
                      </div>
                      <span className="text-sm text-red-500">{emailError}</span>
                    </div>
                    <div>
                      <label htmlFor="Password">Password</label>
                      <div className="relative text-white-dark">
                        <Input
                          id="Password"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          placeholder="Enter Password"
                          className="border border-gray-500 ps-10 placeholder:text-white-dark"
                          required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <FaLock />
                        </span>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="ConfirmPassword">Confirm Password</label>
                      <div className="relative text-white-dark">
                        <Input
                          id="ConfirmPassword"
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          className="border border-gray-500 ps-10 placeholder:text-white-dark"
                          required
                        />
                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                          <FaLock />
                        </span>
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
                    Already have an account ?&nbsp;
                    <Link
                      href="/login"
                      className="uppercase text-primary underline transition hover:text-black dark:hover:text-white"
                    >
                      SIGN IN
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

export default RegisterForm;
