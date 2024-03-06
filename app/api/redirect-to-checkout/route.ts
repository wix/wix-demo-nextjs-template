import { NextRequest, NextResponse } from "next/server";
import { getRequestUrl } from "../../utils/server-utils";
import { createRedirectSession } from '@/app/model/redirect/redirect-api';

export async function GET(request: NextRequest) {
  const requestUrl = getRequestUrl(request);
  const baseUrl = new URL("/", requestUrl).toString();
  const { searchParams } = new URL(requestUrl);
  const checkoutId = searchParams.get("checkoutId")!;

  const { redirectSession } = await createRedirectSession({
    checkoutId,
    callbacks: {
      postFlowUrl: baseUrl,
      thankYouPageUrl: `${baseUrl}stores-success`,
      cartPageUrl: `${baseUrl}cart`,
    },
  });

  return NextResponse.redirect(redirectSession!.fullUrl!);
}
