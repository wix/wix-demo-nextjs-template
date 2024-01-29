"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import {
  addMonths,
  format,
  formatISO,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import { Spinner } from "flowbite-react";
import CalendarSlots, {
  SlotViewModel,
} from "@/app/components/Calendar/CalendarSections/CalendarSlots";
import CalendarSidebar from "@/app/components/Calendar/CalendarSections/CalendarSidebar";

type CalendarDateRange = { from: string; to: string };

const getCalendarMonthRangeForDate = (date: Date): CalendarDateRange => {
  return {
    from: formatISO(startOfMonth(date)),
    to: formatISO(startOfMonth(addMonths(date, 3))),
  };
};

const TIME_FORMAT = "hh:mm a";

export function CalendarView({ service }: { service: { id: string, name: string, duration: string } }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [dateRange, setDateRange] = useState<CalendarDateRange>(
    getCalendarMonthRangeForDate(selectedDate!)
  );
  const availabilityEntries = [{startDate: new Date(), bookable: false}]
  const timezone = "Etc/UTC";
  const timezoneStr = "Coordinated Universal Time (UTC+0)";
  useEffect(() => {
    // re-fetching existing range is cached
    setDateRange(getCalendarMonthRangeForDate(selectedDate!));
    setSelectedTime("");
  }, [selectedDate]);

  const slotsMap: { [key: string]: SlotViewModel[] } = useMemo(() => {
    return (
      availabilityEntries
        ?.sort(
          (dayDataA, dayDataB) =>
            new Date(dayDataA.startDate ?? 0).getTime() -
            new Date(dayDataB.startDate ?? 0).getTime()
        )
        .map((slotData) => ({
          formattedTime: format(
            new Date(slotData.startDate!),
            TIME_FORMAT
          ),
          slotAvailability: slotData,
        }))
        .reduce<{ [key: string]: SlotViewModel[] }>((acc, curr) => {
          const slotsArr = acc[curr.formattedTime] ?? [];
          // prefer bookable slots
          slotsArr[curr.slotAvailability.bookable ? "unshift" : "push"](curr);
          acc[curr.formattedTime] = slotsArr;
          return acc;
        }, {}) ?? {}
    );
  }, []);
  const showLoader = false;
  const nextAvailableDate = useMemo(
    () =>
      availabilityEntries
        ?.filter(({ bookable }) => bookable)
        .map(({ startDate }) => new Date(startDate!))
        .find((dateWithSlots) => dateWithSlots > selectedDate),
    [selectedDate]
  );

  return (
    <div className="flex flex-wrap">
      <div className="m-6 max-sm:mx-2 max-w-full flex-grow">
        <div className="border-b pb-2 flex flex-wrap gap-4 items-baseline justify-between">
          <h2 className="text-lg">Select a Date and Time</h2>
          <span className="text-gray-500 text-xs">Timezone: {timezoneStr}</span>
        </div>
        <div className="flex flex-wrap gap-x-6">
          <section className="mt-2 mx-auto">
            <DayPicker
              modifiers={{
                daysWithSlots: (date: Date | number) =>
                  !!availabilityEntries?.some(({ startDate }) =>
                    isSameDay(date, new Date(startDate!))
                  ),
              }}
              modifiersClassNames={{
                daysWithSlots:
                  "relative inline-block before:block before:absolute " +
                  "before:-skew-y-3 before:bg-gray-700 before:dot-md-center ",
              }}
              mode="single"
              selected={selectedDate}
              onSelect={(date?: Date) => date && setSelectedDate(date)}
              onMonthChange={setSelectedDate}
              showOutsideDays
              fixedWeeks
              month={startOfMonth(selectedDate)}
            />
          </section>
          <section className="flex-1 w-60 min-w-fit max-w-full">
            <div className="mt-4">{format(selectedDate, "EEEE, d MMMM")}</div>
            {showLoader ? (
              <div className="w-full h-36 flex items-center justify-center">
                <Spinner color="gray" />
              </div>
            ) : availabilityEntries?.length ? (
              <div className="grid grid-cols-auto-sm gap-2 pt-4">
                <CalendarSlots
                  slots={Object.keys(slotsMap)
                    // use the first slot since non-bookable ones are at the end
                    .map((slotTime) => slotsMap[slotTime][0])}
                  selectedTime={selectedTime}
                  onTimeSelected={setSelectedTime}
                />
              </div>
            ) : !!nextAvailableDate ? (
              <div className="pt-4">
                <button
                  className="btn-main w-full"
                  onClick={() => setSelectedDate(nextAvailableDate)}
                >
                  Check Next Availability
                </button>
              </div>
            ) : (
              <div className="pt-4">No availability</div>
            )}
          </section>
        </div>
      </div>
      <section className="m-6 w-56 flex-grow">
        <CalendarSidebar
          service={service}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          timezone={timezone}
          slotsForTime={slotsMap[selectedTime] ?? []}
        />
      </section>
    </div>
  );
}

export default function Calendar({
  service,
}: {
  service: { id: string, name: string, duration: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-36 flex items-center justify-center">
          <Spinner color="gray" />
        </div>
      }
    >
      <CalendarView service={service} />
    </Suspense>
  );
}
