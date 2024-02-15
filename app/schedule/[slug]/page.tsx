import { Schedule } from "../../components/Schedule/Schedule";
import Link from "next/link";
import { EVENTS_ROUTE } from "@/app/routes";
import {endOfDay} from 'date-fns';

export default async function SchedulePage({ params }: any) {
  const event = {
    _id: "1", slug: "event-1", title: "Event Name", description: "Event Description", about: "About the Event"
  };
  const items = [{
    _id: "1", start: new Date().toISOString(), end: endOfDay(new Date()).toISOString(), name: "Schedule item 1", stageName: "stage name 1"
  }, {
    _id: "2", start: new Date().toISOString(), end: endOfDay(new Date()).toISOString(), name: "Schedule item 2", stageName: "stage name 2"
  }, {
    _id: "3", start: new Date().toISOString(), end: endOfDay(new Date()).toISOString(), name: "Schedule item 3", stageName: "stage name 3"
  }]


  return (
    <div className="max-w-4xl mx-auto px-8 sm:px-14 pt-4 sm:pt-16">
      <div className="flex flex-col-reverse sm:flex-col">
        <p className="font-helvetica text-xs sm:text-base">
          {event!.title} | every 2 weeks, Central Park
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
            19:00 PM
          </h2>
          <Schedule items={items!} slug={params.slug} isFull={true} />
        </div>
      </div>
    </div>
  );
}
