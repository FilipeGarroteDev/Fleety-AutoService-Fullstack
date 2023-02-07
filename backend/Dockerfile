FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . ./app

EXPOSE 4002

RUN npx prisma generate

CMD [ "npm", "run", "docker:dev:create" ]