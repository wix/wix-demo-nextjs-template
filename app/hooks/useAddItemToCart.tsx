import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCurrentCart, LineItem, updateCurrentCart } from '@/app/model/ecom/ecom-api';

export const useAddItemToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: LineItem) =>
      addItemFromCart(item),
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data.cart);
    },
  });
  return mutation.mutate;
};

async function addItemFromCart(
  item: LineItem
) {
  const data = await addToCurrentCart({
    lineItems: [item],
  });
  if (!data?.cart?.overrideCheckoutUrl) {
    void updateCurrentCart({
      cartInfo: {
        overrideCheckoutUrl: `${window.location.origin}/api/redirect-to-checkout?checkoutId={checkoutId}`,
      },
    });
  }
  return data;
}
