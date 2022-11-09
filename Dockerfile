FROM node:fermium-bullseye AS BUILD_IMAGE

### Build step ###
WORKDIR /usr/build

RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64.deb
RUN dpkg -i dumb-init_*.deb

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install --production --unsafe-perm

# Bundle the client code
RUN npm run build-production

# switch to lite version of node
FROM node:fermium-bullseye-slim

### Run step ###
WORKDIR /usr/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/build/server.js ./
COPY --from=BUILD_IMAGE /usr/build/webpack.config.js ./
COPY --from=BUILD_IMAGE /usr/build/dist ./dist
COPY --from=BUILD_IMAGE /usr/build/server ./server
COPY --from=BUILD_IMAGE /usr/build/node_modules ./node_modules

# setup production environment variables
ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=true

# run node server
EXPOSE 8088
CMD [ "dumb-init", "node", "server.js" ]