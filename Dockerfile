ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-alpine as builder
WORKDIR /usr/src/app

ARG VITE_URL_BACKEND
ARG VITE_URL_APIKEY
ARG VITE_URL_AWESOME
ARG VITE_WEBBORADGAME
ARG VITE_BASE
ARG VITE_APIKEY_FIREBASE
ARG VITE_AUTHDOMAIN
ARG VITE_PROJECTID
ARG VITE_STORAGEBUCKET
ARG VITE_MESSAGINGSENDERID
ARG VITE_APPID

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx
WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist .
CMD ["nginx", "-g", "daemon off;"]

