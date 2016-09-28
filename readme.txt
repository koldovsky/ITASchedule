
The below guides are targeted for Idea environment.

1) Launch Server:
  
  - under {project}/Server/src/main/resources/ create file application.properties and fill it with the following data:
  
          spring.datasource.driver = com.mysql.jdbc.Driver
          spring.datasource.url = jdbc:mysql://localhost:3306/{databaseName}
          spring.datasource.username = {user}
          spring.datasource.password = {password}
          spring.jpa.hibernate.ddl-auto = create
          spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQLDialect
          
  - create Run configuration for Maven,
  - set target directory to: {project}/Server/  ,
  - set goals to: spring-boot:run.

2) Launch Client:

Create file "application.properties" with appropriate code.

src\main\resources\application.properties:


