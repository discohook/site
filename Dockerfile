FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY patches ./patches
RUN yarn install

COPY . .
RUN yarn run build

USER node

EXPOSE 3000

CMD [ "yarn", "run", "start" ]
