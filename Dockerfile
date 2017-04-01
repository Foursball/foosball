FROM ubuntu:xenial

RUN apt-get update && apt-get install -y curl && curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs git && apt-get clean

RUN npm i -g bower ember

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY bower.json /usr/src/app
RUN npm install && bower install --allow-root

COPY . /usr/src/app

EXPOSE 4200

CMD npm start
