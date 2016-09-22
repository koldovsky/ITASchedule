package com.ita.entity.projections;

import com.ita.entity.Event;
import com.ita.entity.Ita_group;
import com.ita.entity.Teacher;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "EventDetail", types = {Event.class})
public interface EventDetail {
    String getTitle();

    @Value("#{target.room.number}")
    String getRoom();

    String getStartTime();

    String getEndTime();

    String getType();

    List<Teacher> getTeachers();

    List<Ita_group> getIta_groups();
}
