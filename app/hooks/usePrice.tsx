import { formatCurrency } from "../utils/price-formtter";

export function usePrice(
  data?: {
    amount: number;
    baseAmount?: number;
    currencyCode: string;
  } | null
): string {
  const { amount, baseAmount, currencyCode } = data ?? {};

  return (typeof amount !== "number" || !currencyCode)
    ? ""
    : formatCurrency(amount, currencyCode);
}
