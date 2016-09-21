package com.ita.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;

    private String email;

    private String password;

    private String contactInfo;

    @ManyToMany
    private List<Permission> permissions;

    private boolean active;

    public Teacher() {
    }

    public Teacher(String fullName, String email, String password,
                   String contactInfo, List<Permission> permissions, boolean active) {
        this.fullName=fullName;
        this.email=email;
        this.password=password;
        this.contactInfo=contactInfo;
        this.permissions=permissions;
        this.active=active;
    }
}
