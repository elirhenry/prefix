FROM node

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install knex
RUN npm install bcrypt

EXPOSE 8080

CMD npm start