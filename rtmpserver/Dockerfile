FROM node:10.20.1-alpine as install-npm

RUN mkdir -p /rtmpserver
WORKDIR /rtmpserver

# install deps
COPY package*.json /rtmpserver/
RUN npm install

FROM node:10.20.1-alpine

RUN apk update && \
    apk upgrade && \
    apk add 'ffmpeg>4.0.0'

RUN mkdir -p /rtmpserver
WORKDIR /rtmpserver

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENV FFMPEG_PATH='/usr/bin/ffmpeg'

# Copy deps
COPY --from=install-npm /rtmpserver/node_modules /rtmpserver/node_modules
# Setup workdir
COPY . /rtmpserver

EXPOSE 8080

CMD ["node","app.js"]