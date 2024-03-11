import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeLineItemsFromCurrentCart } from "@/app/model/ecom/ecom-api";

export const useRemoveItemFromCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (itemId: string) => removeItemFromCart(itemId),
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data.cart);
    },
  });
  return mutation.mutate;
};

async function removeItemFromCart(itemId: string) {
  return removeLineItemsFromCurrentCart([itemId]);
}
