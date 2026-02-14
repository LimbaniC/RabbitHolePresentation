FROM node:20

WORKDIR /api

COPY package*.json /api
RUN npm i

COPY . .

CMD ["npm", "start"]
