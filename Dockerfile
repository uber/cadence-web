FROM node:dubnium

WORKDIR /usr/cadence-web

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=true

# Install app dependencies
COPY package*.json ./
RUN npm install --production

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64.deb
RUN dpkg -i dumb-init_*.deb

# Bundle app source
COPY . .

# Bundle the client code
RUN npm run build-production

EXPOSE 8088
CMD [ "dumb-init", "node", "server.js" ]