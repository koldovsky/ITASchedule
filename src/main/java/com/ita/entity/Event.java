package com.ita.entity;

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
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    @OneToOne
    private Room room;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "event"),
            inverseJoinColumns = @JoinColumn(name = "ita_group"))
    private List<Ita_group> ita_groups;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "event"),
            inverseJoinColumns = @JoinColumn(name = "teacher"))
    private List<Teacher> teachers;

    @OneToOne
    private EventType type;

    private LocalDate startTime;

    private LocalDate endTime;

    public Event() {
    }

    public Event(String title, Room room, List<Ita_group> ita_groups, List<Teacher> teachers,
                 EventType type, LocalDate startTime, LocalDate endTime) {
        this.title=title;
        this.room=room;
        this.ita_groups=ita_groups;
        this.teachers=teachers;
        this.type=type;
        this.startTime=startTime;
        this.endTime=endTime;
    }
}
