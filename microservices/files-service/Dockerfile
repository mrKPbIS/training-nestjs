FROM node:latest

WORKDIR /app

COPY . .

EXPOSE 3000

VOLUME /data

RUN npm ci

RUN npm run build

CMD ["node", "dist/main"]