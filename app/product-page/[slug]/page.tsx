import { ProductSidebar } from "@/app/components/Product/ProductSidebar/ProductSidebar";
import ImageGalleryClient from '@/app/components/Image/ImageGallery/ImageGallery.client';
import { PLACEHOLDER_IMAGE } from '@/app/constants';
import { queryProducts } from '@/app/model/store/store-api';

export async function generateMetadata({ params }: any) {
  if (params.slug) {
    const product = (
      await queryProducts({
        slug: params.slug,
        limit: 1,
      })
    )[0];

    if (product && product.name) {
      return {
        title: product.name,
      };
    }
  }

  return {
    title: "Unavailable Product",
  };
}

export default async function StoresCategoryPage({ params }: any) {
  if (!params.slug) {
    return;
  }

  const product = (
    await queryProducts({
      slug: params.slug,
      limit: 1,
    })
  )[0];

  if (!product) {
    return;
  }
  return (
    <div className="mx-auto px-14 my-[80px]">
      {product ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="box-border flex flex-col basis-1/2">
              <div>
                <ImageGalleryClient items={product.media!.items!.map(({image}) => ({src: image!.url!}))} />
                <div
                  className="pb-4 mx-auto break-words w-full max-w-xl mt-6 font-roboto font-normal"
                  dangerouslySetInnerHTML={{
                    __html: product.description ?? "",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col w-full h-full basis-1/2 text-left">
              <ProductSidebar key={product._id} product={product} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border max-w-4xl mx-auto">
          Product Not Found
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams(): Promise<{ slug?: string }[]> {
  return queryProducts({
    limit: 10,
  })
    .then((items) =>
      items.map((product: any) => ({
        slug: product.slug,
      }))
    )
    .catch((err) => {
      console.error(err);
      return [];
    });
}
