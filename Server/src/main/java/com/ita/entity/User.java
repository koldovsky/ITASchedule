package com.ita.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String fullName;

    @NotNull
    private String email;

    @JsonIgnore
    private String password;

    private String contactInfo;


    @NotNull
    private boolean isActive;

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

    public boolean isActive() {
        return isActive;
    }
}
