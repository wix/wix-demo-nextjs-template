import React, { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from 'next/image';
import ActionLink from "@/app/components/ActionLink/ActionLink";
import { CardSkeleton } from "@/app/components/Skeletons/Skeletons";
import { EVENTS_ROUTE } from "@/app/routes";
import { PLACEHOLDER_IMAGE } from '@/app/constants';

export const metadata: Metadata = {
  title: "Events",
};

const EventCard: React.FC<{ event: {_id: string, slug: string, title: string}; index?: number }> = ({
  event,
  index = -1,
}) => {
  return (
    <div className="flex flex-col items-center max-lg:border-b pb-8 max-md:gap-8 h-full">
      <div className="w-full h-[460px]">
        <Link href={`${EVENTS_ROUTE}/${event.slug}`}>
          <Image
            alt="event image"
            src={PLACEHOLDER_IMAGE}
            width={690}
            height={690}
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index != -1 && index < 2}
          />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <Link href={`${EVENTS_ROUTE}/${event.slug}`}>
          <h2 className="card-title">{event.title}</h2>
        </Link>
        <p className="card-subtitle">23:00PM | Central Park</p>
      </div>
      <div className="mt-auto mb-[42px] w-full flex justify-center">
        <ActionLink
          href={`${EVENTS_ROUTE}/${event.slug}`}
          className={"w-full capitalize font-roboto font-normal text-[20px]"}
          position="stretch"
        >
          register
        </ActionLink>
      </div>
    </div>
  );
};

async function Events() {
  const events = [{
    _id: "1", slug: "event-1", title: "Event 1"
  }, {
    _id: "2", slug: "event-2", title: "Event 2"
  }, {
    _id: "3", slug: "event-3", title: "Event 3"
  }]

  return (
    <div className="grid gap-[20px] p-[20px] lg:grid-cols-2 max-w-[980px] mx-[auto]">
      {events!.map((event, index) => (
        <EventCard key={event._id} event={event} index={index} />
      ))}
    </div>
  );
}

export default async function Page() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-[20px] p-[20px] lg:grid-cols-2 max-w-[980px] mx-[auto]">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center max-lg:border-b pb-8 max-md:gap-8 h-full"
            >
              <div
                role="status"
                className="w-screen max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
              >
                <CardSkeleton height={"96"} width={"1/2"} />
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ))}
        </div>
      }
    >
      <Events />
    </Suspense>
  );
}
