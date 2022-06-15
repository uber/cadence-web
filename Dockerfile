FROM node:fermium-bullseye AS BUILD_IMAGE

### Build step ###
WORKDIR /usr/build

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
CMD [ "node", "server.js" ]