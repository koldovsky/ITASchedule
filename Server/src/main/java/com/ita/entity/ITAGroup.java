package com.ita.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ita.utils.serializers.LocalDateDeserializer;
import com.ita.utils.serializers.LocalDateSerializer;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Setter
@Getter
@ToString
@EqualsAndHashCode(of = "id")
public class ITAGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private int studentsCount;

    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate startDate;

    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate endDate;

    private boolean isActive;

    @ManyToOne
    private User creator;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "ITAGroup"),
            inverseJoinColumns = @JoinColumn(name = "user"))
    private List<User> users;

    public ITAGroup() {
    }

    public ITAGroup(String title, List<User> users, LocalDate startDate,
                    LocalDate endDate, int studentsCount, boolean isActive) {
        this.title=title;
        this.users = users;
        this.startDate=startDate;
        this.endDate=endDate;
        this.studentsCount=studentsCount;
        this.isActive =isActive;
    }
}
