# IT Academy Schedule
ITASchedule is a project that is designed to replace the existing software for IT Academy schedule management. Application allows students to look up the schedule of IT Academy training centers and provides teachers and administrators necessary tools for managing groups, classes and events that are being held at the Academy.   

## Launching Server part in IDEA  
  Go to `{project}/Server/src/main/resources/` and create `application.properties` with the following content:  
  ```
    spring.datasource.driver = com.mysql.jdbc.Driver  
    spring.datasource.url = jdbc:mysql://localhost:3306/{databaseName}  
    spring.datasource.username = {user}  
    spring.datasource.password = {password}  
    spring.jpa.hibernate.ddl-auto = create  
    spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQLDialect  
  ```
  In IDEA, create run configuration for Maven: configure `target directory` to `{project}/Server/` and `goals` to `spring-boot:run`.  

## Launching Client part in IDEA  
  Install Node.js:  
        - OSX (use homebrew): `brew install node`  
        - Windows (use chocolatey): `choco install nodejs`  
  Install Yeoman: `npm install -g yo`.  
  Install globally NPM packages: `npm install -g bower gulp nodemon`.  
  Go to `{project}/Client/` directory and install dependency packages:   
    ```
    * npm install 
    * bower install
    ```  
  In IDEA, create run configuration for Gulp.js: configure `target directory` to `{project}/Client/` and `goals` to `serve-dev`.  

## Run Server instance in Docker container (Tested on Ubuntu 14.04)  
  *Prerequisite: Docker runs on the same physical host as MySQL server.*  
  Install [Docker](https://docs.docker.com/engine/installation/).  
  Go to `{project}/Server/` directory (where `pom.xml` is located).  
  Build Docker image: `mvn clean package docker:build`.  
  Run the created image in container: `docker run --rm --net=host itaschedule`.  
  Now the project can be accessed at `localhost:8080`.  


