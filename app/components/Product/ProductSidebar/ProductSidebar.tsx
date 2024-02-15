"use client";
import { FC, useEffect, useState } from "react";
import { ProductOptions } from "../ProductOptions/ProductOptions";
import { Accordion, Flowbite } from "flowbite-react";
import { selectDefaultOptionFromProduct } from "../ProductOptions/helpers";
import { useUI } from "../../Provider/context";
import { HiArrowDown } from "react-icons/hi";
import { Quantity } from "../../Quantity/Quantity";
import { ProductTag } from "../ProductTag/ProductTag";
import Link from "next/link";

interface ProductSidebarProps {
  product: {
    name: string, sku: string,
    additionalInfoSections: {title: string, description: string}[],
    productOptions: {optionType: string,name: string, choices: {description: string, value: string}[]}[]
  };
  className?: string;
}

const createProductOptions = (
  selectedOptions?: any,
  selectedVariant?: {_id: string}
) =>
  Object.keys(selectedOptions ?? {}).length
    ? {
        options: selectedVariant?._id
          ? { variantId: selectedVariant!._id }
          : { options: selectedOptions },
      }
    : undefined;

export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  const { openModalBackInStock } = useUI();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<any>({});

  const price = "55$";

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions);
  }, [product]);

  const addToCart = async () => {};

  const notifyWhenAvailable = async () => {
    openModalBackInStock(product);
  };
  const flowBiteCss = `
    p {
        font-weight: 400;
    }
`;
  return (
    <>
      <ProductTag
        name={product.name}
        price={price}
        sku={product.sku}
      />
      <div className="mt-2">
        <ProductOptions
          options={product.productOptions}
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
            max={9999}
            handleChange={(e) => setQuantity(Number(e.target.value))}
            increase={() => setQuantity(1 + quantity)}
            decrease={() => setQuantity(quantity - 1)}
          />
        </div>
      </div>
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
            href="/"
          >
            Buy Now
          </Link>
        </div>
      </div>
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
