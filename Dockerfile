FROM node:18.14-bullseye
RUN apt-get clean
RUN apt-get update && echo "1"
RUN apt-get install -y --no-install-recommends apt-utils unzip libzip-dev libpq-dev libjpeg-dev libpng-dev libfreetype6-dev libicu-dev iproute2 iputils-ping vim nano procps
RUN apt-get clean
RUN node --version

WORKDIR /home/node/app

#COPY app/package*.json ./
RUN yarn config set "strict-ssl" false
RUN yarn global add @nestjs/cli
#COPY app/yarn.lock ./
#RUN yarn
