FROM node:19.0.0-bullseye-slim
# https://hub.docker.com/_/node/tags?page=1&name=bullseye
# Make sure you change the tag in docker-compose.yml when you change the version here!

# # ARM version (use for Mac M1) (Seems that on Mac M1, the node:19.0.0-bullseye-slim image is ARM automatically, so no need to use this)
# FROM arm64v8/node:19.0.0-bullseye-slim
# # https://hub.docker.com/r/arm64v8/node/tags?page=1&name=19.0.0
# # Make sure you change the tag in docker-compose.yml when you change the version here!

RUN apt update

RUN apt-get install -y chromium

RUN apt-get -y install xvfb

#
# Install pm2
#

RUN npm install pm2 -g

#
# Install Vue
#
RUN npm install -g @vue/cli

#
# Install Cypress
#
RUN npm install -g cypress@11.0.1
