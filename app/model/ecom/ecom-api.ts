import {createClient, OAuthStrategy} from '@wix/sdk';
import {
  backInStockNotifications,
  cart,
  checkout,
  currentCart,
  orders,
} from '@wix/ecom';
import Cookies from 'js-cookie';
import { STORES_APP_ID, WIX_REFRESH_TOKEN } from '@/app/constants';
import { Product } from '../store/store-api';

const wixClient = createClient({
  modules: {
    backInStockNotifications,
    cart,
    checkout,
    currentCart,
    orders,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken: JSON.parse(Cookies.get(WIX_REFRESH_TOKEN) || "{}"),
      accessToken: { value: "", expiresAt: 0 }
    },
  }),
});

export type LineItem = cart.LineItem;

export type Cart = cart.Cart;

export type LineItemQuantityUpdate = cart.LineItemQuantityUpdate;

export const addToCurrentCart = async ({ lineItems }: {lineItems: LineItem[]}) => {
  return wixClient.currentCart.addToCurrentCart({ lineItems });
}

export const updateCurrentCart = async ({ cartInfo }: { cartInfo: Cart }) => {
  return wixClient.currentCart.updateCurrentCart({ cartInfo });
}

export const getCurrentCart = async () => {
  return wixClient.currentCart.getCurrentCart();
}

export const createCheckoutFromCurrentCart = async () => {
  return wixClient.currentCart.createCheckoutFromCurrentCart(currentCart.ChannelType.WEB);
}

export const createCheckout = async ({ lineItems, overrideCheckoutUrl }: { lineItems: LineItem[], overrideCheckoutUrl: string }) => {
  return wixClient.checkout.createCheckout({
    lineItems,
    overrideCheckoutUrl,
    channelType: checkout.ChannelType.WEB
  });
}

export const getOrder = async (orderId: string) => {
  return wixClient.orders.getOrder(orderId);
}

export const updateCurrentCartLineItemQuantity = async (items: LineItemQuantityUpdate[]) => {
  return wixClient.currentCart.updateCurrentCartLineItemQuantity(items);
}

export const removeLineItemsFromCurrentCart = async (itemIds: string[]) => {
  return wixClient.currentCart.removeLineItemsFromCurrentCart(itemIds);
}

export const createBackInStockNotificationRequest = async ({
                                                             email,
                                                             variantId,
                                                             product
}: { email: string, variantId: string, product: Product }) => {
  return wixClient.backInStockNotifications.createBackInStockNotificationRequest(
    {
      email,
      itemUrl: window.location.href,
      catalogReference: {
        appId: STORES_APP_ID,
        catalogItemId: product._id,
        options: { variantId },
      },
    },
    {
      price: product.price?.price?.toFixed(),
      name: product.name!,
      image: product.media?.mainMedia?.image?.url,
    }
  )
}
