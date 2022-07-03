FROM node:latest

WORKDIR /usr/frontend
COPY package.json yarn.lock ./
RUN yarn
RUN yarn add serve

COPY . .

EXPOSE 3000
CMD ["yarn","build"]
CMD ["yarn" ,"global"]