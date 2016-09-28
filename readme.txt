Create file "application.properties" with appropriate code.

src\main\resources\application.properties:

spring.datasource.driver = com.mysql.jdbc.Driver
spring.datasource.url = jdbc:mysql://localhost:3306/itaschedule

spring.datasource.username = root
spring.datasource.password = password

spring.jpa.hibernate.ddl-auto = create

spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQLDialect
