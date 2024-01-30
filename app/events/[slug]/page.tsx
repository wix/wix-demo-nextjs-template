import Image from 'next/image';
import React from 'react';
import {
  endOfDay
} from "date-fns";
import { TicketsTable } from "@/app/components/Table/Table.client";
import { Schedule } from "@/app/components/Schedule/Schedule";
import ActionLink from "@/app/components/ActionLink/ActionLink";
import { PLACEHOLDER_IMAGE } from '@/app/constants';

export async function generateMetadata({ params }: any) {
  const event = {
    _id: "1", slug: "event-1", title: "Event 1"
  };
  return {
    title: event ? event.title : params.slug,
  };
}

export default async function EventPage({ params }: any) {
  if (!params.slug) {
    return;
  }
  const event = {
    _id: "1", slug: "event-1", title: "Event Name", description: "Event Description", about: "About the Event"
  };

  const tickets = [{
    _id: "1", name: "Event Name 1", description: "Event Description", price: 13, canPurchase: true, limitPerCheckout: 5, options: [{
      _id: "1", price: 4, name: "option 1"
    }, {
      _id: "2", price: 5, name: "option 2"
    }, {
      _id: "3", price: 6, name: "option 3"
    }]
  }, {
    _id: "2", name: "Event Name 2", description: "Event Description", price: 13, canPurchase: true, limitPerCheckout: 5, options: [{
      _id: "1", price: 4, name: "option 1"
    }, {
      _id: "2", price: 5, name: "option 2"
    }, {
      _id: "3", price: 6, name: "option 3"
    }]
  }, {
    _id: "3", name: "Event Name 3", description: "Event Description", price: 13, canPurchase: true, limitPerCheckout: 5, options: [{
      _id: "1", price: 4, name: "option 1"
    }, {
      _id: "2", price: 5, name: "option 2"
    }, {
      _id: "3", price: 6, name: "option 3"
    }]
  }];
  const schedule = {items: [{
      _id: "1", start: new Date().toISOString(), end: endOfDay(new Date()).toISOString(), name: "Schedule item 1", stageName: "stage name 1"
    }, {
      _id: "2", start: new Date().toISOString(), end: endOfDay(new Date()).toISOString(), name: "Schedule item 2", stageName: "stage name 2"
    }, {
      _id: "3", start: new Date().toISOString(), end: endOfDay(new Date()).toISOString(), name: "Schedule item 3", stageName: "stage name 3"
    }]};

  return (
    <div className="mx-auto px-4 sm:px-14">
      {event ? (
        <div className="w-full overflow-hidden max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 max-w-6xl items-lef items-center mx-auto">
            <div className="text-center px-5 pb-4">
              <span className="font-roboto font-normal text-[16px] leading-[20.8px]">
                23:00 PM | Central Park
              </span>
              <h3 className="my-2 mt-[30px] text-[50px] font-bold leading-[56.81px]">
                {event.title}
              </h3>
              <h5 className="my-4 sm:my-6">{event.description}</h5>
              <ActionLink
                href={`/events/${event.slug}#tickets`}
                className={"max-md:my-2 inline-block"}
              >
                Buy Tickets
              </ActionLink>
            </div>
            <div className="">
              <Image
                alt="blog post"
                src={PLACEHOLDER_IMAGE}
                width={980}
                height={550}
                className="max-h-[320px] sm:h-[550px] sm:max-h-[550px]"
                priority
              />
            </div>
            <div className="text-[14px] px-[10vw] w-full max-w-[980px] sm:px-0">
              <div className="flex flex-col gap-[20px] w-full">
                <h4 className="md:text-3xl leading-[34.09px] font-bold capitalize">
                  time & location
                </h4>
                <p className="leading-[26.1px] font-roboto font-normal text-[18px]">
                  23:00 PM
                  <br />
                  Central Park
                </p>
              </div>
              <hr className="h-[2px] mx-auto my-4 bg-[#E0E0E0] border-0 md:my-10  w-full" />
              {event.about !== "<p></p>" && event.about ? (
                <div className="flex flex-col gap-[20px] w-full">
                  <h4 className="mt-7 md:text-3xl leading-[34.09px] font-bold">
                    About the Event
                  </h4>
                  <div
                    className="font-roboto font-normal text-[18px] leading-[26.1px]"
                    dangerouslySetInnerHTML={{ __html: event.about ?? "" }}
                  />
                </div>
              ) : null}
              {schedule?.items?.length ? (
                <div className="mb-4 sm:mb-14">
                  <h4 className="mt-7 md:text-3xl leading-[34.09px] font-bold capitalize">
                    Schedule
                  </h4>
                  <Schedule items={schedule.items} slug={event.slug!} />
                </div>
              ) : null}
              <div className="my-4 sm:my-10">
                <h4 className="mt-7 md:text-3xl leading-[34.09px] font-bold capitalize">
                  Tickets
                </h4>
                <TicketsTable tickets={tickets} event={event} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The event was not found
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams(): Promise<{ slug?: string }[]> {
  return [{slug: 'event-1'}, {slug: 'event-2'}, {slug: 'event-3'}];
}
