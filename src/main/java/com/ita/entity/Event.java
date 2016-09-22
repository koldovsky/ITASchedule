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

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime startTime;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime  endTime;

    public Event() {
    }

    public Event(String title, Room room, List<Ita_group> groups, List<Teacher> teachers,
                 EventType type, LocalDateTime  startTime, LocalDateTime  endTime) {
        this.title=title;
        this.room=room;
        this.groups=groups;
        this.teachers=teachers;
        this.type=type;
        this.startTime=startTime;
        this.endTime=endTime;
    }
}
