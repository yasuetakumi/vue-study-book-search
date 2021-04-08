FROM node:lts-alpine

WORKDIR /usr/src/app

COPY client/package.json ./

RUN yarn --silent
EXPOSE 3000
CMD ["yarn", "run", "serve"]