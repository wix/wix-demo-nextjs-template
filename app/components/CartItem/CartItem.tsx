"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useUI } from "../Provider/context";
import { Quantity } from "../Quantity/Quantity";
import { PLACEHOLDER_IMAGE } from '@/app/constants';
import { LineItem } from '@/app/model/ecom/ecom-api';
import { usePrice } from '@/app/hooks/usePrice';
import { useUpdateCart } from '@/app/hooks/useUpdateCart';
import { useRemoveItemFromCart } from '@/app/hooks/useRemoveItemFromCart';

export const CartItem = ({
  item,
  hideButtons,
  currencyCode,
  ...rest
}: {
  item: LineItem;
  hideButtons?: boolean;
  currencyCode: string;
}) => {
  const { closeSidebarIfPresent } = useUI();
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity ?? 1);
  const removeItem = useRemoveItemFromCart();
  const updateCartMutation = useUpdateCart();

  const price = usePrice({
    amount: Number.parseFloat(item.price?.amount!) * item.quantity!,
    baseAmount: Number.parseFloat(item.price?.amount!) * item.quantity!,
    currencyCode,
  });

  const handleChange = async ({
                                target: { value },
                              }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
    return updateCartMutation({ quantity: Number(value), _id: item._id! });
  };

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    setQuantity(val);
    return updateCartMutation({ quantity: val, _id: item._id! });
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      return removeItem(item._id!);
    } catch (error) {
      setRemoving(false);
    }
  };

  useEffect(() => {
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  const slug = item.url?.split("/").pop() ?? "";

  return (
    <li className="flex flex-col py-4" {...rest}>
      <div className="flex flex-row gap-4 py-4">
        <div className="w-20 h-20 bg-violet relative overflow-hidden z-0">
          {slug ? (
            <Link href={`/product-page/${slug}`}>
              <div onClick={() => closeSidebarIfPresent()}>
                <Image
                  alt="line item"
                  width={150} height={150}
                  src={PLACEHOLDER_IMAGE}
                />
              </div>
            </Link>
          ) : (
            <Image
              alt="line item"
              width={150} height={150}
              src={PLACEHOLDER_IMAGE}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="flex-1 flex flex-col text-base">
            {slug ? (
              <Link href={`/product-page/${slug}`}>
                <span className="cursor-pointer pb-1 text-gray-500">
                  {item.productName?.original}
                </span>
              </Link>
            ) : (
              <span className="pb-1 text-gray-500">
                {item.productName?.original}
              </span>
            )}
          </div>
          <span>{price}</span>
          {!hideButtons && (
            <div className="mt-3">
              <Quantity
                size="sm"
                value={quantity}
                handleChange={handleChange}
                increase={() => increaseQuantity(1)}
                decrease={() => increaseQuantity(-1)}
              />
            </div>
          )}
        </div>
        {!hideButtons && (
          <button className="flex" onClick={() => handleRemove()}>
            <svg
              fill="none"
              className="w-4 h-4"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </li>
  );
};
