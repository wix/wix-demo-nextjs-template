"use client";
import { PropsWithChildren } from "react";
import { Tooltip } from "flowbite-react";

export type SlotViewModel = {
  formattedTime: string;
  slotAvailability: {
    bookable: boolean,
    bookingPolicyViolations?: { tooLateToBook: boolean }
  }
};

const SlotTooltip = ({
  bookable,
  bookingPolicyViolations,
  children,
}: PropsWithChildren<{
  bookable: boolean,
  bookingPolicyViolations?: { tooLateToBook: boolean }
}>) =>
  bookable ? (
    <div className="w-full">{children}</div>
  ) : (
    <Tooltip
      content={
        bookingPolicyViolations?.tooLateToBook
          ? "This slot cannot be booked anymore"
          : bookingPolicyViolations?.tooLateToBook
          ? "It is too early to book this slot"
          : "This slot cannot be booked"
      }
    >
      {children}
    </Tooltip>
  );

const CalendarSlots = ({
  slots,
  onTimeSelected,
  selectedTime,
}: {
  slots: SlotViewModel[];
  selectedTime: string;
  onTimeSelected: (selectedTime: string) => void;
}) => (
  <>
    {slots
      .filter(({ slotAvailability: { bookable } }) => bookable)
      .map(
        (
          {
            formattedTime,
            slotAvailability: { bookable, bookingPolicyViolations },
          },
          index
        ) => (
          <button
            key={index}
            className={`btn-main px-3 py-1.5 w-full border-2 flex justify-center ${
              formattedTime === selectedTime
                ? "border-gray-700 bg-gray-700 text-white"
                : "hover:border-gray-700 border-gray-500"
            }`}
            disabled={!bookable}
            aria-label={"Select " + formattedTime}
            onClick={() => onTimeSelected(formattedTime)}
          >
            <SlotTooltip
              bookable={bookable}
              bookingPolicyViolations={bookingPolicyViolations}
            >
              <div className="text-sm font-roboto font-normal">
                {formattedTime}
              </div>
            </SlotTooltip>
          </button>
        )
      )}
  </>
);

export default CalendarSlots;
