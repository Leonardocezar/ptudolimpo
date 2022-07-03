FROM node:lts-slim

WORKDIR /usr/backend
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333
CMD ["yarn","start"]
