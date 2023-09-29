# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.16.0

FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist .
CMD ["nginx", "-g", "daemon off;"]

