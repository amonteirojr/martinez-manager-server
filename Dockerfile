FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#-------------

FROM node:lts-alpine3.16

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main"]

