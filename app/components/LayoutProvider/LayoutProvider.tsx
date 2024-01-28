"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navbarMainItems } from "@/app/components/Layout/NavBar/NavBar";
import { HOME_ROUTE } from "@/app/routes";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    router.prefetch(HOME_ROUTE);
  }, []);

  useEffect(() => {
    const getTitle = () => {
      return document?.title?.split("|")[0] || "";
    };

    const getDescription = () => {
      return (
        document
          ?.querySelector('meta[name="description"]')
          ?.getAttribute("content") || ""
      );
    };

    setTitle(getTitle());
    setDescription(getDescription());
  }, [pathname]);

  if (
    navbarMainItems.some(
      (item) => pathname === item.ref || pathname.includes("store/category/")
    )
  ) {
    return (
      <div className="container mx-auto">
        <div className="md:mx-[110px] pb-8 text-center">
          <div className={`${description ? "mb-[60px]" : "mb-[40px]"}`}>
            <h3 className="inner-page-title pb-0 m-0">{title}</h3>
            <hr className="h-[2px] bg-gray-700 border-0 m-0 p-0" />
          </div>
          {description && (
            <div className="md:mx-[110px] mb-[40px]">
              <h2 className="inner-page-subtitle">{description}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
