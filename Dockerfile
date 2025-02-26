FROM node:22-alpine AS base

WORKDIR /usr/app

COPY . .

WORKDIR /usr/app/client
RUN npm install --legacy-peer-deps
RUN npm run build

WORKDIR /usr/app
RUN npm install
RUN npm run build


FROM node:22-alpine AS release
ENV NODE_ENV=production

WORKDIR /usr/app
COPY --from=base /usr/app/client/dist client/dist
COPY --from=base /usr/app/package*.json .
COPY --from=base /usr/app/prisma prisma/
COPY --from=base /usr/app/dist/ dist/
RUN npm install
RUN npx prisma generate

USER node
ENTRYPOINT [ "node", "/usr/app/dist/main.js" ]
# CMD ["sleep", "infinity"]
