FROM node:8-alpine

RUN mkdir image
COPY / /image
WORKDIR /image

ENV PATH /image/node_modules/.bin:$PATH

COPY package.json /image/package.json

RUN npm i

CMD ["npm", "start"]
