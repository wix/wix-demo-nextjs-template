import React, { Suspense } from "react";
import type { wixEvents as wixEventsTypes } from "@wix/events";
import { wixEvents } from "@wix/events";
import { WixMediaImage } from "@/app/components/Image/WixMediaImage";
import Link from "next/link";
import ActionLink from "@/app/components/ActionLink/ActionLink";
import { Metadata } from "next";
import { CardSkeleton } from "@/app/components/Skeletons/Skeletons";
import { queryEvents } from "@/app/model/events/events-api";
import { EventStatus } from "@wix/events/build/cjs/src/events-v1-event.universal";
import { SortOrder } from "@wix/events/build/es/src/events-v1-event.types";
import { EVENTS_ROUTE } from "@/app/routes";

export const metadata: Metadata = {
  title: "Events",
};

const EventCard: React.FC<{ event: wixEventsTypes.Event; index?: number }> = ({
  event,
  index = -1,
}) => {
  const eventDetails = [];
  if (!event.scheduling?.config?.scheduleTbd) {
    eventDetails.push(event.scheduling?.startDateFormatted);
  }
  if (!event.location?.tbd) {
    eventDetails.push(event.location?.name);
  }
  return (
    <div className="flex flex-col items-center max-lg:border-b pb-8 max-md:gap-8 h-full">
      <div className="w-full h-[460px]">
        <Link href={`${EVENTS_ROUTE}/${event.slug}`}>
          <WixMediaImage
            media={event.mainImage}
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
        <p className="card-subtitle">{eventDetails.join(" | ")}</p>
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
  const events = await queryEvents({
    fieldset: [wixEvents.EventFieldset.DETAILS],
    filter: { status: EventStatus.SCHEDULED },
    limit: 10,
    offset: 0,
    sort: [{ fieldName: "created", order: SortOrder.ASC }],
  });

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
