import { getWixClient } from '@/app/model/auth/auth';
import { getServiceById } from "@/app/model/service/service-api";
import { ServicePageWithFallback } from "@/app/service/[slug]/page";

export default async function ServicePage({ params }: any) {
  const wixClient = getWixClient();
  const { data: service } = params.serviceId
    ? await getServiceById(wixClient, params.serviceId)
    : { data: null };

  return <ServicePageWithFallback service={service} />;
}
