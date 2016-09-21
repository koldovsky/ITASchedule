package com.ita.entity;

import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;


@Entity
@Setter
@Getter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    @OneToOne
    private Room room;

    @ManyToMany
    private List<Ita_group> groups;

    @ManyToMany
    private List<Teacher> teachers;

    @OneToOne
    private EventType type;

    private LocalDate startTime;

    private LocalDate endTime;

    public Event() {
    }

    public Event(String title, Room room, List<Ita_group> groups, List<Teacher> teachers,
                 EventType type, LocalDate startTime, LocalDate endTime) {
        this.title=title;
        this.room=room;
        this.groups=groups;
        this.teachers=teachers;
        this.type=type;
        this.startTime=startTime;
        this.endTime=endTime;
    }
}
