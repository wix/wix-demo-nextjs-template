import { useQuery } from "@tanstack/react-query";
import { getCurrentCart } from '@/app/model/ecom/ecom-api';

export const useCart = () => {
  return useQuery(["cart"], () => getCurrentCart(), {
    retry: false,
  });
};
