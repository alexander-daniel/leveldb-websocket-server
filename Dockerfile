FROM node:alpine

WORKDIR /var/app

ADD package.json ./package.json

RUN apk add --update python make g++ && \
  npm install --production --build-from-source && \
  apk del python make g++

ADD index.js ./index.js

EXPOSE 3000
CMD ["node", "index.js"]
