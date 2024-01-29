import React from "react";

export function Price({
}: {
  ticket: {};
  setTickets: Function;
  event: { };
  disabled: boolean;
  selectedTickets: Record<string, { quantity: number; price: number }>;
}) {
  return (
    <span className="text-base">10$</span>
  );
}
