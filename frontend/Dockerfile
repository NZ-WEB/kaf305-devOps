FROM node:17.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build
