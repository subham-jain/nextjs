FROM node:16.5.0 as node_modules_installer
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
CMD [ "npm", "start" ]

