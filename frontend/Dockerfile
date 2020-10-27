#Dockerfile for frontend

# Stage 1
FROM node:15-alpine as build
WORKDIR /build
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm build

# Stage 2
FROM nginx:latest
WORKDIR /app
COPY --from=build /build . 
COPY nginx/nginx.conf /etc/nginx/nginx.conf