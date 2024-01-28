"use client";
import React, { useState } from "react";
import { CartItem } from "../CartItem/CartItem";
import { useUI } from "../Provider/context";
import Link from "next/link";
import { STORE_ROUTE } from "@/app/routes";

export const CartView = ({ layout = "mini" }: { layout?: "full" | "mini" }) => {
  const { closeSidebar, openModalNotPremium } = useUI();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const subTotal = "16$";
  const lineItems = [{
    _id: "1", quantity: 1, url: "", productName: "item 1", description: "item 1 description"
  }, {
    _id: "2", quantity: 2, url: "", productName: "item 2", description: "item 2 description"
  }, {
    _id: "3", quantity: 3, url: "", productName: "item 3", description: "item 3 description"
  }]

  const handleClose = () => closeSidebar();
  const goToCheckout = () => {
    closeSidebar();
    setRedirecting(true);
  };

  const isMini = layout === "mini";
  return (
    <>
      {lineItems?.length! > 0 ? (
        <div className={`${!isMini ? "max-w-6xl mx-auto" : ""}`}>
          <div className="flex-1">
            <div className="relative">
              {isMini ? (
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="hover:text-accent-5 absolute transition ease-in-out duration-150 focus:outline-none mr-6 top-[32px]"
                >
                  <svg
                    className="w-6 h-6 text-site ml-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    ></path>
                  </svg>
                </button>
              ) : null}
              <span
                className={`font-bold text-2xl text-center block p-6 ${
                  isMini ? "bg-black text-white" : ""
                }`}
              >
                Cart
              </span>
            </div>
            <ul className="sm:px-6 p-4 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
              {lineItems?.map((item: any) => (
                <CartItem
                  key={item._id}
                  item={item}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-6 py-6 sm:px-6 sticky z-20 bottom-0 w-full right-0 left-0 border-t text-md bg-site">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
            </ul>
            <div>
              <button
                className="btn-main w-full text-lg"
                onClick={goToCheckout}
                disabled={redirecting}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 text-secondary">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accent-3 px-10 text-center pt-2">
            Add products to your cart in <Link href={STORE_ROUTE}>here</Link>
          </p>
        </div>
      )}
    </>
  );
};
