package com.ita.entity.projections;

import com.ita.entity.Event;
import com.ita.entity.Ita_group;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;
import java.util.List;

@Projection(name = "detailed", types = {Event.class})
public interface EventDetail {
    String getTitle();

    @Value("#{target.room.number}")
    String getRoomNumber();

    @Value("#{target.type.type}")
    String getEventType();

    @Value("#{target.type.color}")
    String getEventColor();

    List<Ita_group> getIta_groups();

    LocalDateTime getStartTime();

    LocalDateTime getEndTime();
}
