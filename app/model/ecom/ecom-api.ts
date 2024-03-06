export type LineItem = {
  quantity: number,
  catalogReference: {
    catalogItemId: string,
    options: Record<string, any>
  }
};
export type Cart = { overrideCheckoutUrl?: string};

const cart: Cart = {}

export const addToCurrentCart = async ({ lineItems }: {lineItems: LineItem[]}) => {
  return { cart }
}

export const updateCurrentCart = async ({}: { cartInfo: Cart }) => {

}
