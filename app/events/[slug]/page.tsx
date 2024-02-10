import { wixEvents } from "@wix/events";
import { WixMediaImage } from "@/app/components/Image/WixMediaImage";
import { formatDate } from "@/app/utils/date-formatter";
import { TicketsTable } from "@/app/components/Table/Table.client";
import { getWixClient } from '@/app/model/auth/auth';
import { Schedule } from "../../components/Schedule/Schedule";
import { TicketDefinitionExtended } from "../../types/ticket";
import ActionLink from "@/app/components/ActionLink/ActionLink";
import Link from "next/link";

export async function generateMetadata({ params }: any) {
  const wixClient = getWixClient();
  const { events } = await wixClient.wixEvents.queryEventsV2({
    fieldset: [
      wixEvents.EventFieldset.FULL,
      wixEvents.EventFieldset.DETAILS,
      wixEvents.EventFieldset.TEXTS,
      wixEvents.EventFieldset.REGISTRATION,
    ],
    query: {
      filter: { slug: decodeURIComponent(params.slug) },
      paging: { limit: 1, offset: 0 },
    },
  });
  const event = events?.length ? events![0] : null;
  return {
    title: event ? event.title : params.slug,
  };
}

export default async function EventPage({ params }: any) {
  if (!params.slug) {
    return;
  }
  const wixClient = getWixClient();
  const { events } = await wixClient.wixEvents.queryEventsV2({
    fieldset: [
      wixEvents.EventFieldset.FULL,
      wixEvents.EventFieldset.DETAILS,
      wixEvents.EventFieldset.TEXTS,
      wixEvents.EventFieldset.REGISTRATION,
    ],
    query: {
      filter: { slug: decodeURIComponent(params.slug) },
      paging: { limit: 1, offset: 0 },
    },
  });
  const event = events?.length ? events![0] : null;

  const tickets =
    event &&
    ((
      await wixClient.checkout.queryAvailableTickets({
        filter: { eventId: event._id },
        offset: 0,
        limit: 100,
        sort: "orderIndex:asc",
      })
    ).definitions?.map((ticket) => ({
      ...ticket,
      canPurchase:
        ticket.limitPerCheckout! > 0 &&
        (!ticket.salePeriod ||
          (new Date(ticket.salePeriod.endDate!) > new Date() &&
            new Date(ticket.salePeriod.startDate!) < new Date())),
    })) as TicketDefinitionExtended[]);
  let schedule;
  try {
    schedule =
      event &&
      (await wixClient.schedule.listScheduleItems({
        eventId: [event._id!],
        limit: 100,
      }));
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="mx-auto px-4 sm:px-14">
      {event ? (
        <div className="w-full overflow-hidden max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 max-w-6xl items-lef items-center mx-auto">
            <div className="text-center px-5 pb-4">
              <span className="font-roboto font-normal text-[16px] leading-[20.8px]">
                {formatDate(
                  new Date(event.scheduling?.config?.startDate!),
                  event!.scheduling!.config!.timeZoneId!
                ) || event.scheduling?.formatted}{" "}
                | {event.location?.name}
              </span>
              <h3 className="my-2 mt-[30px] text-[50px] font-bold leading-[56.81px]">
                {event.title}
              </h3>
              <h5 className="my-4 sm:my-6">{event.description}</h5>
              {event.registration?.status ===
                wixEvents.RegistrationStatus.OPEN_TICKETS && (
                  <ActionLink
                    href={`/events/${event.slug}#tickets`}
                    className={"max-md:my-2 inline-block"}
                  >
                    Buy Tickets
                  </ActionLink>
                )}
              {event.registration?.status ===
                wixEvents.RegistrationStatus.OPEN_EXTERNAL && (
                  <Link
                    className="btn-main inline-block w-full sm:w-auto text-center"
                    href={event.registration.external!.registration}
                  >
                    Buy Tickets
                  </Link>
                )}
              {[
                wixEvents.RegistrationStatus.CLOSED_MANUALLY,
                wixEvents.RegistrationStatus.CLOSED,
              ].includes(event.registration?.status!) && (
                <div>
                  <p className="border-2 inline-block p-3">
                    Registration is closed
                    <br />
                    <Link href="/" className="underline">
                      See other events
                    </Link>
                  </p>
                </div>
              )}
            </div>
            <div className="">
              <WixMediaImage
                media={event.mainImage}
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
                  {event.scheduling?.startDateFormatted}
                  <br />
                  {event.location?.address}
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
              {event.registration?.external && (
                <ActionLink
                  href={event.registration?.external.registration}
                  className={"my-10 inline-block"}
                >
                  Buy Tickets
                </ActionLink>
              )}
              {[
                wixEvents.RegistrationStatus.CLOSED_MANUALLY,
                wixEvents.RegistrationStatus.OPEN_TICKETS,
              ].includes(event.registration?.status!) && (
                <div className="my-4 sm:my-10">
                  <h4 className="mt-7 md:text-3xl leading-[34.09px] font-bold capitalize">
                    Tickets
                  </h4>
                  <TicketsTable tickets={tickets!} event={event} />
                </div>
              )}
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
  const wixClient = getWixClient();
  return wixClient.wixEvents
    .queryEventsV2({
      fieldset: [wixEvents.EventFieldset.FULL],
      query: {
        paging: { limit: 10, offset: 0 },
        sort: [{ fieldName: "start", order: wixEvents.SortOrder.ASC }],
      },
    })
    .then(({ events }) => {
      return events!.map((event) => ({
        slug: event.slug,
      }));
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}
