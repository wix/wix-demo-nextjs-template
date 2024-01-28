"use client";
import React, { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const videoRef = useRef(null);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxStyle = {
    transform: `translateY(${scrollPosition * 0.4}px)`,
  };

  return (
    <section className="relative bg-transparent flex flex-col text-white w-screen overflow-hidden">
      <div className="w-full h-full bg-transparent overflow-hidden relative">
        <video
          ref={videoRef}
          autoPlay
          preload="auto"
          loop
          muted
          className="absolute top-0 w-full h-full object-cover z-0 bg-transparent"
          style={parallaxStyle}
        >
          <source src="/images/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25"
          style={parallaxStyle}
        />
        <div className="relative h-[813px] inset-0 flex items-center justify-center">
          <h3 className="text-center md:text-[65px] text-[32px] max-md:p-5 leading-[70.53px] font-libre">
            GOURMET CHEF
            <br />
            AT YOUR DINNER TABLE
          </h3>
        </div>
      </div>
    </section>
  );
}
