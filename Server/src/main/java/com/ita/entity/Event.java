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

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime startTime;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime endTime;

    @OneToOne(fetch = FetchType.EAGER)
    private Room room;

    @OneToOne(cascade = CascadeType.ALL)
    private EventType type;

    @ManyToOne
    private User creator;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "event"),
            inverseJoinColumns = @JoinColumn(name = "ITAGroup"))
    private List<ITAGroup> ITAGroups;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "event"),
            inverseJoinColumns = @JoinColumn(name = "user"))
    private List<User> users;

    public Event() {
    }

}
