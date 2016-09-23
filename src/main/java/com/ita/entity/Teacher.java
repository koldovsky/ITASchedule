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
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;

    private String email;

    @JsonIgnore
    private String password;

    @ManyToMany(mappedBy = "teachers")
    private List<ITAGroup> groups;

    @ManyToMany(mappedBy = "teachers")
    private List<Event> events;

    private String contactInfo;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "teacher"),
            inverseJoinColumns = @JoinColumn(name = "permission"))
    private List<Permission> permissions;

    private boolean active;

    public Teacher() {
    }

    public Teacher(String fullName, String email, String password,
                   String contactInfo, List<Permission> permissions, boolean active) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.contactInfo = contactInfo;
        this.permissions = permissions;
        this.active = active;
    }
}
