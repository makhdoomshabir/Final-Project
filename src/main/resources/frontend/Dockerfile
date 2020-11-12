FROM node:13.12.0-alpine as build
WORKDIR /build
ENV PATH /build/node_modules/.bin:$PATH
EXPOSE 3000
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
#RUN npm run build
#FROM nginx:latest
#WORKDIR /app
#COPY --from=build /build .
#COPY nginx/nginx.conf /etc/nginx/nginx.conf