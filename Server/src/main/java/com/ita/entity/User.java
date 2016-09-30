package com.ita.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
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

    private String fullName;

    private String email;

    @JsonIgnore
    private String password;

    private String contactInfo;

    private boolean isActive;

    @ManyToMany(mappedBy = "users")
    private List<ITAGroup> groups;

    @ManyToMany(mappedBy = "users")
    private List<Event> events;

    @ElementCollection(targetClass = Role.class)
    @CollectionTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user"))
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private List<Role> roles;

    public User() {
    }

}
