"use client";
import { ServiceInfoViewModel } from "@/app/model/service/service.mapper";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";

import { useServiceFormattedPrice } from "@/app/hooks/useServiceFormattedPrice";
import { SlotViewModel } from "@/app/components/Calendar/CalendarSections/CalendarSlots";
import type { availabilityCalendar } from "@wix/bookings";
import { createRedirectCallbacks } from "@/app/model/redirects/redirect.utils";
import { useWixClient } from "@/app/hooks/useWixClient";
import { RedirectSession } from "@wix/redirects/build/es/src/headless-v1-redirect-session.types";

const CalendarSidebar = ({
                           service,
                           selectedDate,
                           selectedTime,
                           slotsForTime,
                           timezone,
                         }: {
  service: ServiceInfoViewModel;
  selectedDate: Date;
  selectedTime: string;
  timezone: string;
  slotsForTime: SlotViewModel[];
  selectedSlot?: SlotViewModel["slotAvailability"];
}) => {
  const wixClient = useWixClient();
  const [selectedSlot, setSelectedSlot] = useState<
    availabilityCalendar.SlotAvailability | undefined
  >();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const formattedPrice = useServiceFormattedPrice(
    service.payment!.paymentDetails
  );
  const goToCheckout = useCallback(() => {
    setRedirecting(true);
    wixClient!.redirects
      .createRedirectSession({
        bookingsCheckout: {
          slotAvailability: selectedSlot!,
          timezone,
        },
        callbacks: createRedirectCallbacks({ baseUrl: window.location.origin }),
      })
      .then(({ redirectSession }) => {
        window.location.assign(redirectSession!.fullUrl!);
        setTimeout(() => {
          setRedirecting(false);
        }, 2000);
      })
      .catch((e: any) => {
        console.error(e);
        setRedirecting(false);
      });
  }, [selectedSlot, service.id, wixClient, timezone]);
  useEffect(() => {
    setSelectedSlot(
      slotsForTime?.length === 1
        ? slotsForTime?.[0]?.slotAvailability
        : undefined
    );
  }, [selectedTime, slotsForTime]);

  const disableNext = !selectedSlot || redirecting;

  return (
    <>
      <div className="border-b pb-2">
        <h2 className="text-lg">Booking Summary</h2>
      </div>
      <section className="mt-4">
        <div>{service.info.name}</div>
        <div>
          {format(selectedDate, "d MMMM yyyy")}
          {selectedTime ? " at " + selectedTime : ""}
        </div>
        <section className="text-xs mt-1">
          <div>{service.info.formattedDuration}</div>
          <div className="font-serif font-normal">
            {formattedPrice.userFormattedPrice}
          </div>
          {slotsForTime.length > 1 ? (
            <>
              <label htmlFor="slot-options" className="mt-3 block">
                Please Select a Slot Option
              </label>
              <select
                value={selectedSlot ? undefined : ""}
                id="slot-options"
                className="block w-full p-2 pr-7 my-3 text-sm text-black border border-black rounded-none bg-white focus:ring-gray-700 focus:border-black"
                onChange={(e) =>
                  setSelectedSlot(
                    slotsForTime[e.target.value as unknown as any]
                      .slotAvailability
                  )
                }
              >
                <option disabled selected value="">
                  Please Select
                </option>
                {slotsForTime.map((slotOption, index) => (
                  <option
                    key={index}
                    disabled={!slotOption.slotAvailability.bookable}
                    value={index}
                  >
                    {`${
                      slotOption.slotAvailability.slot?.location?.name ?? ""
                    } with ${
                      slotOption.slotAvailability.slot?.resource?.name ?? ""
                    }`.trim()}
                  </option>
                ))}
              </select>
            </>
          ) : selectedSlot ? (
            <>
              <div>{selectedSlot.slot?.resource?.name}</div>
              <div>{selectedSlot.slot?.location?.name}</div>
            </>
          ) : null}
        </section>
        <div className="mt-7">
          <button
            disabled={disableNext}
            className={`btn-main font-roboto font-normal w-full ${
              disableNext ? "text-white" : ""
            }`}
            onClick={goToCheckout}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default CalendarSidebar;
