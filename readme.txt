
The below guides are targeted for Idea environment.

1) Launch Server:
  
  - under {project}/Server/src/main/resources/ create file application.properties and fill it with the following data:
  
          spring.datasource.driver = com.mysql.jdbc.Driver
          spring.datasource.url = jdbc:mysql://localhost:3306/{databaseName}
          spring.datasource.username = {user}
          spring.datasource.password = {password}
          spring.jpa.hibernate.ddl-auto = create
          spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQLDialect
          
  - create Run configuration for Maven in Idea,
  - set target directory to: {project}/Server/  ,
  - set goals to: spring-boot:run.

2) Launch Client:
  Note: To run 
  
  - install Node.js
        on OSX use homebrew: brew install node
        on Windows use chocolatey: choco install nodejs
  - install Yeoman: npm install -g yo,
  - install these NPM packages globally: npm install -g bower gulp nodemon,
  - go to {project} root directory and install required packages: 
        npm install 
        bower install
  - create Run configuration for Gulp.js in Idea,
  - set target directory to {project}/Client/,
  - set goals to: serve-dev


