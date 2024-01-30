import Link from "next/link";
import ImageGallery from "@/app/components/Image/ImageGallery/ImageGallery";
import { PLACEHOLDER_IMAGE } from '@/app/constants';

export default async function ServicePage() {
  const service = {
    id: "1", name: "Service Name", tagLine: "Service Tagline", duration: "1 hr", slug: "service-slug", description: "Service Description"
  }

  return <ServicePageWithFallback service={service} />;
}

export function ServicePageWithFallback({
  service,
}: {
  service?: { id: string, name: string, tagLine: string, duration: string, slug: string, description: string } | null;
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

function ServicePageView({ service }: { service: { id: string, name: string, tagLine: string, duration: string, slug: string, description: string } }) {

  return (
    <div className="full-w rounded overflow-hidden max-w-7xl mx-auto">
      <div className="mt-14 mb-8 pb-2 border-b border-black/20 w-full">
        <h1 className="font-bold text-[50px] leading-[56.81px] mb-2 font-serif">
          {service.name}
        </h1>
        <p className="text-[18px] pt-4 empty:hidden font-roboto font-normal">
          {service.tagLine}
        </p>
        <div className="w-full h-full py-8 text-left">
          <div className="table text-base border-collapse">
            <div className="table-row">
              <p className="table-cell border border-black/20 p-4 empty:hidden">
                {service.duration}
              </p>
              <p className="table-cell border border-black/20 p-4 empty:hidden">
                13$
              </p>
              <p className="table-cell border border-black/20 p-4 empty:hidden">
                Offline
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
      {service.description ? (
        <div className="border-b border-black/20 pb-8">
          <h2 className="font-serif font-bold text-[30px] leading-[34.09px]">
            Service Description
          </h2>
          <p className="text-sm w-full mt-4 font-roboto text-[18px] font-normal">
            {service.description}
          </p>
        </div>
      ) : null}
      <section className="mt-10">
        <ImageGallery urls={[PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE, PLACEHOLDER_IMAGE]} />
      </section>
      <div className="w-full h-full pt-14 pb-10 text-center font-normal font-roboto">
        <Link href={`/calendar/${service.slug}`} className="btn-main">
          Book Now
        </Link>
      </div>
    </div>
  );
}
