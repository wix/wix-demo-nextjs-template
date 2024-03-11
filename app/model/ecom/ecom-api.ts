export type LineItem = {
  _id?: string,
  quantity: number,
  catalogReference: {
    catalogItemId: string,
    options?: Record<string, any>
  }
  url?: string,
  productName?: {original: string},
  price?: { amount: string }
};

export type Cart = { overrideCheckoutUrl?: string, lineItems?: LineItem[], currency?: string };

export type LineItemQuantityUpdate = { _id: string, quantity: number };

let cart: Cart = { currency: 'USD', lineItems: [] }

export const addToCurrentCart = async ({ lineItems }: {lineItems: LineItem[]}) => {
  lineItems.forEach((lineItem) => {
    lineItem.price = lineItem.price || { amount: '5' }
  })
  cart.lineItems?.push(...lineItems);
  return { cart }
}

export const updateCurrentCart = async ({ cartInfo }: { cartInfo: Cart }) => {
  cart = {
    ...cart,
    ...cartInfo
  }
}

export const getCurrentCart = async () => {
  return cart
}

export const createCheckoutFromCurrentCart = async () => {
  return { checkoutId: 'checkout-id' }
}

export const createCheckout = async ({}: { lineItems: LineItem[], overrideCheckoutUrl: string }) => {
  return { _id: 'checkout-id' }
}

export const getOrder = async (orderId: string) => {
  const lineItems: LineItem[] = [];

  return { _id: orderId, currency: 'USD', lineItems }
}

export const updateCurrentCartLineItemQuantity = async (items: LineItemQuantityUpdate[]) => {
  items.forEach(({ _id, quantity }) => {
    const lineItem = cart.lineItems?.find((lineItem) => lineItem._id === _id)
    if (lineItem) {
      lineItem.quantity = quantity
    }
  })
  return { cart };
}

export const removeLineItemsFromCurrentCart = async (itemIds: string[]) => {
  cart.lineItems = cart.lineItems?.filter(({_id}) => itemIds.indexOf(_id!) === -1)
  return { cart };
}
