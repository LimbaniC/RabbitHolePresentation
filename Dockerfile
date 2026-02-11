FROM node 

WORKDIR /app

COPY package*.json /app
RUN npm ci

COPY . .

CMD ["npm", "start"]
