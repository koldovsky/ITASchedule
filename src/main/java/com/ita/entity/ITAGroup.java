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

    private boolean active;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "ITAGroup"),
            inverseJoinColumns = @JoinColumn(name = "teacher"))
    private List<Teacher> teachers;

    public ITAGroup() {
    }

    public ITAGroup(String title, List<Teacher> teachers, LocalDate startDate,
                     LocalDate endDate, int studentsCount, boolean active) {
        this.title=title;
        this.teachers=teachers;
        this.startDate=startDate;
        this.endDate=endDate;
        this.studentsCount=studentsCount;
        this.active=active;
    }
}
