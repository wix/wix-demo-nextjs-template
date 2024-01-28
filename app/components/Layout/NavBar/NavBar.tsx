"use client";
import { NavLink } from "./NavLink";
import { useEffect, useState } from "react";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { CartBag } from "@/app/components/CartBag/CartBag";
import { Login } from "@/app/components/Login/Login";
import "./Navbar.css";
import { useUI } from "@/app/components/Provider/context";
import {
  BLOGS_ROUTE,
  EVENTS_ROUTE,
  HOME_ROUTE,
  STORE_ROUTE,
  WORKSHOPS_ROUTE,
} from "@/app/routes";

export const navbarMainItems = [
  { ref: BLOGS_ROUTE, label: "Blog" },
  { ref: STORE_ROUTE, label: "Store" },
  { ref: EVENTS_ROUTE, label: "Events" },
  { ref: WORKSHOPS_ROUTE, label: "Workshops" },
];

const StyledNavLink = ({
  isActive,
  className,
  ...linkProps
}: LinkProps & {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavLink
    className={`${className ?? ""} ${
      isActive ? "text-custom-2" : "hover:text-gray-400"
    }`}
    {...linkProps}
  />
);

export function NavBar() {
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps["href"]>(pathname!);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { closeSidebar } = useUI();

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeSidebar();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const effect = () => {
      if (isMenuOpen) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        document.querySelector(".navbar-burger")?.classList.add("extended");
      } else {
        document.getElementsByTagName("html")[0].style.overflow = "auto";
        document.querySelector(".navbar-burger")?.classList.remove("extended");
      }
    };
    effect();
  }, [isMenuOpen]);

  useEffect(() => {
    linkRef !== pathname && setLinkRef(pathname!);
    isMenuOpen && setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div>
      <nav className="py-4 justify-between items-center bg-white flex">
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="relative navbar-burger flex items-center rounded-md focus:outline-none"
            aria-controls="primary-navigation"
          >
            <svg
              stroke="var(--button-color)"
              fill="none"
              className="hamburger w-12 h-12"
              viewBox="-10 -10 120 120"
            >
              <path
                className="line"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="lg:flex items-center gap-4 justify-end hidden">
          {navbarMainItems.map(({ ref, label }) => (
            <li key={ref} className="relative pl-4">
              <StyledNavLink
                className="text-[18px] font-bold"
                isActive={ref === linkRef}
                href={ref}
                onClick={() => {
                  setLinkRef(ref);
                }}
              >
                {label}
              </StyledNavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`relative z-50 ${isMenuOpen ? "visible" : "invisible"}`}>
        <nav
          className={`fixed top-0 bottom-0 flex flex-col w-screen py-6 px-6 bg-white border-r overflow-y-auto
                    ${
                      isMenuOpen
                        ? "left-0 opacity-100"
                        : "left-[100vw] opacity-0"
                    } transition-all ease-in-out duration-700`}
        >
          <ul className="my-10 flex flex-col items-center gap-8 justify-end">
            <li key={HOME_ROUTE} className="relative">
              <StyledNavLink
                className="text-2xl font-bold"
                isActive={HOME_ROUTE === linkRef}
                href={HOME_ROUTE}
                onClick={() => {
                  setLinkRef(HOME_ROUTE);
                }}
              >
                Home
              </StyledNavLink>
            </li>
            {navbarMainItems.map(({ ref, label }) => (
              <li key={ref} className="relative">
                <StyledNavLink
                  className="text-2xl font-bold"
                  isActive={ref === linkRef}
                  href={ref}
                  onClick={() => {
                    setLinkRef(ref);
                  }}
                >
                  {label}
                </StyledNavLink>
              </li>
            ))}
            <li className="relative mt-20">
              <CartBag />
            </li>
            <li className="relative text-xl bg-custom-3 text-white rounded-md p-2">
              <Login />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
