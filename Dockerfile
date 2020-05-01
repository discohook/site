FROM node:lts-alpine

RUN npm i -g pnpm

WORKDIR /app
RUN chown -R node:node /app
USER node

COPY package.json pnpm-lock.yaml /app/
RUN pnpm install

COPY . /app/
RUN pnpm run build

RUN pnpm prune --prod

ENV APP_PORT 8000
ENV NODE_ENV production
ENV NODE_OPTIONS --max-http-header-size=81920

EXPOSE 8000

CMD [ "node", "./lib/ssr/server.js" ]
