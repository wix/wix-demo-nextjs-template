"use client";
import { FC, useEffect, useMemo, useState } from "react";
import { ProductOptions } from "../ProductOptions/ProductOptions";
import { Accordion, Flowbite } from "flowbite-react";
import { selectDefaultOptionFromProduct } from "../ProductOptions/helpers";
import { useUI } from "../../Provider/context";
import { useAddItemToCart } from "@/app/hooks/useAddItemToCart";
import { HiArrowDown } from "react-icons/hi";
import { Quantity } from "../../Quantity/Quantity";
import { ProductTag } from "../ProductTag/ProductTag";
import { usePrice } from "@/app/hooks/usePrice";
import Link from "next/link";
import { Product, Variant } from '@/app/model/store/store-api';

interface ProductSidebarProps {
  product: Product;
  className?: string;
}

const createProductOptions = (
  selectedOptions?: any,
  selectedVariant?: Variant,
) =>
  Object.keys(selectedOptions ?? {}).length
    ? {
      options: selectedVariant?._id
        ? { variantId: selectedVariant!._id }
        : { options: selectedOptions },
    }
    : undefined;

export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  const addItem = useAddItemToCart();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant>({});
  const [selectedOptions, setSelectedOptions] = useState<any>({});

  const price = usePrice({
    amount: selectedVariant?.variant?.priceData?.price || product.price!.price!,
    currencyCode: product.price!.currency!,
  });

  useEffect(() => {
    if (
      product.manageVariants &&
      Object.keys(selectedOptions).length === product.productOptions?.length
    ) {
      const variant = product.variants?.find((variant) =>
        Object.keys(variant.choices!).every(
          (choice) => selectedOptions[choice] === variant.choices![choice]
        )
      );
      setSelectedVariant(variant!);
    }
    setQuantity(1);
  }, [selectedOptions]);

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions);
  }, [product]);

  const isAvailableForPurchase = useMemo(() => {
    if (!product.manageVariants && product.stock?.inStock) {
      return true;
    }
    if (!product.manageVariants && !product.stock?.inStock) {
      return false;
    }

    return selectedVariant?.stock?.inStock;
  }, [selectedVariant, product]);

  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem({
        quantity,
        catalogReference: {
          catalogItemId: product._id!,
          ...createProductOptions(selectedOptions, selectedVariant),
        },
      });
      setLoading(false);
      openSidebar();
    } catch (err) {
      setLoading(false);
    }
  };

  const buyNowLink = useMemo(() => {
    const productOptions = createProductOptions(
      selectedOptions,
      selectedVariant
    );
    return `/api/quick-buy/${product._id}?quantity=${quantity}&productOptions=${
      productOptions
        ? decodeURIComponent(JSON.stringify(productOptions.options))
        : ""
    }`;
  }, [selectedOptions, selectedVariant, product._id, quantity]);
  const flowBiteCss = `
    p {
        font-weight: 400;
    }
`;
  return (
    <>
      <ProductTag
        name={product.name!}
        price={price}
        sku={product.sku ?? undefined}
      />
      <div className="mt-2">
        <ProductOptions
          options={product.productOptions!}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
      <div className="mb-6">
        <span className="text-xs tracking-wide font-roboto font-normal">
          Quantity
        </span>
        <div className="mt-2">
          <Quantity
            value={quantity}
            max={
              (selectedVariant?.stock?.trackQuantity
                ? selectedVariant?.stock?.quantity
                : product.stock?.quantity!) ?? 9999
            }
            handleChange={(e) => setQuantity(Number(e.target.value))}
            increase={() => setQuantity(1 + quantity)}
            decrease={() => setQuantity(quantity - 1)}
          />
        </div>
      </div>
      {isAvailableForPurchase ? (
        <div>
          <button
            aria-label="Add to Cart"
            className="btn-main w-full my-1 font-roboto font-normal"
            type="button"
            onClick={addToCart}
            disabled={loading}
          >
            Add to Cart
          </button>
          <div className="w-full pt-2">
            <Link
              className="btn-main w-full my-1 block text-center font-roboto font-normal"
              href={buyNowLink}
            >
              Buy Now
            </Link>
          </div>
        </div>
      ) : null}
      {!isAvailableForPurchase ? (
        <div>
          <button
            aria-label="Not Available"
            className="btn-main w-full my-1 rounded-2xl text-2xl"
            type="button"
            disabled
          >
            No Available
          </button>
        </div>
      ) : null}
      <div className="mt-6">
        <style>{flowBiteCss}</style>
        <Flowbite
          theme={{
            theme: {
              accordion: {
                content: {
                  base: "bg-transparent p-5 font-roboto text-[#2F2F2F]",
                },
                title: {
                  heading: "text-black",
                  arrow: {
                    base: "text-black",
                  },
                  open: {
                    on: "bg-[#F6F6F6]",
                  },
                },
              },
            },
          }}
        >
          <Accordion flush={true} arrowIcon={HiArrowDown}>
            {product.additionalInfoSections!.map((info) => (
              <Accordion.Panel key={info.title}>
                <Accordion.Title>
                  <span className="text-sm">{info.title}</span>
                </Accordion.Title>
                <Accordion.Content>
                  <span
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: info.description ?? "" }}
                  />
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </Flowbite>
      </div>
    </>
  );
};
