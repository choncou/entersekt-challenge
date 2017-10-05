# Based off of cypress docker image to insure all system dependencies are
# installed to run tests

FROM node:8.4.0

RUN apt-get update && \
  apt-get install -y \
    libgtk2.0-0 \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    xvfb

WORKDIR /home/person/src/app

# only report NPM install warnings and errors
ENV npm_config_loglevel=warn

# install node dependecies
COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
