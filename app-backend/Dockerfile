FROM node

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install knex

EXPOSE 8080

CMD npm start