FROM node:12-alpine

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn run build

USER node

EXPOSE 3000

CMD [ "yarn", "run", "start" ]
