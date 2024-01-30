import { ProductSidebar } from "@/app/components/Product/ProductSidebar/ProductSidebar";
import ImageGalleryClient from '@/app/components/Image/ImageGallery/ImageGallery.client';
import { PLACEHOLDER_IMAGE } from '@/app/constants';

export async function generateMetadata({ params }: any) {
  const product = { name: "Product name" };
  return {
    title: product.name ?? "Unavailable Product",
  };
}

export default async function StoresCategoryPage({ params }: any) {
  if (!params.slug) {
    return;
  }

  const product = {
    _id: "1",
    name: "Product name", sku: "sku",
    description: "Product Description",
    additionalInfoSections: [{
    title: "Additional Info 1", description: "Additional Description 1"
  }, {
    title: "Additional Info 2", description: "Additional Description 2"
  }],
    productOptions: [{optionType: "color", name: "Color", choices: [{description: "blue", value: "blue"}, {description: "green", value: "green"}]}]
  };
  return (
    <div className="mx-auto px-14 my-[80px]">
      {product ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="box-border flex flex-col basis-1/2">
              <div>
                <ImageGalleryClient items={[{src: PLACEHOLDER_IMAGE}, {src: PLACEHOLDER_IMAGE}, {src: PLACEHOLDER_IMAGE}]} />
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
  return [{slug: 'product-1'}, {slug: 'product-2'}, {slug: 'product-3'}];
}
