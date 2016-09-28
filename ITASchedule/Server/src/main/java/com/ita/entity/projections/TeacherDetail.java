package com.ita.entity.projections;


import com.ita.entity.Event;
import com.ita.entity.ITAGroup;
import com.ita.entity.Permission;
import com.ita.entity.Teacher;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "detailed", types = {Teacher.class})
public interface TeacherDetail {

    String getFullName();

    Boolean getIsActive();

    String getContactInfo();

    List<ITAGroup> getGroups();

    List<Event> getEvents();

    List<Permission> getPermissions();
}
