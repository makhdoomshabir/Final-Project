#Backend Dockerfile

FROM maven:latest AS build-stage
COPY . /build
WORKDIR /build
#RUN mvn -X clean package
RUN mvn clean package spring-boot:repackage

FROM java:8 AS runtime
WORKDIR /opt/finalproject
COPY --from=build-stage /build/target/finalproject.jar app.jar
ENTRYPOINT ["/usr/bin/java", "-jar", "app.jar"]