import { wixEvents } from "@wix/events";
import { Sorting } from "@wix/events/build/es/src/events-v1-event.types";
import { getWixClient } from '@/app/model/auth/auth';

interface EventFilters {
  fieldset?: wixEvents.EventFieldset[];
  filter?: {
    status?: wixEvents.EventStatus;
    eventId?: string;
    slug?: string;
    title?: string;
    created?: string;
    modified?: string;
    start?: string;
    end?: string;
  };
  sort?: Sorting[];
  limit?: number;
  offset?: number;
}

export const queryEvents = async ({
  fieldset,
  filter,
  sort,
  limit,
  offset,
}: EventFilters = {}) => {
  const wixClient = getWixClient();
  const { events } = await wixClient.wixEvents.queryEventsV2({
    fieldset,
    query: {
      filter,
      paging: { limit, offset },
      sort,
    },
  });
  return events;
};
