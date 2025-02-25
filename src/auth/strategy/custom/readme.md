# Custom strategy

This strategy implements the oidc from with PKCE.
The adapter requires your identity provider to
expect the code challenge sent with the token exchange.

With this strategy, the express.User is extended to include the tokens
from the idp. Normally they would be discarded when the session had been built, after all we know who the user is at this point. Unless we'd
like to perform actions agains the idp in users behalve. These tokens should not be sent to the client though.

The layer of of abstractions with this fork are about:

--NestJS passport strategy
---- passport strategy

the oidc.strategy.ts does not work anymore without reverting some of the changes made to the User type in express.d.ts
