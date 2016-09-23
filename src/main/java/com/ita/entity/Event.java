package com.ita.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ita.utils.serializers.LocalDateTimeDeserializer;
import com.ita.utils.serializers.LocalDateTimeSerializer;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.*;
import java.time.LocalDateTime;
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

    @OneToOne(fetch = FetchType.EAGER)
    private Room room;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "event"),
            inverseJoinColumns = @JoinColumn(name = "ita_group"))
    private List<Ita_group> ita_groups;

    @ManyToMany
    @JoinTable(name = "event_teachers",
            joinColumns = @JoinColumn(name = "event"),
            inverseJoinColumns = @JoinColumn(name = "teacher"))
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

    public Event(String title, Room room, List<Ita_group> ita_groups, List<Teacher> teachers,
                 EventType type, LocalDateTime  startTime, LocalDateTime  endTime) {
        this.title=title;
        this.room=room;
        this.ita_groups=ita_groups;
        this.teachers=teachers;
        this.type=type;
        this.startTime=startTime;
        this.endTime=endTime;
    }
}
