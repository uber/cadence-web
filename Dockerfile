FROM node:dubnium

WORKDIR /usr/cadence-web

ENV NODE_ENV=production

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Bundle the client code
RUN npm run build-production

EXPOSE 8088
CMD [ "node", "server.js" ]