import React from "react";
import Image from "next/image";

interface MenuCardProps {
  title: string;
  description: string;
  image: string;
  children?: React.ReactNode;
}

export default function MenuCard({
  title,
  description,
  image,
  children,
}: MenuCardProps) {
  const titleBreakdown = title.split(" ");
  return (
    <div className="flex flex-col items-center rounded overflow-hidden md:shadow-lg bg-white w-full h-full p-9">
      <Image
        className="basis-[180px] mx-auto"
        src={image}
        alt={title}
        width={180}
        height={180}
      />
      <div className="py-4 flex flex-col items-center text-center grow w-full">
        <h4 className="text-center leading-[45.45px]">
          {titleBreakdown.map((word, index) => (
            <>
              <span key={index}>{word}</span>
              <br />
            </>
          ))}
        </h4>
        <p className="font-light text-3xl mt-4 w-16 h-3 border-b-2 border-t-2 border-black mb-4" />
        <div className="text-gray-700 text-base mt-auto max-w-[236px] font-roboto font-light">
          {description}
        </div>
      </div>
      <div className="px-6 pt-7 pb-4 mt-auto items-center text-center">
        {children}
      </div>
    </div>
  );
}
