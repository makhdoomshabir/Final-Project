#Dockerfile for frontend

# Step 1
FROM node:15-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm build

# Stage 2
FROM nginx:latest
WORKDIR /app
COPY --from=build-step /app/build /usr/share/nginx/html