#Backend Dockerfile

FROM maven:latest AS build-stage
COPY . /build
WORKDIR /build
RUN mvn clean package

FROM java:8 AS runtime
WORKDIR /opt/app-name
COPY --from=build-stage /build/target/billyshakes.jar app.jar
ENTRYPOINT ["/usr/bin/java", "-jar", "app.jar"]