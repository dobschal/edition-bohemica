FROM node:10.24.1-alpine3.11

RUN echo "Update OS"
RUN apk update

RUN echo "Install make & g++"
RUN apk add --no-cache make
RUN apk add --no-cache g++
RUN apk add --no-cache vips vips-dev fftw-dev build-base

RUN echo "Install python3 and pip"
RUN apk add --no-cache python3 py3-pip

WORKDIR /usr/src/app

RUN echo "Copying all files"
COPY . .

WORKDIR /usr/src/app/client

RUN echo "Installing client dependencies"
RUN npm install

RUN echo "Building client"
RUN npm run build:prod

WORKDIR /usr/src/app/server

RUN echo "Installing server dependencies"
RUN npm install

EXPOSE 3000

RUN echo "Starting server"
CMD ["node", "app.js"]
