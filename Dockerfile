FROM node:14 as build
# FROM node:14

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# bundle app source
COPY --chown=node:node tsconfig.json package.json /app/
COPY --chown=node:node src /app/src/

RUN chown -R node:node .

USER node

# RUN npm install
RUN yarn install
RUN npm run build

ENV NODE_ENV=production

# expose port and define CMD start
EXPOSE 3000

HEALTHCHECK \
  CMD node dist/utils/healthcheck.js

CMD ["node", "dist/index.js"]
