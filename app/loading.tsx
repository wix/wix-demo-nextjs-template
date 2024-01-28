"use client";
import React, { memo } from "react";
import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[600px] w-screen">
      <Spinner aria-label="Loading" size={"lg"} />
    </div>
  );
};

export default memo(Loading);
