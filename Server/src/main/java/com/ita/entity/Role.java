package com.ita.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority{

    TEACHER("TEACHER"),
    ADMINISTRATOR("ADMINISTRATOR");
    private final String name;

    Role(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return "ROLE_" + name;
    }
}
