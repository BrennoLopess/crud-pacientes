# ===== Stage 1: build =====
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app

# copia arquivos necessários para cache de dependências
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw mvnw
COPY mvnw.cmd mvnw.cmd

# baixa dependências (cache)
RUN ./mvnw -q -DskipTests dependency:go-offline

# agora copia o código
COPY src src

# build do jar
RUN ./mvnw -q -DskipTests package

# ===== Stage 2: run =====
FROM eclipse-temurin:17-jre
WORKDIR /app

# copia o jar gerado
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]