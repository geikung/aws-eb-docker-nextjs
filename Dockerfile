# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install pnpm
RUN npm install -g pnpm

# install dependencies
RUN pnpm install

# start app
RUN pnpm run build
EXPOSE 8080
CMD pnpm run start