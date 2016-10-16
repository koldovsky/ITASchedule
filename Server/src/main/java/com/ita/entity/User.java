package com.ita.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@EqualsAndHashCode(of = {"email","fullName"})

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @com.sun.istack.internal.NotNull
    private String fullName;

    @NotNull
    @Email
    private String email;

    @JsonIgnore
    private String password;

    private String contactInfo;

    @NotNull
    private boolean active;

    @ManyToMany(mappedBy = "users")
    private List<ITAGroup> groups;

    @ManyToMany(mappedBy = "users")
    private List<Event> events;

    @ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user"))
    @Column(name = "role")
    @Enumerated(EnumType.ORDINAL)
    private List<Role> roles;

    public User() {
    }

}
