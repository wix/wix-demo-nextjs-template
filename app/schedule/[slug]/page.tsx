import { Schedule } from "../../components/Schedule/Schedule";
import { formatDate } from "../../utils/date-formatter";
import Link from "next/link";
import { EVENTS_ROUTE } from "@/app/routes";
import { getWixClient } from '@/app/model/auth/auth';

export default async function SchedulePage({ params }: any) {
  const wixClient = getWixClient();
  const { events } = await wixClient.wixEvents.queryEventsV2({
    query: { filter: { slug: params.slug }, paging: { limit: 1, offset: 0 } },
  });
  const event = events?.length ? events![0] : null;
  const { items } = await wixClient.schedule.listScheduleItems({
    eventId: [event!._id!],
    limit: 100,
  });

  return (
    <div className="max-w-4xl mx-auto px-8 sm:px-14 pt-4 sm:pt-16">
      <div className="flex flex-col-reverse sm:flex-col">
        <p className="font-helvetica text-xs sm:text-base">
          {event!.title} | {event!.scheduling?.formatted},{" "}
          {event!.location!.address}
        </p>
        <h1 className="text-2xl sm:text-5xl mb-4 sm:mb-12 sm:mt-4">Schedule</h1>
      </div>
      <div className="flex flex-col-reverse sm:flex-col">
        <Link
          className="btn-main border py-2 mt-4 sm:mt-0 px-4 sm:mb-8 inline-block w-full sm:w-fit text-center"
          href={`${EVENTS_ROUTE}/${params.slug}`}
        >
          Get Tickets
        </Link>
        <div>
          <h2 className="mt-4 border-b border-black pb-4">
            {formatDate(
              new Date(event!.scheduling?.config?.startDate!),
              event!.scheduling!.config!.timeZoneId!
            )}
          </h2>
          <Schedule items={items!} slug={params.slug} isFull={true} />
        </div>
      </div>
    </div>
  );
}
