package com.ita.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@Configuration
@EnableJpaRepositories(basePackages = ("com.ita.repository"))
@EnableSpringDataWebSupport
public class JpaConfiguration {
}
