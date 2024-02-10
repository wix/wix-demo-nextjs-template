import ServiceList from "@/app/components/ServiceList/ServiceList";
import React, { Suspense } from "react";
import { Metadata } from "next";
import { ImageSkeleton, TextSkeleton } from "../components/Skeletons/Skeletons";
import { getWixClient } from '@/app/model/auth/auth';
import { safeGetServices } from "@/app/model/service/service-api";

export const metadata: Metadata = {
  title: "Workshops",
};

async function BookNow({ categoryId }: any) {
  const wixClient = getWixClient();
  const {
    data: { services },
  } = await safeGetServices(wixClient);

  return <ServiceList categoryId={categoryId} services={services} />;
}

export default async function Page({ params }: any) {
  return (
    <Suspense
      fallback={
        <div className="text-xl text-center text-black no-underline">
          <ul className="inline-flex flex-wrap gap-8 flex-col justify-center mb-8">
            {[...Array(3)].map((_, i) => (
              <li key={i} className="-mb-px w-full relative flex-1">
                <div
                  role="status"
                  className="flex flex-col gap-8 md:relative space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                >
                  <div className="md:absolute md:left-[-5vw] md:top-[15vh] w-40 md:order-1 order-2">
                    <TextSkeleton />
                  </div>
                  <div className="flex items-center justify-center w-96 h-96 bg-gray-300 rounded sm:w-96 dark:bg-gray-700 md:order-2 order-1">
                    <ImageSkeleton />
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <BookNow categoryId={params?.category}/>
    </Suspense>
  );
}
