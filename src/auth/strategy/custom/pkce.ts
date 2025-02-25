import { Strategy, StrategyCreated, StrategyCreatedStatic } from 'passport';
import * as oid from 'openid-client';
import { Request } from 'express';

export class _OidcStrategyPKCE extends Strategy {
  name?: string;
  config: oid.Configuration;
  code_challenge_method = 'S256';
  callback_uri: string;

  constructor(oidcConfig: oid.Configuration, callback_uri: string) {
    super();
    this.config = oidcConfig;
    this.callback_uri = callback_uri;
  }

  async authenticate(
    this: StrategyCreated<this, this & StrategyCreatedStatic>,
    req: Request,
    options?: any,
  ) {
    /**
     * If we are coming back from the idp, we begin to
     * fetch the access tokens.
     */
    if (this.callback_uri.endsWith(req.url.split('?', 1)[0])) {
      if (!req.session.pkce_code) {
        this.error("Users' code verifier is missing!");
        return;
      }

      const reqState = req.params.state;
      const base = req.protocol + '://' + req.headers.host + '/';

      const tokens: oid.TokenEndpointResponse =
        await oid.authorizationCodeGrant(this.config, new URL(req.url, base), {
          pkceCodeVerifier: req.session.pkce_code,
          expectedState: reqState,
        });

      if (!tokens.id_token) {
        this.error('ID Token is missing from the TokenEndpointResponse');
        return;
      }
      const tokenIntrospectionSub = await oid.tokenIntrospection(
        this.config,
        tokens.id_token,
      );

      const userInfo = await oid.fetchUserInfo(
        this.config,
        tokens.access_token,
        tokenIntrospectionSub?.sub || '',
      );
      this.success({
        user: userInfo,
        tokens: tokens,
      });
      return;
    }

    /**
     * If we are not coming back, ie. any other url than
     * the redirect url, we begin the auth process from scratch.
     */
    const code_verifier = oid.randomPKCECodeVerifier();
    const code_challenge = await oid.calculatePKCECodeChallenge(code_verifier);

    req.session.pkce_code = code_verifier;

    const parameters: Record<string, string> = {
      redirect_uri: this.callback_uri,
      scope: 'openid email',
      code_challenge,
      code_challenge_method: this.code_challenge_method,
    };

    const redirectTo = oid.buildAuthorizationUrl(this.config, parameters);
    this.redirect(redirectTo.toString());
  }
}
