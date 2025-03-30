import { createReactOidc } from 'oidc-spa/react';
import { z } from 'zod';

export const { OidcProvider, useOidc, getOidc } = createReactOidc(async () => ({
  issuerUri: import.meta.env.VITE_AUTH_ISSUER,
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  homeUrl: import.meta.env.BASE_URL,
  autoLogin: true,
  autoLogoutParams: {
    redirectTo: 'home',
  },
  decodedIdTokenSchema: z.object({
    preferred_username: z.string(),
    name: z.string(),
    sub: z.string(),
    given_name: z.string(),
    family_name: z.string(),
    email: z.string(),
  }),
}));

export const fetchWithAuth: typeof fetch = async (input, init) => {
  const oidc = await getOidc();

  if (oidc.isUserLoggedIn) {
    const { accessToken } = await oidc.getTokens_next();

    (init ??= {}).headers = {
      ...init.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return fetch(input, init);
};
