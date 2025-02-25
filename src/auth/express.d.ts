import * as express from 'express';
import * as oid from 'openid-client';

declare global {
  namespace Express {
    interface User extends CustomUser {
      user: {
        sub: string;
        email_verified?: boolean;
        name?: string;
        preferred_username?: string;
        given_name?: string;
        family_name?: string;
        email?: string;
      };
      tokens: oid.TokenEndpointResponse;
    }

    interface Request {
      user?: User;
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    pkce_code: string;
  }
}
