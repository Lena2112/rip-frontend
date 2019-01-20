FROM node:10.4.1

COPY ./ /src/
WORKDIR /src/
COPY package.json ./package.json

RUN npm i

CMD ["npm", "start"]