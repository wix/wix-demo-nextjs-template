import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import ActionLink from "../ActionLink/ActionLink";
import { WORKSHOPS_ROUTE } from "@/app/routes";
import { PLACEHOLDER_IMAGE } from '@/app/constants';

const ALL_SERVICES_CATEGORY_ID = "ALL";

export default function ServiceList({
  categoryId,
  services,
}: {
  categoryId?: string;
  services: {id: string; slug: string; name: string; tagLine: string; duration: string; categoryId: string; categoryName: string;}[];
}) {
  const categories = Object.values(
    services.reduce<{
      [id: string]: {
        id: string;
        name: string;
        selected: boolean;
      };
    }>(
      (acc, service) => {
        acc[service.categoryId] = {
          id: service.categoryId,
          name: service.categoryName,
          selected: service.categoryId === categoryId,
        };
        return acc;
      },
      {
        [ALL_SERVICES_CATEGORY_ID]: {
          id: ALL_SERVICES_CATEGORY_ID,
          name: "All Services",
          selected: !categoryId || categoryId === ALL_SERVICES_CATEGORY_ID,
        },
      }
    )
  );
  const selectedCategoryId = categoryId ?? ALL_SERVICES_CATEGORY_ID;
  const servicesToDisplay = services.filter(
    (service) =>
      selectedCategoryId === ALL_SERVICES_CATEGORY_ID ||
      service.categoryId === selectedCategoryId
  );

  return (
    <>
      <div
        className={`${
          categories.length > 2 ? "" : "hidden"
        } text-xl text-center text-black`}
      >
        <ul className="inline-flex flex-wrap justify-center border-b border-custom-3 mb-8">
          <li className="-mb-px ">
            {categories.length > 2
              ? categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`${WORKSHOPS_ROUTE}/category/${category.id}`}
                    aria-current={!!selectedCategoryId}
                    className={`inline-block p-4 rounded-t-lg border-b-[3px] hover:text-gray-600 ${
                      category.selected
                        ? "active border-custom-2"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {category.name}
                  </Link>
                ))
              : null}
          </li>
        </ul>
      </div>
      {servicesToDisplay?.length ? (
        <div className="p-5 m-auto grid grid-cols-1 gap-[32px] max-w-[980px]">
          {servicesToDisplay.map((service, index) => (
            <ServiceCard service={service} key={service.id} index={index} />
          ))}
        </div>
      ) : (
        <>
          No services found. Click{" "}
          <Link
            href="https://manage.wix.com/account/site-selector?actionUrl=https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fbookings%2Fservices%2Ftemplates-catalog%3Forigin%3DHeadless"
            target="_blank"
            rel="noreferrer"
            className="text-turquoise-200"
          >
            here
          </Link>{" "}
          to go to the business dashboard to add services. Once added, they will
          appear here.
        </>
      )}
    </>
  );
}

const ServiceCard = ({
  service,
  index = -1,
}: {
  service: {slug: string; name: string; tagLine: string; duration: string;};
  index?: number;
}) => {
  const formattedPrice = "13$";

  return (
    <div
      className="w-full flex lg:flex-row-reverse flex-col rounded-none overflow-hidden mx-auto relative h-full
            max-lg:border-b lg:gap-0 items-center"
    >
      <Link
        href={`/service/${service.slug}`}
        className="block w-full h-[530px] lg:w-[530px]"
      >
        <Image
          alt="service main"
          src={PLACEHOLDER_IMAGE}
          width={1060}
          height={886}
          objectFit="cover"
          sizes="(max-width: 1024px) 100vw, 25vw"
          priority={index === 0}
        />
      </Link>
      <div className="lg:absolute lg:py-[60px] lg:left-[40px]">
        <div className=" lg:p-[60px] lg:py-[80px] text-left lg:w-[470px] flex flex-col bg-[#F6F6F6]">
          <Link
            href={`/service/${service.slug}`}
            className="card-title p-0 m-0"
          >
            {service.name}
          </Link>
          <div className="card-subtitle grow">
            <p className="my-3 font-roboto font-normal">
              {service.tagLine}
            </p>
            <p className="w-full border-t border-custom-3 border-2 my-[24px]"></p>
            <p className="leading-8 font-roboto font-normal">
              {service.duration}
            </p>
          </div>
          <ActionLink
            href={`/calendar/${service.slug}`}
            className="font-roboto font-normal text-center"
          >
            Book Now
          </ActionLink>
        </div>
      </div>
    </div>
  );
};
