package com.ita.entity.projections;

import com.ita.entity.*;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;
import java.util.List;

@Projection(name = "detailed", types = {Event.class})
public interface EventDetail {
    String getTitle();

    Room getRoom();

    LocalDateTime getStartTime();

    LocalDateTime getEndTime();

    EventType getType();

    List<Teacher> getTeachers();

    List<Ita_group> getIta_groups();
}
