export type LineItem = {
  quantity: number,
  catalogReference: {
    catalogItemId: string,
    options: Record<string, any>
  }
  price?: { amount: string }
};
export type Cart = { overrideCheckoutUrl?: string, lineItems?: LineItem[], currency?: string };

const cart: Cart = { currency: 'USD', lineItems: [] }

export const addToCurrentCart = async ({ lineItems }: {lineItems: LineItem[]}) => {
  return { cart }
}

export const updateCurrentCart = async ({}: { cartInfo: Cart }) => {

}

export const getCurrentCart = async () => {
  return cart
}

export const createCheckoutFromCurrentCart = async () => {
  return {checkoutId: 'checkout-id'}
}

export const createCheckout = async ({}: { lineItems: LineItem[], overrideCheckoutUrl: string }) => {
  return {_id: 'checkout-id'}
}
