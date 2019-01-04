FROM node:8-slim

RUN npm install -g http-server

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "prod"]
