FROM node:dubnium-stretch AS BUILD_IMAGE

WORKDIR /usr/cadence-web

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=true

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

# Bundle the client code
RUN npm run build-production

FROM node:dubnium-slim

WORKDIR /usr/cadence-web

ENV NODE_ENV=production
ENV NPM_CONFIG_PRODUCTION=true

# copy from build image
COPY --from=BUILD_IMAGE /usr/cadence-web/dist ./dist
COPY --from=BUILD_IMAGE /usr/cadence-web/node_modules ./node_modules

EXPOSE 8088
CMD [ "node", "server.js" ]