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

    private String contactInfo;

    private boolean isActive;

    @ManyToMany(mappedBy = "teachers")
    private List<ITAGroup> groups;

    @ManyToMany(mappedBy = "teachers")
    private List<Event> events;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "teacher"),
            inverseJoinColumns = @JoinColumn(name = "permission"))
    private List<Permission> permissions;

    public Teacher() {
    }

}
