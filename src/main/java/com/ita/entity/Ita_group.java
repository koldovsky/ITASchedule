package com.ita.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ita.utils.LocalDateTimeDeserializer;
import com.ita.utils.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Setter
@Getter
public class Ita_group {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    @ManyToMany
    private List<Teacher> teachers;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime startDate;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime endDate;

    private int studentsCount;

    private boolean active;

    public Ita_group() {
    }

    public Ita_group(String title, List<Teacher> teachers, LocalDateTime startDate,
                     LocalDateTime endDate, int studentsCount, boolean active) {
        this.title=title;
        this.teachers=teachers;
        this.startDate=startDate;
        this.endDate=endDate;
        this.studentsCount=studentsCount;
        this.active=active;
    }
}
