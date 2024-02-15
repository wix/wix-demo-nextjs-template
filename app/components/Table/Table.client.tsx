"use client";
import { useEffect, useState } from "react";
import { Badge } from "flowbite-react";
import { Counter } from "../Counter/Counter";
import { Price } from "../Price/Price";

export function TicketsTable({
  tickets,
  event,
}: {
  tickets: {_id: string, name: string, description: string, price: number, canPurchase: boolean, limitPerCheckout: number, options: {_id: string, price: number, name: string}[]}[];
  event: { };
}) {
  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, { quantity: number; price: number }>
  >({});
  const [serviceFee, setServiceFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [subTotals, setSubTotals] = useState(0);
  const [expendPricingOptions, setExpendPricingOptions] = useState(
    {} as Record<string, boolean>
  );
  const [expendTicketDescription, setExpendTicketDescription] = useState(
    {} as Record<string, boolean>
  );
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setExpendPricingOptionsForTicket = (ticketId: string) => {
    setExpendPricingOptions({
      ...expendPricingOptions,
      [ticketId]: !expendPricingOptions[ticketId],
    });
  };

  const setExpendTicketDescriptionForTicket = (ticketId: string) => {
    setExpendTicketDescription({
      ...expendTicketDescription,
      [ticketId]: !expendTicketDescription[ticketId],
    });
  };

  const setTickets = (
    ticket: Record<string, { quantity: number; price: number }>
  ) => {
    const [ticketId, { quantity }] = Object.entries(ticket)[0];
    if (quantity === 0) {
      delete selectedTickets[ticketId];
      setSelectedTickets({ ...selectedTickets });
      return;
    }
    setSelectedTickets({ ...selectedTickets, ...ticket });
    setError("");
  };

  const findTicketAndMaybeOption = (key: string) => {
    const [ticketId, optionId] = key.split("|");
    const ticket = tickets.find((t) => t._id === ticketId);
    if (!optionId) {
      return { ticket };
    }
    const option = ticket!.options.find(
      (o) => o._id === optionId
    );
    return { ticket, option };
  };

  useEffect(() => {
    setServiceFee(
      Object.keys(selectedTickets).reduce((acc, key) => {
        const { ticket, option } = findTicketAndMaybeOption(key);
        const tax =
          ((option?.price || ticket?.price!) * 17) / 100;
        const price = selectedTickets[key].price + tax;
        const priceWithTax = price + 20;
        return acc + selectedTickets[key].quantity * priceWithTax;
      }, 0)
    );

    setSubTotals(
      Object.keys(selectedTickets).reduce(
        (acc, key) =>
          acc + selectedTickets[key].quantity * selectedTickets[key].price,
        0
      )
    );
  }, [selectedTickets]);

  const createReservation = async () => {};

  return (
    <div className="flex full-w flex-col max-w-[858px] mx-auto">
      <div className="flex full-w flex-col" id="tickets">
        {tickets.map((ticket) => (
          <div
            className="flex flex-col sm:flex-row mt-6 border p-4 sm:p-6"
            key={ticket._id}
          >
            <div className="basis-1/2 sm:border-r-2">
              <span className="block text-12 font-roboto font-normal">
                Ticket type
              </span>
              <span className="text-base">{ticket.name}</span>
              <div className="mt-2 text-xs">
                <p>Sale ends</p>
                <p>19:00 PM Monday</p>
              </div>
              {expendTicketDescription[ticket._id!] && (
                <p className="text-xs">{ticket.description}</p>
              )}
              {ticket.description && (
                <div className="whitespace-nowrap my-1">
                  <div className="flex justify-between">
                    <button
                      className="text-xs text-purple-400 underline"
                      onClick={() =>
                        setExpendTicketDescriptionForTicket(ticket._id!)
                      }
                    >
                      {expendTicketDescription[ticket._id!] ? "Less" : "More"}{" "}
                      info
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`basis-1/2 sm:pl-4 ${
                ticket.options.length
                  ? ""
                  : "flex flex-col sm:flex-row"
              }`}
            >
              <div className="basis-1/2 mt-4 sm:mt-0">
                <Price
                  selectedTickets={selectedTickets}
                  ticket={ticket}
                  setTickets={setTickets}
                  event={event}
                  disabled
                />
              </div>
              {!ticket.options.length && (
                <div
                  className={`sm:ml-auto mt-4 sm:mt-0 ${
                    !ticket.canPurchase ? "w-fit" : ""
                  }`}
                >
                  {ticket.canPurchase && (
                    <>
                      <span className="block text-12 mb-1 font-roboto font-normal">
                        Quantity
                      </span>

                      <Counter
                        onChange={setTickets}
                        ticketId={ticket._id!}
                        limit={ticket.limitPerCheckout!}
                        initialCount={
                          selectedTickets[ticket._id!]?.quantity ?? 0
                        }
                        price={
                          selectedTickets[ticket._id!]?.price ||
                          ticket.price
                        }
                      />
                    </>
                  )}
                  {ticket.limitPerCheckout! === 0 && (
                    <Badge color="gray">Sold Out</Badge>
                  )}
                </div>
              )}
              {ticket.options
                .slice(
                  0,
                  expendPricingOptions[ticket._id!]
                    ? ticket.options.length
                    : 3
                )
                .map((option) => (
                  <div
                    className="flex flex-col sm:flex-row mt-4 border-t-2 pt-4"
                    key={option._id}
                  >
                    <div className="basis-1/2">
                      <span className="whitespace-nowrap block text-12">
                        {option.name}
                      </span>
                      <span className="block">
                        <Price
                          selectedTickets={selectedTickets}
                          ticket={ticket}
                          setTickets={setTickets}
                          event={event}
                          disabled
                        />
                      </span>
                    </div>
                    <div
                      className={`ml-auto mt-2 sm:mt-0 ${
                        ticket.limitPerCheckout! > 0
                          ? "w-full sm:w-fit"
                          : "w-fit"
                      }`}
                    >
                      {ticket.limitPerCheckout! > 0 ? (
                        <>
                          <span className="block text-12 mb-1 font-roboto font-normal">
                            Quantity
                          </span>
                          <Counter
                            onChange={setTickets}
                            ticketId={ticket._id!}
                            optionId={option._id!}
                            limit={ticket.limitPerCheckout!}
                            initialCount={
                              selectedTickets[`${ticket._id!}|${option._id}`]
                                ?.quantity ?? 0
                            }
                            price={
                              selectedTickets[`${ticket._id!}|${option._id}`]
                                ?.price ||
                              option.price
                            }
                          />
                        </>
                      ) : (
                        <Badge color="gray">Sold Out</Badge>
                      )}
                    </div>
                  </div>
                ))}
              {ticket.options.length! > 3 && (
                <div className="whitespace-nowrap mt-6">
                  <div className="flex justify-between">
                    <button
                      className="text-sm text-purple-400 underline"
                      onClick={() =>
                        setExpendPricingOptionsForTicket(ticket._id!)
                      }
                    >
                      View {expendPricingOptions[ticket._id!] ? "less" : "more"}{" "}
                      price options
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sm:w-[35%] ml-auto mt-4 sm:mt-10">
        {Object.keys(selectedTickets).length && subTotals ? (
          <div className="flex" key="subtotal">
            <span>Subtotal</span>
            <span className="text-right ml-auto">
              100$
            </span>
          </div>
        ) : null}
        {tax ? (
          <div className="flex mt-2" key="tax">
            <div>VAT</div>
            <div className="text-right ml-auto">
              17$
            </div>
          </div>
        ) : null}
        {serviceFee ? (
          <div className="flex mt-2" key="fee">
            <span>Service fee</span>
            <span className="text-right ml-auto">
              10$
            </span>
          </div>
        ) : null}
        <div className="border-t flex mt-2 pt-2 text-lg" key="total">
          <span>Total</span>
          <span className="text-right ml-auto">
            127$
          </span>
        </div>
        <div className="mt-6" key="checkout">
          <div className="whitespace-nowrap font-medium">
            <button
              onClick={createReservation}
              disabled={
                Object.keys(selectedTickets).length === 0 || redirecting
              }
              className="btn-main w-full disabled:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:border-white font-roboto font-normal"
            >
              Checkout
            </button>
          </div>
        </div>
        {error ? (
          <div className="mt-6" key="error">
            <div className="whitespace-nowrap font-medium">
              <span className="text-red-500">{error}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
