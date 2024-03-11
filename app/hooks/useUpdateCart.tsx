import { useMutation, useQueryClient } from "@tanstack/react-query";
import {LineItemQuantityUpdate, updateCurrentCartLineItemQuantity} from "@/app/model/ecom/ecom-api";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: { _id: string, quantity: number }) =>
      updateLineItemQuantity(item),
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], data.cart);
    },
  });
  return mutation.mutate;
};

async function updateLineItemQuantity(
  item: LineItemQuantityUpdate
) {
  return updateCurrentCartLineItemQuantity([item]);
}
