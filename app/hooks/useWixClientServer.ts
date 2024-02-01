import { createClient, OAuthStrategy } from "@wix/sdk";
import { redirects } from "@wix/redirects";
import { cookies } from "next/headers";
import { WIX_REFRESH_TOKEN } from '@/app/constants';

export const getWixClient = async () => {
  let refreshToken;
  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(
      cookieStore.get(WIX_REFRESH_TOKEN)?.value || "{}"
    );
  } catch (e) {}
  const wixClient = createClient({
    modules: {
      redirects,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });
  return wixClient;
};
