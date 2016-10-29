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

    public static Builder newBuilder() {
        return   new Event().new Builder();
    }

    public class Builder {

        private Builder() {
            // private constructor
        }

        public Builder setId(Long id) {
            Event.this.id = id;

            return this;
        }

        public Builder setTitle(String title) {
            Event.this.title = title;

            return this;
        }

        public Builder setStartTime(LocalDateTime startTime) {
            Event.this.startTime = startTime;
            return this;
        }

        public Builder setEndTime(LocalDateTime endTime) {
            Event.this.endTime = endTime;
            return this;
        }

        public Builder setRoom(Room room) {
            Event.this.room = room;
            return this;
        }

        public Builder setType(EventType type) {
            Event.this.type = type;
            return this;
        }

        public Builder setCreator(User creator) {
            Event.this.creator = creator;
            return this;
        }

        public Builder setITAGroups(List<ITAGroup> ITAGroups) {
            Event.this.ITAGroups = ITAGroups;
            return this;
        }

        public Builder setUsers(List<User> users) {
            Event.this.users = users;
            return this;
        }
        public Event build() {
            return Event.this;
        }
    }

}
