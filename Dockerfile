FROM node:12-alpine AS builder

RUN npm i -g pnpm

WORKDIR /app
RUN chown -R node:node /app
USER node

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

RUN pnpm run build

RUN pnpm prune --prod

FROM node:12-alpine

WORKDIR /app
RUN chown -R node:node /app
USER node

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public

ENV NODE_ENV production
ENV NODE_OPTIONS --max-http-header-size=81920

EXPOSE 3000

CMD [ "node_modules/.bin/next", "start" ]
