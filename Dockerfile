FROM node:carbon-alpine
COPY src /Latech_app
COPY router /Latech_app
COPY package-lock.json /Latech_app
COPY package.json /Latech_app
WORKDIR /Latech_app
RUN npm install
EXPOSE 3001
CMD src/index.js

