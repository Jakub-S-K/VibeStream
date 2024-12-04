FROM node:slim

WORKDIR /app

COPY frontend .

RUN yarn install

CMD [ "npm", "run", "dev" ]
