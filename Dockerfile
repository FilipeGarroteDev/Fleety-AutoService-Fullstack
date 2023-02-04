FROM node:15-alpine

WORKDIR /app

COPY . ./app

RUN npm i

EXPOSE 4002

RUN npx prisma generate

CMD [ "npm", "run", "docker:dev:create" ]