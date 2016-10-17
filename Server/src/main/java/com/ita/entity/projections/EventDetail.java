package com.ita.entity.projections;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ita.entity.Event;
import com.ita.entity.EventType;
import com.ita.entity.ITAGroup;
import com.ita.entity.User;
import com.ita.utils.serializers.LocalDateTimeDeserializer;
import com.ita.utils.serializers.LocalDateTimeSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;
import java.util.List;

@Projection(name = "detailed", types = {Event.class})
public interface EventDetail {

    Long getId();

    String getTitle();

    @Value("#{target.room.number}")
    String getRoomNumber();

    @Value("#{target.type}")
    EventType getEventType();

    @Value("#{target.type.color}")
    String getEventColor();

    @Value("#{target.room.address.city.name}")
     String getCityName();

    @Value("#{target.room.address.codeName}")
    String getAddressCodeName();

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime getStartTime();

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    LocalDateTime getEndTime();

    List<ITAGroup> getITAGroups();

    List<User> getUsers();
}
