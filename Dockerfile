FROM node:14
WORKDIR /usr/src/proiot
COPY ./package.json .
RUN npm install --only=prod