FROM java:8
MAINTAINER "Marian Seliuchenko <m.seliuchenko@gmail.com>"

ADD itaschedule-0.0.1-SNAPSHOT.jar app.jar
RUN bash -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
