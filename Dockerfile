FROM node:16

WORKDIR /app

COPY . .

RUN npm config set legacy-peer-deps true
RUN npm i
RUN npm run build

RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html

WORKDIR /

RUN rm -rf app

