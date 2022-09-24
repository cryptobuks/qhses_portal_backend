FROM node:14.16.0

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm install -g nodemon

RUN npm install -g sequelize-cli

RUN git clone https://github.com/vishnubob/wait-for-it.git

EXPOSE 8000

CMD ["npm", "start"]