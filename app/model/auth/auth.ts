import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { items } from "@wix/data";
import {
  backInStockNotifications,
  checkout as ecomCheckout,
  currentCart,
  orders,
} from "@wix/ecom";
import {
  checkout,
  orders as eventOrders,
  schedule,
  wixEvents,
} from "@wix/events";
import { redirects } from "@wix/redirects";
import {
  availabilityCalendar,
  bookings,
  extendedBookings,
  services,
} from "@wix/bookings";
import Cookies from "js-cookie";
import { WIX_REFRESH_TOKEN } from "@/app/constants";


const wixSingleton = (() => {
  let instance: ReturnType<typeof init>;

  const init = () => {
    return createClient({
      modules: {
        products,
        items,
        collections,
        currentCart,
        backInStockNotifications,
        wixEvents,
        checkout,
        redirects,
        ecomCheckout,
        schedule,
        orders,
        eventOrders,
        availabilityCalendar,
        services,
        bookings: extendedBookings,
        bookingsActions: bookings,
      },
      auth: OAuthStrategy({
        clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
        tokens: {
          refreshToken: JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || "{}"),
          accessToken: { value: "", expiresAt: 0 }
        },
      }),
    });
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

export const getWixClient = () => wixSingleton.getInstance();
