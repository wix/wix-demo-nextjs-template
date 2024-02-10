import { redirects } from "@wix/redirects";
import { WORKSHOPS_ROUTE } from "@/app/routes";

export const createRedirectCallbacks = ({
  baseUrl,
  postFlowUrl = baseUrl,
}: {
  baseUrl: string;
  postFlowUrl?: string;
}): redirects.CallbackParams => {
  const fixedBaseUrl = baseUrl.replace(/\/$/, "");
  return {
    postFlowUrl,
    planListUrl: fixedBaseUrl + "/plans",
    bookingsServiceListUrl: fixedBaseUrl + WORKSHOPS_ROUTE,
  };
};
