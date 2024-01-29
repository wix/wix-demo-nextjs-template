"use client";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";

import { SlotViewModel } from "@/app/components/Calendar/CalendarSections/CalendarSlots";

const CalendarSidebar = ({
  service,
  selectedDate,
  selectedTime,
  slotsForTime,
  timezone,
}: {
  service: { id: string, name: string, duration: string };
  selectedDate: Date;
  selectedTime: string;
  timezone: string;
  slotsForTime: SlotViewModel[];
  selectedSlot?: SlotViewModel["slotAvailability"];
}) => {
  const [selectedSlot, setSelectedSlot] = useState<
  {
    bookable: boolean,
    bookingPolicyViolations?: { tooLateToBook: boolean }
  } | undefined
  >();
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const formattedPrice = "13$";
  const goToCheckout = useCallback(() => {
    setRedirecting(true);
    setTimeout(() => {
      setRedirecting(false);
    }, 2000);
  }, [selectedSlot, service.id, timezone]);
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
        <div>{service.name}</div>
        <div>
          {format(selectedDate, "d MMMM yyyy")}
          {selectedTime ? " at " + selectedTime : ""}
        </div>
        <section className="text-xs mt-1">
          <div>{service.duration}</div>
          <div className="font-serif font-normal">
            {formattedPrice}
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
                    Central Park with John Doe
                  </option>
                ))}
              </select>
            </>
          ) : selectedSlot ? (
            <>
              <div>John Doe</div>
              <div>Central Park</div>
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
