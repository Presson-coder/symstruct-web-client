"use client";
import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { logout } from "@/store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userLastNameFirstLetter = useSelector(
    (state: RootState) => state.auth.user?.lastName
  )
    ?.charAt(0)
    .toUpperCase();
  const userFirstNameFirstLetter = useSelector(
    (state: RootState) => state.auth.user?.firstName
  )
    ?.charAt(0)
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
  };

  const toogleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    window.history.replaceState(null, "", "");
  };

  // Effect to change the navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to update current page based on scroll position
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentPage(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href")?.substring(1);
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      if (targetId) {
        setCurrentPage(targetId);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full transition-all duration-300 z-50  ${
        isScrolled
          ? "bg-white shadow-md pt-0 text-orange-500 "
          : "bg-transparent pt-10 "
      }`}
    >
      <div
        className={`md:flex hidden justify-between  ${
          isScrolled
            ? " p-3 w-full items-center"
            : "container mx-auto px-20 items-center p-4"
        }`}
      >
        <div>
          <Image
            className={`${isScrolled ? "hidden" : "flex"}`}
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
          />

          <Image
            className={`${isScrolled ? "flex " : "hidden"}`}
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
          />
        </div>
        <div
          className={`${
            isScrolled
              ? "flex  font-sans space-x-10 font-thin text-base pr-2"
              : "flex  font-sans space-x-10 font-thin text-base pr-20"
          }`}
        >
          <Link
            href="#home"
            onClick={handleScroll}
            className={`${
              isScrolled
                ? "text-black font-thin hover:text-orange-500 duration-500"
                : "text-white font-thin hover:text-orange-500 duration-500"
            } `}
          >
            HOME
          </Link>
          {/* <Link
            href="#about"
            onClick={handleScroll}
            className={
              currentPage === "about"
                ? "text-orange-500"
                : `${
                    isScrolled
                      ? "text-black font-thin hover:text-orange-500 duration-500"
                      : "text-white font-thin hover:text-orange-500 duration-500"
                  } `
            }
          >
            ABOUT
          </Link> */}
          <Link
            href="#shop-online"
            onClick={handleScroll}
            className={
              currentPage === "shop-online"
                ? "text-orange-500"
                : `${
                    isScrolled
                      ? "text-black font-thin hover:text-orange-500 duration-500"
                      : "text-white font-thin hover:text-orange-500 duration-500"
                  } `
            }
          >
            PROJECTS
          </Link>
          <Link
            href="#contact"
            onClick={handleScroll}
            className={
              currentPage === "contact"
                ? "text-orange-500"
                : `${
                    isScrolled
                      ? "text-black font-thin hover:text-orange-500 duration-500"
                      : "text-white font-thin hover:text-orange-500 duration-500"
                  } `
            }
          >
            CONTACT US
          </Link>
          {isHydrated ? (
            isLoggedIn ? (
              <>
                {/* <div className="w-9 h-9 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold text-lg shadow">
                  {userFirstNameFirstLetter}
                  {userLastNameFirstLetter}
                </div> */}
                <div>
                  <button
                    onClick={handleLogout}
                    className={`flex flex-row items-center cursor-pointer gap-1 ${
                      isScrolled
                        ? "text-black font-thin hover:text-orange-500 duration-500"
                        : "text-white font-thin hover:text-orange-500 duration-500"
                    }`}
                  >
                    <IoLogOutOutline />
                    LOGOUT
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={
                    currentPage === "login"
                      ? "text-orange-500"
                      : `${
                          isScrolled
                            ? "text-black font-thin hover:text-orange-500 duration-500"
                            : "text-white font-thin hover:text-orange-500 duration-500"
                        } `
                  }
                >
                  LOGIN
                </Link>
                <Link
                  href="/register"
                  className={
                    currentPage === "register"
                      ? "text-orange-500"
                      : `${
                          isScrolled
                            ? "text-black font-thin hover:text-orange-500 duration-500"
                            : "text-white font-thin hover:text-orange-500 duration-500"
                        } `
                  }
                >
                  REGISTER
                </Link>
              </>
            )
          ) : null}
        </div>
      </div>

      {/* mobile menu */}
      <nav className=" md:hidden w-full border-custom-dark-brown dark:bg-custom-dark-brown">
        <div className=" flex flex-wrap items-center justify-start  p-2">
          <button
            onClick={toogleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-orange-500 rounded-lg md:hidden hover:bg-g focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <p className="flex items-center justify-center mx-auto gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-discount-check-filled text-orange-500"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                strokeWidth="0"
                fill="currentColor"
              />
            </svg>
            <span
              className={`self-center text-base  whitespace-nowrap font-medium dark:text-white ${
                isScrolled ? "text-orange-500" : "text-white"
              }`}
            >
              <span className="font-extralight">Talita</span> Fashions
            </span>
          </p>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-light flex flex-col p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-orange-500 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  href="#home"
                  className={
                    currentPage === "home"
                      ? "block py-2 px-3 text-white bg-orange-blue rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                      : "block py-2 px-3 text-black rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                  }
                  aria-current="page"
                  onClick={handleScroll}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className={
                    currentPage === "about"
                      ? "block py-2 px-3 text-white bg-orange-blue rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                      : "block py-2 px-3 text-black rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                  }
                  onClick={closeMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#shop-online"
                  className={
                    currentPage === "shop-online"
                      ? "block py-2 px-3 text-white bg-orange rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                      : "block py-2 px-3 text-black rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                  }
                  onClick={closeMenu}
                >
                  Shop Online
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className={
                    currentPage === "contact"
                      ? "block py-2 px-3 text-white bg-orange-blue rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                      : "block py-2 px-3 text-black rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                  }
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
              {isHydrated ? (
                isLoggedIn ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block py-2 px-3 text-black rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                    >
                      <IoLogOutOutline className="inline mr-1" />
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/login"
                        className={
                          currentPage === "login"
                            ? "block py-2 px-3 text-white bg-orange-blue rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                            : "block py-2 px-3 text-black rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                        }
                        onClick={closeMenu}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className={
                          currentPage === "register"
                            ? "block py-2 px-3 text-white bg-orange-blue rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                            : "block py-2 px-3 text-black rounded md:bg-transparent md:text-orange-700 md:p-0 dark:text-white md:dark:text-orange-500"
                        }
                        onClick={closeMenu}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
      {/* mobile menu */}
    </nav>
  );
};

export default Navbar;
