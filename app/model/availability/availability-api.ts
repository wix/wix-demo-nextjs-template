import { availabilityCalendar } from "@wix/bookings";
import { WixClient } from "@/app/components/Provider/ClientProvider";

export const getServiceAvailability = (
  wixClient: WixClient,
  {
    serviceId,
    from,
    to,
    timezone,
    slotsPerDay,
    limit,
  }: {
    serviceId: string;
    from: string;
    to: string;
    timezone?: string;
    slotsPerDay?: number;
    limit?: number;
  }
): Promise<availabilityCalendar.QueryAvailabilityResponse> =>
  queryAvailability({
    input: {
      slotsPerDay,
      timezone,
      query: {
        sort: [
          {
            fieldName: "startTime",
            order: availabilityCalendar.SortOrder.ASC,
          },
        ],
        filter: {
          serviceId: [serviceId],
          startDate: from,
          endDate: to,
        },
        cursorPaging: { ...(limit ? { limit } : {}) },
        // till the cursorPaging is exposed again in sdk
      } as availabilityCalendar.QueryV2,
    },
    wixClient,
  });

const queryAvailability = ({
  input,
  wixClient,
}: {
  input: availabilityCalendar.QueryAvailabilityRequest;
  wixClient: WixClient;
}) =>
  wixClient!.availabilityCalendar.queryAvailability(input.query!, {
    timezone: input.timezone,
    slotsPerDay: input.slotsPerDay,
  });
