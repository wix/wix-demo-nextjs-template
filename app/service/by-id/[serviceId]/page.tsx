import { ServicePageWithFallback } from "@/app/service/[slug]/page";

export default async function ServicePage({ params }: any) {
  const service = {id: "1", name: "Service Name", tagLine: "Service Tagline", duration: "1 hr", slug: "service-slug", description: "Service Description"}

  return <ServicePageWithFallback service={service} />;
}
