import { getServiceBySlug } from "@/app/model/service/service-api";
import ImageGallery from "@/app/components/Image/ImageGallery/ImageGallery";
import { getWixClient } from '@/app/model/auth/auth';
import { useServiceFormattedPrice } from "@/app/hooks/useServiceFormattedPrice";
import { OfferedAsType } from "@/app/model/service/service-types.internal";
import { ServiceInfoViewModel } from "@/app/model/service/service.mapper";
import Link from "next/link";

const offeredAsToPaymentOptions = (offeredAs: string) =>
  offeredAs === OfferedAsType.OFFLINE
    ? "Offline"
    : offeredAs === OfferedAsType.ONLINE
      ? "Online"
      : offeredAs === OfferedAsType.PRICING_PLAN
        ? "Paid Plans"
        : "Other";

export default async function ServicePage({ params }: any) {
  const wixClient = getWixClient();
  const { data: service } = params.slug
    ? await getServiceBySlug(wixClient, params.slug)
    : { data: null };

  return <ServicePageWithFallback service={service} />;
}

export function ServicePageWithFallback({
                                          service,
                                        }: {
  service?: ServiceInfoViewModel | null;
}) {
  return (
    <div className="max-w-full-content mx-auto bg-white px-6 sm:px-28">
      {service ? (
        <ServicePageView service={service} />
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          The service was not found
        </div>
      )}
    </div>
  );
}

function ServicePageView({ service }: { service: ServiceInfoViewModel }) {
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );

  return (
    <div className="full-w rounded overflow-hidden max-w-7xl mx-auto">
      <div className="mt-14 mb-8 pb-2 border-b border-black/20 w-full">
        <h1 className="font-bold text-[50px] leading-[56.81px] mb-2 font-serif">
          {service.info.name}
        </h1>
        <p className="text-[18px] pt-4 empty:hidden font-roboto font-normal">
          {service.info.tagLine}
        </p>
        <div className="w-full h-full py-8 text-left">
          <div className="table text-base border-collapse">
            <div className="table-row">
              <p className="table-cell border border-black/20 p-4 empty:hidden">
                {service.info.formattedDuration}
              </p>
              <p className="table-cell border border-black/20 p-4 empty:hidden">
                {formattedPrice.userFormattedPrice}
              </p>
              <p className="table-cell border border-black/20 p-4 empty:hidden">
                {service.payment.offeredAs
                  .map(offeredAsToPaymentOptions)
                  .join(", ")}
              </p>
            </div>
          </div>
          <div className="mt-9">
            <Link
              href={`/calendar/${service.slug}`}
              className="btn-main font-roboto font-normal"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
      {service.info.description ? (
        <div className="border-b border-black/20 pb-8">
          <h2 className="font-serif font-bold text-[30px] leading-[34.09px]">
            Service Description
          </h2>
          <p className="text-sm w-full mt-4 font-roboto text-[18px] font-normal">
            {service.info.description}
          </p>
        </div>
      ) : null}
      {service.info.media?.otherMediaItems?.length ? (
        <section className="mt-10">
          <ImageGallery mediaItems={service.info.media.otherMediaItems} />
        </section>
      ) : null}
      <div className="w-full h-full pt-14 pb-10 text-center font-normal font-roboto">
        <Link href={`/calendar/${service.slug}`} className="btn-main">
          Book Now
        </Link>
      </div>
    </div>
  );
}
