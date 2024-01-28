import React from "react";
import Link from "next/link";
import { EVENTS_ROUTE } from "@/app/routes";

export default function FeaturedMenuCard() {
  return (
    <div className="rounded overflow-hidden inline-block md:shadow-lg bg-white lg:w-[550px] mx-auto md:px-[90px] md:py-[60px]">
      <div className="w-full mx-auto md:py-16 text-center flex flex-col items-center p-[32px]">
        <h2 className="mt-3 md:text-5xl text-3xl">Farm to Table</h2>
        <h5 className="font-light md:text-2xl text-xl mt-5 mb-7 w-1/2">
          New event
        </h5>
        <p className="font-light text-3xl w-16 h-3 border-b-2 border-t-2 border-black mb-7" />
        <div className="text-gray-700 text-base mb-10">
          <div className="text-center mb-3 text-[17px] font-light font-roboto leading-[22.71px]">
            <p>
              We grow food, build a life and celebrate nature. come celebrate
              with us in the middle of the nature, at our organic farm.
            </p>
          </div>
        </div>
        <Link
          href={`${EVENTS_ROUTE}/farm-to-table-feasts-2`}
          className="mx-auto btn-main capitalize font-roboto font-[400] text-xl py-[20px] px-[40px]"
        >
          buy tickets
        </Link>
      </div>
    </div>
  );
}
