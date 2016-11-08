package com.ita.config;

import com.ita.handler.UserEventHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@Configuration
@EnableJpaRepositories(basePackages = ("com.ita.repository"))
@EnableSpringDataWebSupport
public class JpaConfiguration {

    @Bean
    public SpelAwareProxyProjectionFactory projectionFactory(){
        return new SpelAwareProxyProjectionFactory();
    }

    @Bean
    UserEventHandler userEventHandler() {
        return new UserEventHandler();
    }

}
