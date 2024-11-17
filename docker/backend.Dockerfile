FROM node:slim

WORKDIR /app

COPY backend .
COPY .env .

RUN npm install

CMD [ "node", "index.js" ]
