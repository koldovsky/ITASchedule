package com.ita.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Setter
@Getter
@EqualsAndHashCode(of = {"email","fullName"})

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String fullName;

    @NotNull
    @Email
    private String email;

    @JsonIgnore
    private String password;

    private String contactInfo;

    @NotNull
    private boolean active;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private List<ITAGroup> groups;

    @JsonIgnore
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", active='" + active + '\'' +
                ", roles='" + roles + '\'' +
                ", contactInfo='" + contactInfo + '\'' +

                '}';
    }

}
