import React, { Suspense } from "react";
import Image from "next/image";
import { ProductCategories } from "@/app/components/ProductCategories/ProductCategories";
import Link from "next/link";
import { Metadata } from "next";
import {
  CardSkeleton,
  ListSkeleton,
} from "@/app/components/Skeletons/Skeletons";

export const metadata: Metadata = {
  title: "Store",
  description: "",
};

const ProductCard = ({
  item,
  index,
}: {
  item: {_id: string, slug: string, name: string};
  index: number;
}) => {
  return (
    <div
      className="flex flex-col h-full md:p-0 md:border-none
                                        pb-[52px] border-b border-gray-200 gap-[24px]"
    >
      <Link
        className="relative max-w-full md:w-[502px] pt-[100%] md:mt-0 mt-5"
        href={`/product-page/${item.slug}`}
      >
        <Image
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1535px) 33vw, 25vw"
          src="/images/placeholder.jpg"
          alt="main image"
          className="w-full h-auto"
          priority={index < 4}
        />
      </Link>
      <Link
        className="flex align-middle items-center w-full h-full gap-[24px] justify-between"
        href={`/product-page/${item.slug}`}
      >
        <div className="card-title w-auto text-[16px] flex m-0 p-0 grow">
          {item.name}
        </div>
        <div className="card-price w-auto text-[16px] flex justify-end items-center align-middle">
          55$
        </div>
      </Link>
      <button className="btn-main cursor-pointer text-lg" disabled>
        Out of Stock
      </button>
    </div>
  );
};

export async function StoresCategory({ params }: any) {
  let items = [{
    _id: "1", slug: "product-1", name: "Product 1"
  }, {
    _id: "2", slug: "product-2", name: "Product 2"
  }, {
    _id: "3", slug: "product-3", name: "Product 3"
  }];
  let collections = [{
    _id: "1", name: "Collection 1", slug: "collection-1"
  }, {
    _id: "2", name: "Collection 2", slug: "collection-2"
  }, {
    _id: "3", name: "Collection 3", slug: "collection-3"
  }];
  let collectionId;


  return (
    <div className="overflow-hidden mx-auto flex md:flex-row flex-col gap-8 max-md:p-[20px]">
      <ProductCategories
        collections={collections}
        selectedCollectionId={collectionId}
      />
      {items.length ? (
        <div className="text-center grow">
          <ul className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 grid-flow-row">
            {items.map((item, index) => (
              <li key={item._id}>
                <ProductCard item={item} index={index} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-borderbox-border max-w-4xl mx-auto">
          No products found. Click{" "}
          <Link
            href="https://manage.wix.com/account/site-selector?actionUrl=+https%3A%2F%2Fmanage.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Fstore%2Fproducts%3FreferralInfo%3DHeadless"
            target="_blank"
            rel="noreferrer"
            className="text-purple-500"
          >
            here
          </Link>{" "}
          to go to the business dashboard to add products. Once added, they will
          appear here.
        </div>
      )}
    </div>
  );
}

export default async function Page({ params }: any) {
  return (
    <Suspense
      fallback={
        <div className="full-w overflow-hidden mx-auto flex md:flex-row flex-col gap-8 max-md:p-[20px]">
          <div
            role="status"
            className="max-md:hidden max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
          >
            <ListSkeleton />
            <span className="sr-only">Loading...</span>
          </div>

          <div className="text-center grow">
            <ul className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 grid-flow-row">
              {[...Array(8)].map((_, i) => (
                <li
                  key={i}
                  className={
                    "flex flex-col items-center justify-center max-md:h-[55vh] md:h-[400px]"
                  }
                >
                  <div
                    role="status"
                    className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700 w-full h-full"
                  >
                    <CardSkeleton height={"full"} />
                    <span className="sr-only">Loading...</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    >
      <StoresCategory params={params} />
    </Suspense>
  );
}
