# Nestjs sandbox

Sandbox creates real users into keycloak for authentication and authorization.
Few identity providers have been configured. Uses regular OIDC flow for token exchange (PKCE).

Users are cleaned from the databases on a regular basis.
Once user is authenticated, they can store bookmarks in the site.

## Development

Steps to start the development environment:

1. `git clone`
2. Populate the `.env.example` into `.env`

\
In `/`:

3. Install deps `npm install`
4. Start the development database`docker compose -f 'docker-compose.yaml' up -d --build 'db''`
5. Run migrations `npm prisma:migrate`
6. `npm run dev`

\
In `client/`

7. Install deps `npm install`
8. `npm run dev`

\
9. navigate to `localhost:3000`
