import { Dispatch, SetStateAction } from "react";
import { Product } from '@/app/model/store/store-api';

export type SelectedOptions = Record<string, string | null>;

export function selectDefaultOptionFromProduct(
  product: Product,
  updater: Dispatch<SetStateAction<SelectedOptions>>
) {
  // Selects the default option
  product.productOptions?.forEach((option) => {
    updater((choices) => ({
      ...choices,
      [option.name!]: option.choices![0].description!,
    }));
  });
}
