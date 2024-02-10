import {
  mapServiceInfo,
  ServiceInfoViewModel,
} from "@/app/model/service/service.mapper";
import { WixClient } from "@/app/components/Provider/ClientProvider";
import { safeCall } from "@/app/model/utils";

export const safeGetServices = (
  wixClient: WixClient,
  { limit = 100, categoryId = "" } = {}
) =>
  safeCall<{ services: ServiceInfoViewModel[] }>(
    () => getServices(wixClient, { limit, categoryId }),
    { services: [] },
    "Query Services"
  );

export const getServices = (
  wixClient: WixClient,
  { limit = 100, categoryId = "" } = {}
): Promise<{ services: ServiceInfoViewModel[] }> => {
  let queryBuilder = wixClient!.services.queryServices().limit(limit);
  if (categoryId) {
    queryBuilder = queryBuilder.eq("category.id", categoryId);
  }
  return queryBuilder.find().then((result: any) => {
    return {
      services:
        (result.items?.map(mapServiceInfo) as ServiceInfoViewModel[]) ?? [],
    };
  });
};

export const getServiceBySlug = (
  wixClient: WixClient,
  serviceSlug: string
): Promise<{
  data: ServiceInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<ServiceInfoViewModel | null>(
    () =>
      wixClient!.services
        .queryServices()
        .eq("mainSlug.name", decodeURIComponent(serviceSlug))
        .find()
        .then((result: any) =>
          result.items?.length ? mapServiceInfo(result.items[0]) : null
        ),
    null,
    "Get Service By Slug"
  );

export const getServiceById = (
  wixClient: WixClient,
  serviceId: string
): Promise<{
  data: ServiceInfoViewModel | null;
  hasError: boolean;
  errorMsg?: string;
}> =>
  safeCall<ServiceInfoViewModel | null>(
    () => wixClient.services.getService(serviceId).then(mapServiceInfo),
    null,
    "Get Service By Id"
  );
