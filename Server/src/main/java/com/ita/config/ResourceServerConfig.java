package com.ita.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    private final String RESOURCE_ID = "api";

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources
                .resourceId(RESOURCE_ID);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/events").hasAnyRole("TEACHER", "ADMINISTRATOR")
                .antMatchers(HttpMethod.OPTIONS, "/eventtypes").hasAnyRole("TEACHER", "ADMINISTRATOR")
                .antMatchers(HttpMethod.OPTIONS, "/groups").hasAnyRole("TEACHER", "ADMINISTRATOR")
                .antMatchers(HttpMethod.OPTIONS, "/locations").hasRole("ADMINISTRATOR")
                .antMatchers(HttpMethod.OPTIONS, "/cities").hasRole("ADMINISTRATOR")
                .antMatchers(HttpMethod.OPTIONS, "/rooms").hasRole("ADMINISTRATOR")
                .antMatchers(HttpMethod.OPTIONS, "/users").hasAnyRole("ADMINISTRATOR")
                .antMatchers(HttpMethod.GET, "/cities").permitAll()
                .antMatchers(HttpMethod.GET, "/eventtypes").permitAll()
                .antMatchers(HttpMethod.GET, "/events").permitAll()
                .antMatchers(HttpMethod.GET, "/rooms").permitAll()
                .antMatchers(HttpMethod.GET, "/groups").permitAll()
                .antMatchers(HttpMethod.GET, "/locations").permitAll()
                .antMatchers(HttpMethod.GET, "/users").permitAll()
                .antMatchers("/**").authenticated();
    }
}
