FROM node:10

WORKDIR /usr/src/housing

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 8000
