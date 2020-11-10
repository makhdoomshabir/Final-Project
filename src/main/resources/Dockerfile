FROM node:13.12.0-alpine as build
WORKDIR /build
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 3000
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:latest
WORKDIR /app
COPY --from=build /build/dist .
COPY nginx.conf /etc/nginx/nginx.conf