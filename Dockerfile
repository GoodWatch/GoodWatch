FROM node:latest
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app/
RUN npm run build
EXPOSE 4000
CMD ["node", "./server/server.js"] 
