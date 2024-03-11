import React from "react";
import Link from "next/link";
import Image from 'next/image';
import { STORE_CATEGORY_ROUTE, STORE_ROUTE } from "@/app/routes";
import { Collection, queryCollections } from '@/app/model/store/store-api';

async function Collections() {
  const items = await queryCollections({
    limit: 3,
    exclude: "All Products",
  });

  return (
    <div className="grid gap-x-[64px] gap-y-8 lg:grid-cols-3 ">
      {items.map((item: any, index: any) => (
        <CollectionCard item={item} key={item._id} index={index} />
      ))}
    </div>
  );
}

const CollectionCard: React.FC<{
  item: Collection;
  index: number;
}> = ({ item, index }) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="h-[348px] w-full">
        <Image
          alt={item.media?.mainMedia?.image?.altText!}
          src={item.media?.mainMedia?.image?.url!}
          objectFit="cover"
          width={600}
          height={800}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={index != -1 && index < 3}
        />
      </div>
      <h1 className="font-serif font-bold text-[20px] leading-[22.72px]">
        {item.name}
      </h1>
      <Link
        href={`${STORE_CATEGORY_ROUTE}/${item.slug}`}
        className="capitilize mt-[24px]  btn-main capitalize font-roboto text-center font-[400] text-xl justify-items-start"
      >
        see products
      </Link>
    </div>
  );
};

export const StoreSection = () => {
  return (
    <div className="flex flex-col mx-auto max-md:px-[32px] lg:p-[120px] md:max-w-[1172px] lg:max-w-[1372px] gap-[60px] w-full">
      <hr className="border-[#EAEAEA] w-full md:hidden" />
      <div className="flex max-md:justify-center justify-between">
        <h2 className="font-serif font-bold md:text-[50px] text-[30px] md:leading-[56.81px] max-md:text-center">
          Check out our store
        </h2>
        <Link
          href={STORE_ROUTE}
          className="max-md:hidden mt-[24px] capitalize md:text-[18px] text-[14px] leading-[20.45px] text-center font-[400] text-xl justify-items-start"
        >
          see all products
        </Link>
      </div>
      <Collections />
      <Link
        href={STORE_ROUTE}
        className="md:hidden mt-[24px] capitalize md:text-[18px] text-[14px] leading-[20.45px] text-center font-[400] text-xl justify-items-start"
      >
        see all products
      </Link>
      <hr className="border-[#EAEAEA] w-full md:hidden" />
    </div>
  );
};
