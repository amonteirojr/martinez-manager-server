FROM node:16-alpine AS builder

RUN addgroup -S service && \
  adduser application -S -G service

RUN chmod -R 775 /usr/src/app
RUN chmod -R application:service /usr/src/app

USER application

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

#-------------

FROM node:lts-alpine3.16 AS production

ENV NODE_ENV=production

RUN addgroup -S service && \
  adduser application -S -G service

RUN chmod -R 775 /usr/src/app
RUN chmod -R application:service /usr/src/app

USER application

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/package-lock.json ./package-lock.json
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD [ "sh", "-c", "npm run start:prod"]

