import { useQuery } from "@tanstack/react-query";
import { getServiceAvailability } from "@/app/model/availability/availability-api";
import { useWixClient } from "@/app/hooks/useWixClient";

export const useAvailability = ({
  serviceId,
  from,
  to,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  slotsPerDay,
  limit,
}: {
  serviceId: string;
  from: string;
  to: string;
  timezone?: string;
  slotsPerDay?: number;
  limit?: number;
}) => {
  const wixClient = useWixClient();
  return useQuery(
    [
      "calendar-availability",
      serviceId,
      from,
      to,
      wixClient,
      timezone,
      slotsPerDay,
      limit,
    ],
    () =>
      getServiceAvailability(wixClient, {
        serviceId,
        from,
        to,
        timezone,
        slotsPerDay,
        limit,
      })
  );
};
